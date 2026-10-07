// Gera os áudios (MP3) de todas as frases do curso com vozes neurais da Microsoft.
//
// Requisitos:  pip install edge-tts
// Uso:         node tools/build-audio.mjs
//
// Só cria os arquivos que ainda não existem e apaga os que não são mais usados,
// então pode rodar de novo sempre que mudar o conteúdo.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'audio');

const VOICE_F = 'en-US-AvaNeural';     // voz principal (ela, palavras, explicações)
const VOICE_M = 'en-US-AndrewNeural';  // voz masculina (oficial, atendentes...)
const VOICE_PT = 'pt-BR-FranciscaNeural'; // opções de resposta em português
const RATE = '-10%';                   // um pouco mais devagar que o normal, para quem está aprendendo

const sandbox = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'content.js'), 'utf8'), sandbox);
const newsFile = path.join(root, 'news.js');
if (fs.existsSync(newsFile)) vm.runInNewContext(fs.readFileSync(newsFile, 'utf8'), sandbox);
const {slug, strip, optLang, ...content} = sandbox.window.HM;
content.NEWS = sandbox.window.HM_NEWS || [];

const jobs = new Map(); // nome do arquivo -> {text, voice}
// Arquivos: frase.mp3 (inglês), frase.m.mp3 (inglês, voz masculina), frase.pt.mp3 (português)
function add(text, male = false, lang = 'en'){
  if (!text) return;
  // Palavras destacadas nos textos ([[palavra|tradução]]) também ganham áudio
  if (lang === 'en') for (const m of String(text).matchAll(/\[\[([^|\]]+)\|/g)) add(m[1]);
  const t = strip(text).replace(/\.\.\./g, '').trim();
  if (!slug(t)) return;
  const key = slug(t) + (lang === 'pt' ? '.pt' : male ? '.m' : '');
  if (!jobs.has(key)) jobs.set(key, {text: t, voice: lang === 'pt' ? VOICE_PT : male ? VOICE_M : VOICE_F});
}
const addPt = text => add(text, false, 'pt');

// Toda frase em inglês fica num campo "en". v:'m' marca voz masculina e vale para
// tudo dentro do objeto, menos as "choices" (que são falas dela, voz feminina).
function walk(o, v){
  if (Array.isArray(o)) return o.forEach(x => walk(x, v));
  if (!o || typeof o !== 'object') return;
  const mine = o.v || v;
  if (typeof o.en === 'string') add(o.en, mine === 'm');
  for (const [k, val] of Object.entries(o)) if (typeof val === 'object') walk(val, k === 'choices' ? undefined : mine);
}
walk(content);

// Opções de resposta: o app lê em voz alta a opção que ela toca
function options(st){
  if (st.t === 'choice' || st.t === 'listen' || st.t === 'fill')
    (st.options || []).forEach(o => optLang(st) === 'pt' ? addPt(o) : add(o));
  if (st.t === 'build') [...(st.answer || []), ...(st.extra || [])].forEach(w => add(w));
  if (st.t === 'match') (st.pairs || []).forEach(([en, pt]) => { add(en); addPt(pt); });
  if (st.t === 'dialog') (st.nodes || []).forEach(n => n.choices.forEach(c => c.en ? add(c.en) : addPt(c.pt)));
}
content.STAGES.forEach(s => s.steps.forEach(options));
content.STORIES.forEach(s => s.questions.forEach(options));
content.NEWS.forEach(n => n.questions.forEach(options));
const I = content.INTERVIEW;
options({t:'dialog', nodes:[I.start, ...I.core, ...I.extra, ...I.end]});
content.SPOT.forEach(s => s.s.split(' ').forEach(w => add(w)));
// Jogo Contra o tempo: as opções são os significados em português
content.EXTRA_PAIRS.forEach(([, pt]) => addPt(pt));
content.STAGES.forEach(s => s.steps.forEach(st => { if (st.t === 'phrase') addPt(st.pt); }));

// Frases fixas da tela inicial
['Good morning', 'Good afternoon', 'Good evening', "Hello! Welcome! Let's practise English for your trip."].forEach(t => add(t));

fs.mkdirSync(outDir, {recursive: true});
// Apaga áudios de frases que saíram do curso
for (const f of fs.readdirSync(outDir)) if (f.endsWith('.mp3') && !jobs.has(f.slice(0, -4))) fs.unlinkSync(path.join(outDir, f));
const todo = [...jobs].filter(([key]) => !fs.existsSync(path.join(outDir, key + '.mp3')));
console.log(`${jobs.size} frases no curso, ${todo.length} áudios novos para gerar.`);

let done = 0;
async function worker(){
  while (todo.length){
    const [key, {text, voice}] = todo.shift();
    const file = path.join(outDir, key + '.mp3');
    for (let attempt = 1; ; attempt++){
      try {
        await run('edge-tts', ['--voice', voice, '--rate', RATE, '--text', text, '--write-media', file]);
        break;
      } catch (e){
        if (attempt >= 3){ console.error(`Falhou: "${text}"`, e.message); break; }
      }
    }
    done++;
    if (done % 20 === 0) console.log(`  ${done} prontos...`);
  }
}
await Promise.all(Array.from({length: 4}, worker));

const all = fs.readdirSync(outDir).filter(f => f.endsWith('.mp3')).map(f => f.slice(0, -4)).sort();
fs.writeFileSync(path.join(outDir, 'index.js'),
  '// Gerado por tools/build-audio.mjs. Não edite à mão.\nwindow.HM_AUDIO = ' + JSON.stringify(all, null, 0) + ';\n');
console.log(`Pronto: ${all.length} áudios em audio/.`);

// Muda a versão do sw.js quando a lista de áudios muda, para o app instalado
// baixar os áudios novos e continuar funcionando sem internet.
const swFile = path.join(root, 'sw.js');
let h = 5381;
for (const c of all.join('|')) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0;
const sw = fs.readFileSync(swFile, 'utf8');
const next = sw.replace(/const AUDIO_VERSION = '[^']*';/, `const AUDIO_VERSION = '${h.toString(36)}';`);
if (next !== sw){ fs.writeFileSync(swFile, next); console.log('sw.js atualizado: o app vai baixar os áudios novos.'); }

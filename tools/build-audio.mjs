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
const RATE = '-10%';                   // um pouco mais devagar que o normal, para quem está aprendendo

const sandbox = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'content.js'), 'utf8'), sandbox);
const {slug, strip, ...content} = sandbox.window.HM;

const jobs = new Map(); // nome do arquivo -> {text, voice}
function add(text, male = false){
  if (!text) return;
  // Palavras destacadas nos textos ([[palavra|tradução]]) também ganham áudio
  for (const m of String(text).matchAll(/\[\[([^|\]]+)\|/g)) add(m[1]);
  const t = strip(text).replace(/\.\.\./g, '').trim();
  const key = slug(t) + (male ? '.m' : '');
  if (!jobs.has(key)) jobs.set(key, {text: t, voice: male ? VOICE_M : VOICE_F});
}

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

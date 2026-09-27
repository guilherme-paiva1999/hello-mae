// Gera os áudios (MP3) de todas as frases do curso com vozes neurais da Microsoft.
//
// Requisitos:  pip install edge-tts
// Uso:         node tools/build-audio.mjs
// Com nome:    NOME=Maria node tools/build-audio.mjs   (gera também as frases com o nome dela)
//
// Só cria os arquivos que ainda não existem, então pode rodar de novo sempre que
// adicionar uma lição.

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
const VOICE_M = 'en-US-AndrewNeural';  // voz masculina (Tom, John, garçom...)
const RATE = '-10%';                   // um pouco mais devagar que o normal, para quem está aprendendo

const sandbox = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'content.js'), 'utf8'), sandbox);
const {LESSONS, GLOSS, slug} = sandbox.window.HM;

const NOME = (process.env.NOME || '').trim().split(/\s+/)[0];
const P = s => String(s).split('{nome}').join(NOME);

const jobs = new Map(); // nome do arquivo -> {text, voice}
function add(text, male = false){
  if (!text) return;
  if (String(text).includes('{nome}') && !NOME) return;
  const t = P(text).replace(/\.\.\./g, '').trim();
  const key = slug(t) + (male ? '.m' : '');
  if (!jobs.has(key)) jobs.set(key, {text: t, voice: male ? VOICE_M : VOICE_F});
}

// Frases fixas da tela inicial
['Hello!', "Hello! Welcome! Let's learn English together.", 'Good morning', 'Good afternoon', 'Good evening'].forEach(t => add(t));
if (NOME) ['Good morning', 'Good afternoon', 'Good evening'].forEach(g => add(`${g}, ${NOME}!`));

for (const l of LESSONS){
  l.words.forEach(w => add(w.en));
  for (const st of l.steps){
    (st.examples || []).forEach(e => add(e.en));
    add(st.audio); if (st.t !== 'speak') add(st.say); add(st.sentence); add(st.full); add(st.en);
    (st.answer || []).concat(st.extra || []).forEach(w => add(w));
    (st.pairs || []).forEach(p => add(p[0]));
    (st.lines || []).forEach(ln => {
      if (!ln.en) return;
      add(ln.en, ln.who !== '{nome}');
      if (ln.who === '{nome}') add(ln.en);
    });
  }
}
// Palavras que ela pode tocar nos textos
Object.keys(GLOSS).forEach(k => add(k.charAt(0).toUpperCase() + k.slice(1)));

fs.mkdirSync(outDir, {recursive: true});
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

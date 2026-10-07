// Confere se o news.js está correto antes de subir para o GitHub.
// Uso: node tools/check-news.mjs   (sai com erro e explica o problema, se houver)

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = {window: {}};
const errors = [];

try {
  vm.runInNewContext(fs.readFileSync(path.join(root, 'news.js'), 'utf8'), sandbox);
} catch (e) {
  console.error('news.js não é JavaScript válido:', e.message);
  process.exit(1);
}

const news = sandbox.window.HM_NEWS;
if (!Array.isArray(news) || !news.length) errors.push('window.HM_NEWS precisa ser uma lista com pelo menos uma notícia.');
else {
  if (news.length > 12) errors.push(`Há ${news.length} notícias; mantenha no máximo 12 (apague as mais antigas, no fim da lista).`);
  const ids = new Set();
  news.forEach((n, i) => {
    const where = `Notícia ${i + 1} (${n.id || 'sem id'})`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(n.id || '')) errors.push(`${where}: id deve ser AAAA-MM-DD.`);
    if (ids.has(n.id)) errors.push(`${where}: id repetido.`);
    ids.add(n.id);
    for (const k of ['date', 'title', 'source']) if (!n[k] || typeof n[k] !== 'string') errors.push(`${where}: falta "${k}".`);
    if (!Array.isArray(n.paras) || n.paras.length < 3 || n.paras.length > 4) errors.push(`${where}: precisa de 3 ou 4 parágrafos.`);
    (n.paras || []).forEach((p, j) => {
      if (!p.en || !p.pt) errors.push(`${where}, parágrafo ${j + 1}: precisa de "en" e "pt".`);
      const open = (p.en || '').split('[[').length - 1, close = (p.en || '').split(']]').length - 1;
      if (open !== close) errors.push(`${where}, parágrafo ${j + 1}: [[ ]] não fecha.`);
      for (const m of (p.en || '').matchAll(/\[\[([^\]]*)\]\]/g)) if (!/^[^|]+\|[^|]+$/.test(m[1])) errors.push(`${where}, parágrafo ${j + 1}: use [[palavra|tradução]] em "${m[0]}".`);
    });
    if (!Array.isArray(n.questions) || n.questions.length < 2 || n.questions.length > 3) errors.push(`${where}: precisa de 2 ou 3 perguntas.`);
    (n.questions || []).forEach((q, j) => {
      if (q.t !== 'choice' || !q.q || !Array.isArray(q.options) || q.options.length !== 3) errors.push(`${where}, pergunta ${j + 1}: use {t:'choice', q, options:[certa, errada, errada]}.`);
    });
  });
  for (let i = 1; i < news.length; i++) if (news[i - 1].id < news[i].id) errors.push('As notícias devem estar da mais nova (topo) para a mais antiga.');
}

if (errors.length) { console.error('Problemas no news.js:\n- ' + errors.join('\n- ')); process.exit(1); }
console.log(`news.js OK: ${news.length} notícia(s). Mais nova: ${news[0].id} "${news[0].title}".`);

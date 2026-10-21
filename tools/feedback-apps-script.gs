/**
 * Recebe os comentários do app Hello, Mãe! e guarda numa planilha do Google.
 * Também guarda as respostas do Gui, que aparecem para ela no app por 24 horas.
 * Passo a passo de instalação: veja o README do projeto.
 *
 * Senha do admin: em Configurações do projeto > Propriedades do script,
 * crie a propriedade ADMIN_KEY com a senha que você quiser.
 *
 * Depois de mudar este código: Implantar > Gerenciar implantações > lápis (editar) >
 * Versão: Nova versão > Implantar. Assim o endereço do app continua o mesmo.
 */

const SHEET_NAME = 'Comentários';
const FACES = ['', '😕 Difícil', '🙂 Bom', '😍 Adorei'];
const HEADER = ['Data', 'Nome', 'Onde', 'Exercício', 'Nota', 'Comentário', 'Progresso', 'Aparelho', 'ID',
                'Resposta do Gui', 'Respondido em'];
const COL_ID = 9, COL_REPLY = 10;

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADER);
    sh.setFrozenRows(1);
  } else if (sh.getRange(1, COL_REPLY).getValue() !== HEADER[COL_REPLY - 1]) {
    sh.getRange(1, 1, 1, HEADER.length).setValues([HEADER]);   // planilhas antigas ganham as colunas de resposta
  }
  return sh;
}

// Rode uma vez pelo editor (botão Executar): cria a aba "Comentários" e pede a autorização do Google.
function instalar() {
  sheet_();
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

const iso_ = v => v instanceof Date ? v.toISOString() : v;

// Todas as linhas (sem o cabeçalho), com as 11 colunas
function rows_(sh) {
  const last = sh.getLastRow();
  return last < 2 ? [] : sh.getRange(2, 1, last - 1, HEADER.length).getValues();
}

// O app envia cada comentário aqui.
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const sh = sheet_();
    if (rows_(sh).some(r => String(r[COL_ID - 1]) === String(d.id))) return out_({ ok: true, duplicate: true });
    sh.appendRow([
      new Date(d.at), d.name || '', d.title || '', d.step || '', FACES[d.rating || 0] || '',
      String(d.text || '').slice(0, 2000), d.progress || '', d.device || '', d.id || ''
    ]);
    return out_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const p = e.parameter || {};
  const sh = sheet_();

  // O app dela pergunta se há respostas para os comentários que ela fez (sem senha:
  // só quem tem os códigos dos comentários, que ficam no celular dela, consegue ver).
  if (p.action === 'replies') {
    const ids = new Set(String(p.ids || '').split(',').filter(Boolean).slice(0, 100));
    const items = rows_(sh)
      .filter(r => ids.has(String(r[COL_ID - 1])) && r[COL_REPLY - 1])
      .map(r => ({ id: String(r[COL_ID - 1]), text: r[5], reply: String(r[COL_REPLY - 1]), at: iso_(r[COL_REPLY]) }));
    return out_({ ok: true, items: items });
  }

  // Daqui para baixo, só com a senha do admin
  const key = PropertiesService.getScriptProperties().getProperty('ADMIN_KEY');
  if (!key || p.key !== key) return out_({ ok: false, error: 'senha' });

  // O Gui responde um comentário (texto vazio apaga a resposta)
  if (p.action === 'reply') {
    const rows = rows_(sh);
    const i = rows.findIndex(r => String(r[COL_ID - 1]) === String(p.id || ''));
    if (i < 0) return out_({ ok: false, error: 'comentário não encontrado' });
    const text = String(p.text || '').trim().slice(0, 1000);
    sh.getRange(i + 2, COL_REPLY, 1, 2).setValues([[text, text ? new Date() : '']]);
    return out_({ ok: true });
  }

  // A área de admin do app lê todos os comentários
  const items = rows_(sh).map(r => ({
    at: iso_(r[0]), name: r[1], title: r[2], step: r[3], rating: r[4], text: r[5], progress: r[6], device: r[7],
    id: String(r[COL_ID - 1]), reply: r[COL_REPLY - 1], repliedAt: iso_(r[COL_REPLY])
  })).reverse();
  return out_({ ok: true, items: items });
}

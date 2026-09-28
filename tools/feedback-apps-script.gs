/**
 * Recebe os comentários do app Hello, Mãe! e guarda numa planilha do Google.
 * Passo a passo de instalação: veja o README do projeto.
 *
 * Senha do admin: em Configurações do projeto > Propriedades do script,
 * crie a propriedade ADMIN_KEY com a senha que você quiser.
 */

const SHEET_NAME = 'Comentários';
const FACES = ['', '😕 Difícil', '🙂 Bom', '😍 Adorei'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Data', 'Nome', 'Onde', 'Exercício', 'Nota', 'Comentário', 'Progresso', 'Aparelho', 'ID']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// O app envia cada comentário aqui.
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const sh = sheet_();
    const last = sh.getLastRow();
    if (last > 1) {
      const ids = sh.getRange(2, 9, last - 1, 1).getValues().flat();
      if (ids.indexOf(d.id) >= 0) return out_({ ok: true, duplicate: true });
    }
    sh.appendRow([
      new Date(d.at), d.name || '', d.title || '', d.step || '', FACES[d.rating || 0] || '',
      String(d.text || '').slice(0, 2000), d.progress || '', d.device || '', d.id || ''
    ]);
    return out_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// A área de admin do app lê os comentários aqui, com a senha.
function doGet(e) {
  const key = PropertiesService.getScriptProperties().getProperty('ADMIN_KEY');
  if (!key || !e.parameter || e.parameter.key !== key) return out_({ ok: false, error: 'senha' });
  const rows = sheet_().getDataRange().getValues().slice(1);
  const items = rows.map(r => ({
    at: r[0] instanceof Date ? r[0].toISOString() : r[0],
    name: r[1], title: r[2], step: r[3], rating: r[4], text: r[5], progress: r[6], device: r[7]
  })).reverse();
  return out_({ ok: true, items: items });
}

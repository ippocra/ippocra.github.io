/* Emergency checklist — client-side PDF generator */
(function () {
  'use strict';

  var form = document.getElementById('checklist-form');
  if (!form) return;

  var btnGenerate = document.getElementById('btn-generate');
  var btnDownload = document.getElementById('btn-download');
  var preview = document.getElementById('preview');
  var previewContent = document.getElementById('preview-content');

  var fields = [
    ['nome', 'nome', 'Nome e cognome'],
    ['nascita', 'nascita', 'Data di nascita'],
    ['codice-fiscale', 'codice', 'Codice fiscale'],
    ['gruppo-sanguigno', 'gruppo', 'Gruppo sanguigno'],
    ['allergie', 'allergie', 'Allergie'],
    ['farmaci', 'farmaci', 'Farmaci in uso'],
    ['patologie', 'patologie', 'Patologie / interventi'],
    ['medico', 'medico', 'Medico di fiducia'],
    ['contatto', 'contatto', 'Contatto emergenza'],
    ['assicurazione', 'assicurazione', 'ASL / Assicurazione']
  ];

  function val(id) {
    var el = document.getElementById(id);
    if (!el) return '';
    var v = el.value.trim();
    if (id === 'nascita' && v) {
      var parts = v.split('-');
      if (parts.length === 3) v = parts[2] + '/' + parts[1] + '/' + parts[0];
    }
    return v;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/\n/g, '<br>');
  }

  function buildRows() {
    var html = '<table class="cl-table" style="width:100%; border-collapse:collapse; font-size:14px;">';
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      var v = val(f[0]);
      if (v) {
        html += '<tr>' +
          '<td style="padding:6px 8px; border-bottom:1px solid #ddd; width:40%; color:#555; vertical-align:top;">' + esc(f[2]) + '</td>' +
          '<td style="padding:6px 8px; border-bottom:1px solid #ddd; font-weight:600;">' + esc(v) + '</td>' +
          '</tr>';
      }
    }
    html += '</table>';
    return html;
  }

  function buildHtml() {
    var title = val('nome') ? 'Checklist — ' + val('nome') : 'Checklist emergenza';
    return '<div style="font-family:Helvetica,Arial,sans-serif; padding:24px; color:#111;">' +
      '<h2 style="margin:0 0 4px; font-size:20px;">' + esc(title) + '</h2>' +
      '<p style="margin:0 0 16px; color:#666; font-size:12px;">Documento di emergenza — aggiornare periodicamente</p>' +
      buildRows() +
      '<p style="margin-top:16px; font-size:11px; color:#888;">Generato il ' + new Date().toLocaleDateString('it-IT') + ' — ippocra.com/ippo</p>' +
      '</div>';
  }

  function makePdf() {
    // Minimal valid PDF 1.4 with Helvetica text lines.
    // Escape backslashes and parens for PDF strings.
    function pdfEsc(s) {
      return String(s)
        .replace(/\\/g, '\\\\')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)');
    }

    var lines = [];
    var title = val('nome') ? 'Checklist - ' + val('nome') : 'Checklist emergenza';
    lines.push([20, 780, 16, title]);
    lines.push([12, 762, 9, 'Documento di emergenza - aggiornare periodicamente']);
    var y = 730;
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      var v = val(f[0]);
      if (!v) continue;
      // Wrap long values at ~70 chars
      var vStr = String(v).replace(/\n/g, ' / ');
      while (vStr.length > 0) {
        var chunk = vStr.substring(0, 70);
        vStr = vStr.substring(70);
        lines.push([12, y, 9, f[2] + ': ' + chunk]);
        y -= 14;
      }
      y -= 4;
    }
    lines.push([12, y - 8, 8, 'Generato il ' + new Date().toLocaleDateString('it-IT') + ' - ippocra.com/ippo']);

    var contentParts = ['BT /F1 12 Tf 1 0 0 1 0 0 cm'];
    for (var j = 0; j < lines.length; j++) {
      var ln = lines[j];
      contentParts.push('BT /F1 ' + ln[2] + ' Tf 1 0 0 1 ' + ln[0] + ' ' + ln[1] + ' Td (' + pdfEsc(ln[3]) + ') Tj ET');
    }
    contentParts.push('ET');
    var contentStream = contentParts.join('\n');

    var objs = [];
    objs[1] = '<< /Type /Catalog /Pages 2 0 R >>';
    objs[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
    objs[3] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>';
    objs[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
    objs[5] = '<< /Length ' + contentStream.length + ' >>\nstream\n' + contentStream + '\nendstream';

    var pdf = '%PDF-1.4\n';
    var offsets = [];
    for (var n = 1; n <= 5; n++) {
      offsets[n] = pdf.length;
      pdf += n + ' 0 obj\n' + objs[n] + '\nendobj\n';
    }
    var xrefPos = pdf.length;
    pdf += 'xref\n0 6\n0000000000 65535 f \n';
    for (var m = 1; m <= 5; m++) {
      pdf += String(offsets[m]).padStart(10, '0') + ' 00000 n \n';
    }
    pdf += 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xrefPos + '\n%%EOF';

    return pdf;
  }

  btnGenerate.addEventListener('click', function () {
    var name = val('nome');
    if (!name) {
      alert('Inserisci almeno il nome e cognome.');
      return;
    }
    previewContent.innerHTML = buildHtml();
    preview.style.display = 'block';

    var pdfStr = makePdf();
    var bytes = new Uint8Array(pdfStr.length);
    for (var i = 0; i < pdfStr.length; i++) bytes[i] = pdfStr.charCodeAt(i) & 0xff;
    var blob = new Blob([bytes], { type: 'application/pdf' });
    var url = URL.createObjectURL(blob);
    btnDownload.href = url;
    btnDownload.style.display = 'inline-block';

    preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Print-only CSS injection
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '@media print {',
    '  body * { visibility: hidden; }',
    '  .preview, .preview * { visibility: visible; }',
    '  .preview { position: absolute; left: 0; top: 0; width: 100%; }',
    '}'
  ].join('\n');
  document.head.appendChild(styleEl);
})();

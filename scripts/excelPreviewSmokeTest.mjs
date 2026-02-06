import * as XLSX from 'xlsx';

const MAX_PREVIEW_DATA_ROWS = 100;
const MAX_PREVIEW_COLS = 30;

const buildSheetPreview = (worksheet) => {
  const ref = worksheet['!ref'];
  const decoded = ref ? XLSX.utils.decode_range(ref) : null;
  const fullRows = decoded ? decoded.e.r + 1 : 0;
  const fullCols = decoded ? decoded.e.c + 1 : 0;

  const maxReadRows = 1 + MAX_PREVIEW_DATA_ROWS;
  const previewRange =
    decoded && fullRows > 0 && fullCols > 0
      ? {
          s: { r: 0, c: 0 },
          e: {
            r: Math.min(decoded.e.r, maxReadRows - 1),
            c: Math.min(decoded.e.c, MAX_PREVIEW_COLS - 1),
          },
        }
      : undefined;

  const rows = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: '',
    blankrows: false,
    range: previewRange,
  });

  const headerRow = Array.isArray(rows?.[0]) ? rows[0] : [];
  const dataRows = Array.isArray(rows) ? rows.slice(1) : [];
  const colCount = Math.max(
    headerRow.length,
    ...dataRows.map((r) => (Array.isArray(r) ? r.length : 0)),
    0,
  );

  return {
    fullRows,
    fullCols,
    previewDataRows: dataRows.length,
    previewCols: Math.min(colCount, MAX_PREVIEW_COLS),
  };
};

const wb = XLSX.utils.book_new();
const sheet1 = XLSX.utils.aoa_to_sheet([
  ['姓名', '年龄', '城市'],
  ['Alice', 18, '上海'],
  ['Bob', 20, '北京'],
]);
const sheet2 = XLSX.utils.aoa_to_sheet([
  ['id', 'value'],
  [1, 'a'],
  [2, 'b'],
]);
XLSX.utils.book_append_sheet(wb, sheet1, 'SheetA');
XLSX.utils.book_append_sheet(wb, sheet2, 'SheetB');

const out = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
const file = new File([out], 'demo.xlsx', {
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
});

const ab = await file.arrayBuffer();
const parsed = XLSX.read(ab, { type: 'array' });
if (!Array.isArray(parsed.SheetNames) || parsed.SheetNames.length !== 2) {
  throw new Error('SheetNames 解析失败');
}

const p1 = buildSheetPreview(parsed.Sheets[parsed.SheetNames[0]]);
const p2 = buildSheetPreview(parsed.Sheets[parsed.SheetNames[1]]);
if (p1.previewDataRows !== 2 || p1.previewCols !== 3) {
  throw new Error(`SheetA 预览不符合预期: ${JSON.stringify(p1)}`);
}
if (p2.previewDataRows !== 2 || p2.previewCols !== 2) {
  throw new Error(`SheetB 预览不符合预期: ${JSON.stringify(p2)}`);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      node: process.version,
      sheets: parsed.SheetNames,
      sheetA: p1,
      sheetB: p2,
    },
    null,
    2,
  ),
);


import type { UploadExcelResult } from '@/services/uploadExcel';
import { mockUploadExcel } from '@/services/uploadExcel';
import type { UploadProps } from 'antd';
import {
  Button,
  Card,
  Descriptions,
  Select,
  Space,
  Table,
  Typography,
  Upload,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const MAX_PREVIEW_DATA_ROWS = 100;
const MAX_PREVIEW_COLS = 30;

type SheetPreview = {
  sheetName: string;
  columns: ColumnsType<Record<string, any>>;
  dataSource: Record<string, any>[];
  fullRows: number;
  fullCols: number;
  previewDataRows: number;
  previewCols: number;
  truncatedRows: boolean;
  truncatedCols: boolean;
};

type PreviewState = {
  fileName: string;
  fileSize: number;
  sheetNames: string[];
  activeSheetName: string;
  sheets: Record<string, SheetPreview>;
};

const formatBytes = (size: number) => {
  if (!Number.isFinite(size) || size <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let idx = 0;
  let value = size;
  while (value >= 1024 && idx < units.length - 1) {
    value /= 1024;
    idx += 1;
  }
  return `${value.toFixed(idx === 0 ? 0 : 2)} ${units[idx]}`;
};

const normalizeColumnTitles = (rawTitles: string[]) => {
  const counter = new Map<string, number>();
  return rawTitles.map((title) => {
    const base = title.trim() || '列';
    const next = (counter.get(base) ?? 0) + 1;
    counter.set(base, next);
    return next === 1 ? base : `${base}(${next})`;
  });
};

const buildSheetPreview = (
  sheetName: string,
  worksheet: XLSX.WorkSheet,
): SheetPreview => {
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

  const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, {
    header: 1,
    defval: '',
    blankrows: false,
    range: previewRange as any,
  }) as any[][];

  const headerRow = Array.isArray(rows?.[0]) ? rows[0] : [];
  const dataRows = Array.isArray(rows) ? rows.slice(1) : [];

  const colCount = Math.max(
    headerRow.length,
    ...dataRows.map((r) => (Array.isArray(r) ? r.length : 0)),
    0,
  );
  const previewCols = Math.min(colCount, MAX_PREVIEW_COLS);
  const columnKeys = Array.from({ length: previewCols }, (_, i) => `c${i}`);

  const rawTitles = columnKeys.map((_, i) => {
    const value = headerRow[i];
    const text = value === null || value === undefined ? '' : String(value);
    return text.trim() || `列${i + 1}`;
  });
  const titles = normalizeColumnTitles(rawTitles);

  const columns: ColumnsType<Record<string, any>> = columnKeys.map(
    (key, i) => ({
      title: titles[i],
      dataIndex: key,
      key,
      ellipsis: true,
    }),
  );

  const dataSource = dataRows
    .slice(0, MAX_PREVIEW_DATA_ROWS)
    .map((row, rowIndex) => {
      const record: Record<string, any> = { key: `${sheetName}_${rowIndex}` };
      for (let i = 0; i < previewCols; i += 1) {
        record[columnKeys[i]] = Array.isArray(row) ? row[i] ?? '' : '';
      }
      return record;
    });

  const truncatedRows = fullRows > maxReadRows;
  const truncatedCols = fullCols > MAX_PREVIEW_COLS;

  return {
    sheetName,
    columns,
    dataSource,
    fullRows,
    fullCols,
    previewDataRows: dataSource.length,
    previewCols,
    truncatedRows,
    truncatedCols,
  };
};

const parseExcelFile = async (
  file: File,
): Promise<Omit<PreviewState, 'activeSheetName'>> => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetNames = Array.isArray(workbook.SheetNames)
    ? workbook.SheetNames
    : [];
  if (sheetNames.length === 0) {
    throw new Error('未读取到工作表（Sheet）');
  }

  const sheets: Record<string, SheetPreview> = {};
  for (const sheetName of sheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) continue;
    sheets[sheetName] = buildSheetPreview(sheetName, worksheet);
  }

  return {
    fileName: file.name,
    fileSize: file.size,
    sheetNames,
    sheets,
  };
};

const ExcelUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [activeSheetName, setActiveSheetName] = useState<string>('');
  const [uploadResult, setUploadResult] = useState<UploadExcelResult | null>(
    null,
  );

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isExcel = /\.(xlsx|xls)$/i.test(file.name);
    if (!isExcel) {
      message.error('请上传 .xls 或 .xlsx 文件');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onError, onSuccess } = options;
    if (!(file instanceof File)) {
      onError?.(new Error('文件类型不正确'));
      return;
    }

    setUploadResult(null);

    setParsing(true);
    try {
      const parsed = await parseExcelFile(file);
      const nextActive = parsed.sheetNames[0] ?? '';
      setPreview({
        ...parsed,
        activeSheetName: nextActive,
      });
      setActiveSheetName(nextActive);
    } catch (e) {
      const err = e instanceof Error ? e : new Error('解析失败');
      message.error(err.message);
      onError?.(err);
      return;
    } finally {
      setParsing(false);
    }

    setUploading(true);

    try {
      const data = await mockUploadExcel(file);
      message.success('上传成功（模拟接口）');
      setUploadResult(data);
      onSuccess?.(data, file);
    } catch (e) {
      const err = e instanceof Error ? e : new Error('上传失败');
      message.error(err.message);
      onError?.(err);
    } finally {
      setUploading(false);
    }
  };

  const effectiveActiveSheetName =
    activeSheetName || preview?.activeSheetName || '';
  const activeSheetPreview = effectiveActiveSheetName
    ? preview?.sheets[effectiveActiveSheetName]
    : undefined;
  const hasMultipleSheets = (preview?.sheetNames.length ?? 0) > 1;
  const isBusy = uploading || parsing;

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Upload
          accept=".xls,.xlsx"
          maxCount={1}
          beforeUpload={beforeUpload}
          customRequest={customRequest}
          disabled={isBusy}
          showUploadList={false}
        >
          <Button type="primary" loading={isBusy}>
            点击上传 Excel
          </Button>
        </Upload>

        {preview && (
          <Card size="small" title="本地预览">
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              <Descriptions
                size="small"
                column={2}
                items={[
                  { label: '文件名', children: preview.fileName },
                  {
                    label: '文件大小',
                    children: formatBytes(preview.fileSize),
                  },
                  { label: '工作表数量', children: preview.sheetNames.length },
                  {
                    label: '当前 Sheet',
                    children: (
                      <Space size={8}>
                        {hasMultipleSheets ? (
                          <Select
                            value={effectiveActiveSheetName}
                            style={{ minWidth: 200 }}
                            options={preview.sheetNames.map((name) => ({
                              label: name,
                              value: name,
                            }))}
                            onChange={(value) => setActiveSheetName(value)}
                          />
                        ) : (
                          <Typography.Text>
                            {effectiveActiveSheetName}
                          </Typography.Text>
                        )}
                      </Space>
                    ),
                  },
                ]}
              />

              {activeSheetPreview ? (
                <>
                  <Typography.Text type="secondary">
                    预览 {activeSheetPreview.previewDataRows} 行数据 /{' '}
                    {activeSheetPreview.previewCols} 列
                    {activeSheetPreview.truncatedRows ||
                    activeSheetPreview.truncatedCols
                      ? `（已截断：最多 ${MAX_PREVIEW_DATA_ROWS} 行数据、${MAX_PREVIEW_COLS} 列）`
                      : ''}
                  </Typography.Text>

                  {activeSheetPreview.columns.length > 0 ? (
                    <Table
                      size="small"
                      columns={activeSheetPreview.columns}
                      dataSource={activeSheetPreview.dataSource}
                      pagination={false}
                      scroll={{ x: 'max-content', y: 420 }}
                    />
                  ) : (
                    <Typography.Text type="secondary">
                      该 Sheet 没有可预览的数据
                    </Typography.Text>
                  )}
                </>
              ) : (
                <Typography.Text type="secondary">
                  未找到可预览的 Sheet
                </Typography.Text>
              )}
            </Space>
          </Card>
        )}

        {uploadResult && (
          <Card size="small" title="上传结果（模拟接口）">
            <Descriptions
              size="small"
              column={2}
              items={[
                { label: 'taskId', children: uploadResult.taskId },
                { label: 'uploadedAt', children: uploadResult.uploadedAt },
                { label: 'fileName', children: uploadResult.fileName },
                { label: 'size', children: formatBytes(uploadResult.size) },
                { label: 'rows', children: uploadResult.rows },
              ]}
            />
          </Card>
        )}
      </Space>
    </div>
  );
};

export default ExcelUpload;

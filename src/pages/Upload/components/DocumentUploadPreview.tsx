import type {
  DocumentKind,
  UploadDocumentResult,
} from '@/services/uploadDocument';
import { mockUploadDocument } from '@/services/uploadDocument';
import { pptxToHtml } from '@jvmr/pptx-to-html';
import type { UploadProps } from 'antd';
import {
  Button,
  Card,
  Descriptions,
  Progress,
  Space,
  Typography,
  Upload,
  message,
} from 'antd';
import { renderAsync } from 'docx-preview';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type FileMeta = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
};

type DocumentUploadPreviewProps = {
  title: string;
  description: string;
  accept: string;
  allowedExtensions: string[];
  kind: DocumentKind;
  maxSizeMB?: number;
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

const formatDateTime = (timestamp: number) => {
  if (!Number.isFinite(timestamp)) return '-';
  return new Date(timestamp).toLocaleString('zh-CN');
};

const buildExtTip = (extensions: string[]) =>
  extensions.map((item) => item.toLowerCase()).join(' / ');

const DocumentUploadPreview: React.FC<DocumentUploadPreviewProps> = ({
  title,
  description,
  accept,
  allowedExtensions,
  kind,
  maxSizeMB = 20,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [fileMeta, setFileMeta] = useState<FileMeta | null>(null);
  const [lastFile, setLastFile] = useState<File | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [pptSlidesHtml, setPptSlidesHtml] = useState<string[]>([]);
  const [uploadResult, setUploadResult] = useState<UploadDocumentResult | null>(
    null,
  );
  const wordContainerRef = useRef<HTMLDivElement>(null);

  const extTip = useMemo(
    () => buildExtTip(allowedExtensions),
    [allowedExtensions],
  );
  const maxSizeBytes = useMemo(
    () => Math.max(0, maxSizeMB) * 1024 * 1024,
    [maxSizeMB],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const resetPreviewUrl = (nextFile: File) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(nextFile);
    setPreviewUrl(url);
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const name = file.name.toLowerCase();
    const isAllowed = allowedExtensions.some((ext) => name.endsWith(ext));
    if (!isAllowed) {
      message.error(`请上传 ${extTip} 文件`);
      return Upload.LIST_IGNORE;
    }
    if (maxSizeBytes > 0 && file.size > maxSizeBytes) {
      message.error(`文件大小不能超过 ${maxSizeMB} MB`);
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const preparePreview = async (file: File) => {
    resetPreviewUrl(file);
    setPreviewError(null);
    setPptSlidesHtml([]);
    setFileBuffer(null);
    setFileMeta({
      name: file.name,
      size: file.size,
      type: file.type || '-',
      lastModified: file.lastModified,
    });

    const buffer = await file.arrayBuffer();
    setFileBuffer(buffer);
  };

  const runUpload = async (
    file: File,
    onSuccess?: UploadProps['customRequest'] extends (options: infer T) => any
      ? T['onSuccess']
      : undefined,
    onError?: UploadProps['customRequest'] extends (options: infer T) => any
      ? T['onError']
      : undefined,
    onProgress?: UploadProps['customRequest'] extends (options: infer T) => any
      ? T['onProgress']
      : undefined,
  ) => {
    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    setLastFile(file);

    let percent = 0;
    const timer = window.setInterval(() => {
      percent = Math.min(percent + 6 + Math.random() * 10, 92);
      setUploadProgress(percent);
      onProgress?.({ percent }, file);
    }, 240);

    try {
      const result = await mockUploadDocument(file, kind);
      window.clearInterval(timer);
      setUploadProgress(100);
      onProgress?.({ percent: 100 }, file);
      setUploadResult(result);
      message.success('上传成功（模拟接口）');
      onSuccess?.(result, file);
    } catch (e) {
      window.clearInterval(timer);
      const err = e instanceof Error ? e : new Error('上传失败');
      setUploadError(err.message);
      setUploadProgress(0);
      message.error(err.message);
      onError?.(err);
    } finally {
      setUploading(false);
    }
  };

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onError, onSuccess, onProgress } = options;
    if (!(file instanceof File)) {
      const err = new Error('文件类型不正确');
      message.error(err.message);
      onError?.(err);
      return;
    }

    setUploadResult(null);
    setUploadProgress(0);
    setUploadError(null);

    try {
      await preparePreview(file);
    } catch (e) {
      const err = e instanceof Error ? e : new Error('文件解析失败');
      setPreviewError(err.message);
      message.error(err.message);
      onError?.(err);
      return;
    }
    await runUpload(file, onSuccess, onError, onProgress);
  };

  useEffect(() => {
    if (kind !== 'word' || !fileBuffer || !wordContainerRef.current) return;
    setPreviewError(null);
    wordContainerRef.current.innerHTML = '';
    renderAsync(fileBuffer, wordContainerRef.current)
      .then(() => {})
      .catch((e) => {
        const err = e instanceof Error ? e : new Error('文档渲染失败');
        setPreviewError(err.message);
      });
  }, [fileBuffer, kind]);

  useEffect(() => {
    if (kind !== 'ppt' || !fileBuffer) return;
    setPreviewError(null);
    pptxToHtml(fileBuffer, {
      width: 960,
      height: 540,
      scaleToFit: true,
      letterbox: true,
    })
      .then((slides) => {
        setPptSlidesHtml(slides);
      })
      .catch((e) => {
        const err = e instanceof Error ? e : new Error('PPT 渲染失败');
        setPreviewError(err.message);
      });
  }, [fileBuffer, kind]);

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card size="small" title={title}>
          <Space direction="vertical" size={8}>
            <Typography.Text>{description}</Typography.Text>
            <Typography.Text type="secondary">
              支持格式：{extTip}，大小限制：{maxSizeMB} MB
            </Typography.Text>
          </Space>
        </Card>

        <Upload.Dragger
          accept={accept}
          maxCount={1}
          beforeUpload={beforeUpload}
          customRequest={customRequest}
          disabled={uploading}
          showUploadList={false}
          height={220}
        >
          <Space direction="vertical" size={8}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              拖拽文件到这里上传
            </Typography.Title>
            <Typography.Text type="secondary">
              点击或拖拽上传 {extTip} 文件
            </Typography.Text>
            {uploading ? (
              <Typography.Text type="secondary">上传中…</Typography.Text>
            ) : null}
          </Space>
        </Upload.Dragger>

        {(uploadProgress > 0 || uploading || uploadError) && (
          <Card size="small" title="上传进度">
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Progress
                percent={uploadProgress}
                status={
                  uploadError ? 'exception' : uploading ? 'active' : 'normal'
                }
              />
              {uploadError && lastFile && !uploading ? (
                <Button
                  type="primary"
                  onClick={() =>
                    runUpload(lastFile, undefined, undefined, undefined)
                  }
                >
                  重试上传
                </Button>
              ) : null}
            </Space>
          </Card>
        )}

        {fileMeta && (
          <Card size="small" title="文件信息">
            <Descriptions
              size="small"
              column={2}
              items={[
                { label: '文件名', children: fileMeta.name },
                { label: '大小', children: formatBytes(fileMeta.size) },
                { label: 'MIME 类型', children: fileMeta.type },
                {
                  label: '最后修改时间',
                  children: formatDateTime(fileMeta.lastModified),
                },
              ]}
            />
          </Card>
        )}

        {previewUrl && (
          <Card
            size="small"
            title="预览区域"
            extra={
              <Button type="link" href={previewUrl} download={fileMeta?.name}>
                下载原文件
              </Button>
            }
          >
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Typography.Text type="secondary">
                {kind === 'pdf'
                  ? 'PDF 预览由浏览器内置能力提供。'
                  : kind === 'word'
                  ? 'Word 预览由 docx 解析渲染完成。'
                  : 'PPT 预览由 pptx 转 HTML 渲染完成。'}
              </Typography.Text>
              {previewError ? (
                <Typography.Text type="danger">{previewError}</Typography.Text>
              ) : null}
              {kind === 'pdf' ? (
                <iframe
                  src={previewUrl}
                  title={`${kind}-preview`}
                  style={{
                    width: '100%',
                    height: 620,
                    border: '1px solid #f0f0f0',
                    borderRadius: 4,
                  }}
                />
              ) : null}
              {kind === 'word' ? (
                <div
                  ref={wordContainerRef}
                  style={{
                    width: '100%',
                    minHeight: 620,
                    border: '1px solid #f0f0f0',
                    borderRadius: 4,
                    padding: 16,
                    overflow: 'auto',
                  }}
                />
              ) : null}
              {kind === 'ppt' ? (
                <div
                  style={{
                    width: '100%',
                    minHeight: 620,
                    border: '1px solid #f0f0f0',
                    borderRadius: 4,
                    padding: 16,
                    display: 'grid',
                    gap: 16,
                    background: '#fafafa',
                  }}
                >
                  {pptSlidesHtml.map((html, idx) => (
                    <div
                      key={`slide_${idx}`}
                      style={{
                        background: '#fff',
                        border: '1px solid #e9e9e9',
                        borderRadius: 4,
                        padding: 8,
                        overflow: 'auto',
                      }}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  ))}
                </div>
              ) : null}
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
                { label: 'fileName', children: uploadResult.fileName },
                { label: 'size', children: formatBytes(uploadResult.size) },
                { label: 'kind', children: uploadResult.kind },
                {
                  label: 'uploadedAt',
                  children: new Date(uploadResult.uploadedAt).toLocaleString(
                    'zh-CN',
                  ),
                },
              ]}
            />
          </Card>
        )}
      </Space>
    </div>
  );
};

export default DocumentUploadPreview;

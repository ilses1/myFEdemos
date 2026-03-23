import type {
  DocumentKind,
  UploadDocumentResult,
} from '@/services/uploadDocument';
import { mockUploadDocument } from '@/services/uploadDocument';
import type { UploadProps } from 'antd';
import {
  Button,
  Card,
  Descriptions,
  Space,
  Typography,
  Upload,
  message,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

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
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [fileMeta, setFileMeta] = useState<FileMeta | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadDocumentResult | null>(
    null,
  );

  const extTip = useMemo(
    () => buildExtTip(allowedExtensions),
    [allowedExtensions],
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
    return true;
  };

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onError, onSuccess } = options;
    if (!(file instanceof File)) {
      const err = new Error('文件类型不正确');
      message.error(err.message);
      onError?.(err);
      return;
    }

    setUploadResult(null);
    resetPreviewUrl(file);
    setFileMeta({
      name: file.name,
      size: file.size,
      type: file.type || '-',
      lastModified: file.lastModified,
    });

    setUploading(true);
    try {
      const result = await mockUploadDocument(file, kind);
      setUploadResult(result);
      message.success('上传成功（模拟接口）');
      onSuccess?.(result, file);
    } catch (e) {
      const err = e instanceof Error ? e : new Error('上传失败');
      message.error(err.message);
      onError?.(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card size="small" title={title}>
          <Space direction="vertical" size={8}>
            <Typography.Text>{description}</Typography.Text>
            <Typography.Text type="secondary">
              支持格式：{extTip}
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
                  : 'Word/PPT 预览依赖浏览器插件能力，若显示空白请下载本地查看。'}
              </Typography.Text>
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

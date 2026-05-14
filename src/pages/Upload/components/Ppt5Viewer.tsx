import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Card, Empty, Spin } from 'antd';
import { convert } from 'pptx-to-pdf';
import React, { useEffect, useState } from 'react';

// 确保在组件外部也能访问到 Buffer，防止某些库在初始化时报错
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = require('buffer').Buffer;
}

interface Ppt5ViewerProps {
  file: File;
}

const PDF_WORKER_URL =
  'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

const Ppt5Viewer: React.FC<Ppt5ViewerProps> = ({ file }) => {
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (!file) return;

    const transform = async () => {
      try {
        setLoading(true);
        setError(null);

        const arrayBuffer = await file.arrayBuffer();
        // pptx-to-pdf 转换
        const pdfBuffer = await convert(new Uint8Array(arrayBuffer));

        const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        setPdfUrl(url);
        setLoading(false);
      } catch (err) {
        console.error('PPT5 Convert Error:', err);
        setError(err instanceof Error ? err.message : '转换为 PDF 失败');
        setLoading(false);
      }
    };

    transform();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [file]);

  if (error) {
    return (
      <Card size="small" style={{ textAlign: 'center', padding: 40 }}>
        <Empty description={`预览失败: ${error}`} />
      </Card>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: 620,
        background: '#f0f2f5',
        borderRadius: 8,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: loading ? 'center' : 'flex-start',
        border: '1px solid #d9d9d9',
      }}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Spin tip="正在将 PPT 转换为 PDF 以便预览..." size="large" />
        </div>
      ) : (
        pdfUrl && (
          <div
            style={{
              width: '100%',
              height: 750,
              border: '1px solid #f0f0f0',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <Worker workerUrl={PDF_WORKER_URL}>
              <Viewer
                fileUrl={pdfUrl}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </div>
        )
      )}
    </div>
  );
};

export default Ppt5Viewer;

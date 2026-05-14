import { Card, Empty, Spin } from 'antd';
import { PowerPointViewer } from 'pptx-react-viewer';
import 'pptx-react-viewer/styles.css';
import React, { useEffect, useState } from 'react';

interface Ppt3ViewerProps {
  file: File;
}

const Ppt3Viewer: React.FC<Ppt3ViewerProps> = ({ file }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<Uint8Array | null>(null);

  useEffect(() => {
    const loadFile = async () => {
      try {
        setLoading(true);
        setError(null);
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        setContent(uint8Array);
        setLoading(false);
      } catch (err) {
        console.error('PPT Load Error:', err);
        setError(err instanceof Error ? err.message : '加载失败');
        setLoading(false);
      }
    };

    loadFile();
  }, [file]);

  if (error) {
    return (
      <Card size="small" style={{ textAlign: 'center', padding: 40 }}>
        <Empty description={error} />
      </Card>
    );
  }

  return (
    <Card size="small" style={{ height: '650px', overflow: 'hidden' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            zIndex: 10,
          }}
        >
          <Spin size="large" tip="加载中..." />
        </div>
      )}
      <div style={{ height: '100%', width: '100%' }}>
        <PowerPointViewer
          content={content!}
          theme="light"
          onLoadError={(err) => {
            console.error('Viewer Load Error:', err);
            setError('预览加载失败');
          }}
        />
      </div>
    </Card>
  );
};

export default Ppt3Viewer;

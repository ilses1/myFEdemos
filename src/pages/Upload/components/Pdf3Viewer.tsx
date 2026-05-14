import { CloseOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Viewer, Worker, type Plugin } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import type { ThumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { Button, Tooltip } from 'antd';
import * as React from 'react';
import { useMemo, useState } from 'react';

const PDF_WORKER_URL =
  'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

type Pdf3ViewerProps = {
  fileUrl: string;
  thumbnailPluginInstance: ThumbnailPlugin;
};

const Pdf3Viewer: React.FC<Pdf3ViewerProps> = ({
  fileUrl,
  thumbnailPluginInstance,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { Thumbnails } = thumbnailPluginInstance;
  const plugins = useMemo(
    () => [thumbnailPluginInstance].filter((p) => p !== undefined) as Plugin[],
    [thumbnailPluginInstance],
  );

  // 处理页面变化，同步高亮缩略图
  const handlePageChange = (e: { currentPage: number }) => {
    setCurrentPage(e.currentPage);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 全屏样式
  const containerStyle: React.CSSProperties = useMemo(() => {
    if (isFullscreen) {
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
      };
    }
    return {
      width: '100%',
      height: 620,
      border: '1px solid #f0f0f0',
      borderRadius: 4,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
    };
  }, [isFullscreen]);

  return (
    <div style={containerStyle}>
      {/* 全屏切换按钮 */}
      <div style={{ position: 'absolute', top: 12, right: 24, zIndex: 10 }}>
        <Tooltip title={isFullscreen ? '退出全屏' : '全屏预览'}>
          <Button
            type="primary"
            shape="circle"
            icon={isFullscreen ? <CloseOutlined /> : <FullscreenOutlined />}
            onClick={toggleFullscreen}
          />
        </Tooltip>
      </div>

      {/* 左侧缩略图栏 */}
      <div
        style={{
          width: 200,
          borderRight: '1px solid #f0f0f0',
          height: '100%',
          overflow: 'auto',
          backgroundColor: '#fafafa',
          padding: '12px 0',
        }}
      >
        <div className="pdf3-thumbnails-container">
          <Thumbnails
            renderThumbnailItem={(props) => (
              <div
                key={props.pageIndex}
                onClick={props.onClick}
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  backgroundColor:
                    props.pageIndex === currentPage ? '#e6f4ff' : 'transparent',
                  borderLeft:
                    props.pageIndex === currentPage
                      ? '3px solid #1677ff'
                      : '3px solid transparent',
                  transition: 'all 0.3s',
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    borderRadius: 2,
                    overflow: 'hidden',
                    border:
                      props.pageIndex === currentPage
                        ? '1px solid #1677ff'
                        : '1px solid #d9d9d9',
                  }}
                >
                  {props.thumbnail}
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    marginTop: 4,
                    color:
                      props.pageIndex === currentPage ? '#1677ff' : '#8c8c8c',
                    fontWeight: props.pageIndex === currentPage ? 500 : 400,
                  }}
                >
                  第 {props.pageIndex + 1} 页
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* 右侧主预览区 */}
      <div
        style={{
          flex: 1,
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Worker workerUrl={PDF_WORKER_URL}>
          <Viewer
            fileUrl={fileUrl}
            plugins={plugins}
            onPageChange={handlePageChange}
          />
        </Worker>
      </div>
    </div>
  );
};

export default Pdf3Viewer;

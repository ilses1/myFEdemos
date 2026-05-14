import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  LeftOutlined,
  RightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Button, Card, Empty, Space, Spin, Typography } from 'antd';
import { PPTXViewer } from 'pptxviewjs';
import React, { useEffect, useRef, useState } from 'react';

interface Ppt2ViewerProps {
  file: File;
}

const Ppt2Viewer: React.FC<Ppt2ViewerProps> = ({ file }) => {
  const [loading, setLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slideSize, setSlideSize] = useState({ width: 960, height: 540 });
  const [scale, setScale] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<PPTXViewer | null>(null);

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    if (!file || !mainCanvasRef.current) return;

    const init = async () => {
      try {
        setLoading(true);
        setError(null);

        const canvas = mainCanvasRef.current!;
        const viewer = new PPTXViewer({ canvas });

        await viewer.loadFile(file);
        viewerRef.current = viewer;

        const slideWidth = 960;
        const slideHeight = 540;
        setSlideSize({ width: slideWidth, height: slideHeight });
        setTotalSlides(viewer.getSlideCount());

        canvas.width = slideWidth * dpr;
        canvas.height = slideHeight * dpr;
        canvas.style.width = `${slideWidth}px`;
        canvas.style.height = `${slideHeight}px`;

        await viewer.render();
        setCurrentIndex(0);
        setLoading(false);

        const generateThumbnails = async () => {
          const count = viewer.getSlideCount();
          const thumbs: string[] = [];
          const tempCanvas = document.createElement('canvas');
          const thumbWidth = 320;
          const thumbHeight = Math.round(
            (thumbWidth / slideWidth) * slideHeight,
          );

          tempCanvas.width = thumbWidth * dpr;
          tempCanvas.height = thumbHeight * dpr;
          tempCanvas.style.width = `${thumbWidth}px`;
          tempCanvas.style.height = `${thumbHeight}px`;

          const thumbViewer = new PPTXViewer({ canvas: tempCanvas });
          await thumbViewer.loadFile(file);

          for (let i = 0; i < count; i++) {
            await thumbViewer.goToSlide(i);
            await thumbViewer.render();
            thumbs.push(tempCanvas.toDataURL('image/png', 0.95));
          }
          setThumbnails(thumbs);
        };

        generateThumbnails().catch(console.error);
      } catch (err) {
        console.error('PPT2 Init Error:', err);
        setError(err instanceof Error ? err.message : '加载失败');
        setLoading(false);
      }
    };

    init();

    return () => {
      viewerRef.current = null;
    };
  }, [file, dpr]);

  const handleSlideChange = async (index: number) => {
    if (!viewerRef.current || index < 0 || index >= totalSlides) return;

    try {
      await viewerRef.current.goToSlide(index);
      await viewerRef.current.render();
      setCurrentIndex(index);
    } catch (err) {
      console.error('Slide Change Error:', err);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`,
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleZoom = (delta: number) => {
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    setScale(newScale);

    if (viewerRef.current && mainCanvasRef.current) {
      const viewer = viewerRef.current;
      const canvas = mainCanvasRef.current;
      const { width, height } = slideSize;

      canvas.width = width * dpr * newScale;
      canvas.height = height * dpr * newScale;
      canvas.style.width = `${width * newScale}px`;
      canvas.style.height = `${height * newScale}px`;

      viewer.render();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleSlideChange(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handleSlideChange(currentIndex - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === '+' || e.key === '=') {
        handleZoom(0.1);
      } else if (e.key === '-') {
        handleZoom(-0.1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalSlides, scale, slideSize, dpr]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (error) {
    return (
      <Card size="small" style={{ textAlign: 'center', padding: 40 }}>
        <Empty description={error} />
      </Card>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: isFullscreen ? 'column' : 'row',
        height: isFullscreen ? '100vh' : '650px',
        background: '#f0f2f5',
        borderRadius: isFullscreen ? 0 : 8,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {!isFullscreen && (
        <div
          style={{
            width: '220px',
            background: '#fff',
            borderRight: '1px solid #d9d9d9',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '12px',
              borderBottom: '1px solid #f0f0f0',
              fontWeight: 'bold',
            }}
          >
            幻灯片 ({totalSlides})
          </div>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {thumbnails.length > 0 ? (
              thumbnails.map((thumb, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSlideChange(idx)}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    border:
                      currentIndex === idx
                        ? '2px solid #1890ff'
                        : '2px solid transparent',
                    borderRadius: '4px',
                    padding: '2px',
                    transition: 'all 0.3s',
                  }}
                >
                  <img
                    src={thumb}
                    alt={`Slide ${idx + 1}`}
                    style={{
                      width: '100%',
                      display: 'block',
                      borderRadius: '2px',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      right: 4,
                      background: 'rgba(0,0,0,0.5)',
                      color: '#fff',
                      fontSize: '10px',
                      padding: '0 4px',
                      borderRadius: '2px',
                    }}
                  >
                    {idx + 1}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  color: '#999',
                  paddingTop: '20px',
                }}
              >
                {loading ? <Spin size="small" /> : '正在生成预览...'}
              </div>
            )}
          </div>
        </div>
      )}

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: isFullscreen ? '#000' : '#f0f2f5',
        }}
      >
        <div
          style={{
            padding: '8px 16px',
            background: isFullscreen ? 'rgba(255,255,255,0.1)' : '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
            color: isFullscreen ? '#fff' : 'inherit',
            boxShadow: isFullscreen ? 'none' : '0 1px 2px rgba(0,0,0,0.05)',
          }}
        >
          <Space>
            <Button
              type="text"
              icon={<LeftOutlined />}
              disabled={currentIndex === 0}
              onClick={() => handleSlideChange(currentIndex - 1)}
              style={{ color: isFullscreen ? '#fff' : 'inherit' }}
            />
            <Typography.Text
              style={{ color: isFullscreen ? '#fff' : 'inherit' }}
            >
              第 {currentIndex + 1} / {totalSlides} 页
            </Typography.Text>
            <Button
              type="text"
              icon={<RightOutlined />}
              disabled={currentIndex === totalSlides - 1}
              onClick={() => handleSlideChange(currentIndex + 1)}
              style={{ color: isFullscreen ? '#fff' : 'inherit' }}
            />
          </Space>

          <Button
            type="text"
            icon={
              isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
            }
            onClick={toggleFullscreen}
            style={{ color: isFullscreen ? '#fff' : 'inherit' }}
          >
            {isFullscreen ? '退出全屏' : '全屏'}
          </Button>
          <Button
            type="text"
            icon={<ZoomOutOutlined />}
            onClick={() => handleZoom(-0.1)}
            style={{ color: isFullscreen ? '#fff' : 'inherit' }}
          />
          <Typography.Text
            style={{
              color: isFullscreen ? '#fff' : 'inherit',
              minWidth: '50px',
              textAlign: 'center',
            }}
          >
            {Math.round(scale * 100)}%
          </Typography.Text>
          <Button
            type="text"
            icon={<ZoomInOutlined />}
            onClick={() => handleZoom(0.1)}
            style={{ color: isFullscreen ? '#fff' : 'inherit' }}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isFullscreen ? 0 : '24px',
            overflow: 'auto',
          }}
        >
          {loading && (
            <div style={{ position: 'absolute', zIndex: 5 }}>
              <Spin size="large" tip="加载中..." />
            </div>
          )}
          <div
            style={{
              background: '#fff',
              boxShadow: isFullscreen ? 'none' : '0 4px 12px rgba(0,0,0,0.15)',
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'flex',
            }}
          >
            <canvas
              ref={mainCanvasRef}
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: isFullscreen ? '100vh' : 'calc(650px - 100px)',
                objectFit: 'contain',
                imageRendering: 'crisp-edges',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ppt2Viewer;

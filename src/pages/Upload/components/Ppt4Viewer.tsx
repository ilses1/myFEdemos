import {
  LeftOutlined,
  RightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Button, Card, Empty, Space, Spin, Typography } from 'antd';
import { PptxRenderer } from 'pptx-svg';
import React, { useEffect, useRef, useState } from 'react';

interface Ppt4ViewerProps {
  file: File;
}

const Ppt4Viewer: React.FC<Ppt4ViewerProps> = ({ file }) => {
  const [loading, setLoading] = useState(true);
  const [svgs, setSvgs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const rendererRef = useRef<PptxRenderer | null>(null);

  useEffect(() => {
    if (!file) return;

    const init = async () => {
      try {
        setLoading(true);
        setError(null);

        const renderer = new PptxRenderer();
        // pptx-svg 默认会尝试从 import.meta.url 同级目录加载 main.wasm
        // 如果在打包环境下有问题，可能需要手动提供 wasm 路径
        await renderer.init();

        const buffer = await file.arrayBuffer();
        const { slideCount } = await renderer.loadPptx(buffer);

        rendererRef.current = renderer;
        setTotalSlides(slideCount);

        const allSvgs: string[] = [];
        for (let i = 0; i < slideCount; i++) {
          const svg = renderer.renderSlideSvg(i);
          if (svg.startsWith('ERROR:')) {
            console.error(`Slide ${i} error:`, svg);
            allSvgs.push(
              `<div style="color: red; padding: 20px; text-align: center;">Slide ${
                i + 1
              } 渲染失败: ${svg}</div>`,
            );
          } else {
            // 给 SVG 添加一些基础样式，确保它在容器中表现良好
            const styledSvg = svg.replace(
              '<svg ',
              '<svg style="max-width: 100%; height: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 4px;" ',
            );
            allSvgs.push(styledSvg);
          }
        }
        setSvgs(allSvgs);
        setLoading(false);
      } catch (err) {
        console.error('PPT4 Init Error:', err);
        setError(err instanceof Error ? err.message : '加载失败');
        setLoading(false);
      }
    };

    init();

    return () => {
      rendererRef.current = null;
    };
  }, [file]);

  const handleZoom = (delta: number) => {
    setScale(Math.max(0.5, Math.min(2, scale + delta)));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(totalSlides - 1, prev + 1));
  };

  if (error) {
    return (
      <Card size="small" style={{ textAlign: 'center', padding: 40 }}>
        <Empty description={`加载失败: ${error}`} />
      </Card>
    );
  }

  return (
    <div
      style={{
        background: '#f0f2f5',
        borderRadius: 8,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#fff',
          padding: '8px 16px',
          borderRadius: 4,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
      >
        <Space size="middle">
          <Button
            icon={<LeftOutlined />}
            disabled={currentIndex === 0 || loading}
            onClick={handlePrev}
          >
            上一页
          </Button>
          <Typography.Text strong style={{ minWidth: 60, textAlign: 'center' }}>
            {loading ? '...' : `${currentIndex + 1} / ${totalSlides}`}
          </Typography.Text>
          <Button
            icon={<RightOutlined />}
            disabled={currentIndex === totalSlides - 1 || loading}
            onClick={handleNext}
          >
            下一页
          </Button>
        </Space>

        <Space size="middle">
          <Button icon={<ZoomOutOutlined />} onClick={() => handleZoom(-0.1)} />
          <Typography.Text style={{ minWidth: 40, textAlign: 'center' }}>
            {Math.round(scale * 100)}%
          </Typography.Text>
          <Button icon={<ZoomInOutlined />} onClick={() => handleZoom(0.1)} />
          <Button onClick={() => setScale(1)}>重置</Button>
        </Space>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: loading ? 'center' : 'flex-start',
          minHeight: 500,
          maxHeight: 800,
          background: '#808080',
          borderRadius: 4,
          padding: 24,
          overflow: 'auto',
          border: '1px solid #d9d9d9',
        }}
      >
        {loading ? (
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <Spin tip="正在渲染 PPT 页面..." size="large" />
          </div>
        ) : (
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            dangerouslySetInnerHTML={{ __html: svgs[currentIndex] }}
          />
        )}
      </div>

      {!loading && totalSlides > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            padding: '8px 0',
            scrollbarWidth: 'thin',
          }}
        >
          {svgs.map((svg, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: 120,
                height: 68,
                flexShrink: 0,
                cursor: 'pointer',
                border:
                  currentIndex === idx
                    ? '2px solid #1677ff'
                    : '1px solid #d9d9d9',
                borderRadius: 4,
                overflow: 'hidden',
                background: '#fff',
                opacity: currentIndex === idx ? 1 : 0.7,
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  transform: 'scale(0.12)',
                  width: '800px', // 假设原始宽度
                  display: 'flex',
                  justifyContent: 'center',
                }}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ppt4Viewer;

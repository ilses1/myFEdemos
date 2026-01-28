import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.less';

const MIN_LEFT = 400;
const MIN_RIGHT = 400;
const GAP = 16;

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

/**
 * Hook: 处理拖拽和自适应缩放
 */
const useResizable = (
  containerRef: React.RefObject<HTMLDivElement>,
  leftRef: React.RefObject<HTMLDivElement>,
  minLeft: number,
  minRight: number,
  gap: number,
) => {
  const [leftWidth, setLeftWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 拖拽起始状态
  const dragRef = useRef({ startX: 0, startWidth: 0, containerWidth: 0 });
  // 记录上一次容器宽度用于计算缩放比例
  const prevContainerWidth = useRef(0);

  // 容器尺寸变化时保持比例
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    prevContainerWidth.current = container.getBoundingClientRect().width;

    const observer = new ResizeObserver(([entry]) => {
      const newWidth = entry.contentRect.width;
      const oldWidth = prevContainerWidth.current;

      // 仅当宽度有效且发生变化时计算
      if (oldWidth > gap && newWidth !== oldWidth) {
        setLeftWidth((prev) => {
          if (prev === null) return null;
          // 重新计算宽度以保持比例
          const ratio = prev / (oldWidth - gap);
          const maxLeft = newWidth - gap - minRight;
          return clamp(ratio * (newWidth - gap), minLeft, maxLeft);
        });
      }
      prevContainerWidth.current = newWidth;
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, gap, minLeft, minRight]);

  const onMove = useCallback(
    (e: MouseEvent) => {
      const { startX, startWidth, containerWidth } = dragRef.current;
      const maxLeft = containerWidth - minRight - gap;
      setLeftWidth(clamp(startWidth + (e.clientX - startX), minLeft, maxLeft));
    },
    [minLeft, minRight, gap],
  );

  const onUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [onMove]);

  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!containerRef.current || !leftRef.current) return;

      dragRef.current = {
        startX: e.clientX,
        startWidth: leftRef.current.getBoundingClientRect().width,
        containerWidth: containerRef.current.getBoundingClientRect().width,
      };

      setIsDragging(true);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [containerRef, leftRef, onMove, onUp],
  );

  // 清理异常情况下的监听
  useEffect(
    () => () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    },
    [onMove, onUp],
  );

  return { leftWidth, isDragging, startDrag };
};

const SplitLayout: React.FC = () => {
  const [isFullLeft, setIsFullLeft] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  const { leftWidth, isDragging, startDrag } = useResizable(
    containerRef,
    leftRef,
    MIN_LEFT,
    MIN_RIGHT,
    GAP,
  );

  const gridTemplateColumns = isFullLeft
    ? '1fr 0 0'
    : leftWidth !== null
    ? `${leftWidth}px ${GAP}px 1fr`
    : `1fr ${GAP}px 1fr`;

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        gridTemplateColumns,
        transition: isDragging ? 'none' : 'grid-template-columns 0.3s ease',
      }}
    >
      <div ref={leftRef} className={classNames(styles.column, styles.left)}>
        <div className={styles.content}>
          <h2>Left Column</h2>
          <p>This is the left column content.</p>
          <p>Width: {leftWidth ? `${Math.round(leftWidth)}px` : 'Auto'}</p>
        </div>
        <Button
          type="primary"
          shape="circle"
          icon={isFullLeft ? <LeftOutlined /> : <RightOutlined />}
          className={styles.toggleBtn}
          onClick={() => setIsFullLeft((v) => !v)}
        />
      </div>

      <div
        className={classNames(styles.resizer, isDragging && styles.active)}
        onMouseDown={!isFullLeft ? startDrag : undefined}
        role="separator"
        aria-label="Splitter"
        style={{ pointerEvents: isFullLeft ? 'none' : 'auto' }}
      />

      <div className={classNames(styles.column, styles.right)}>
        <div className={styles.content}>
          <h2>Right Column</h2>
          <p>This is the right column content.</p>
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;

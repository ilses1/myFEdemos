import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.less';

const MIN_WIDTH = 400;
const GAP_WIDTH = 16;

// Custom Hook for Resizable Logic
const useResizable = (
  containerRef: React.RefObject<HTMLDivElement>,
  minWidth: number,
  gapWidth: number,
) => {
  const [leftWidth, setLeftWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragInfoRef = useRef({
    startX: 0,
    startWidth: 0,
    containerWidth: 0,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { startX, startWidth, containerWidth } = dragInfoRef.current;
      const deltaX = e.clientX - startX;
      let newWidth = startWidth + deltaX;

      // Calculate max width for left column (keeping min width for right column)
      const maxLeftWidth = containerWidth - minWidth - gapWidth;

      // Constraints
      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxLeftWidth) newWidth = maxLeftWidth;

      setLeftWidth(newWidth);
    },
    [minWidth, gapWidth],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [handleMouseMove]);

  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!containerRef.current) return;

      const leftCol = containerRef.current.querySelector(
        `.${styles.left}`,
      ) as HTMLElement;
      if (!leftCol) return;

      const startWidth = leftCol.getBoundingClientRect().width;
      const containerWidth = containerRef.current.getBoundingClientRect().width;

      dragInfoRef.current = {
        startX: e.clientX,
        startWidth,
        containerWidth,
      };

      setIsDragging(true);

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [containerRef, handleMouseMove, handleMouseUp],
  );

  // Cleanup
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    leftWidth,
    isDragging,
    startDrag,
  };
};

const SplitLayout: React.FC = () => {
  const [isFullLeft, setIsFullLeft] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { leftWidth, isDragging, startDrag } = useResizable(
    containerRef,
    MIN_WIDTH,
    GAP_WIDTH,
  );

  const getGridTemplateColumns = () => {
    if (isFullLeft) {
      // Left column takes all space, others 0
      return '1fr 0px 0px';
    }

    if (leftWidth !== null) {
      // Left specific width, gap, Right takes remaining
      return `${leftWidth}px ${GAP_WIDTH}px 1fr`;
    }

    // Initial state: Equal split with gap
    return `1fr ${GAP_WIDTH}px 1fr`;
  };

  const toggleFullLeft = () => setIsFullLeft((prev) => !prev);

  return (
    <div
      className={classNames(
        styles.container,
        !isDragging && styles.withTransition,
      )}
      ref={containerRef}
      style={{ gridTemplateColumns: getGridTemplateColumns() }}
    >
      <div className={classNames(styles.column, styles.left)}>
        <div className={styles.content}>
          <h2>Left Column</h2>
          <p>This is the left column content.</p>
          <p>Width: {leftWidth ? `${Math.round(leftWidth)}px` : 'Auto'}</p>
        </div>

        <Button
          type="primary"
          shape="circle"
          icon={isFullLeft ? <RightOutlined /> : <LeftOutlined />}
          className={styles.toggleBtn}
          onClick={toggleFullLeft}
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

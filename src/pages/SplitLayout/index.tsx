import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.less';

const MIN_LEFT_WIDTH = 400;
const MIN_RIGHT_WIDTH = 400;
const GAP_WIDTH = 16;

/**
 * 自定义 Hook：处理拖拽调整宽度及窗口缩放自适应逻辑
 * @param containerRef 容器引用
 * @param minLeftWidth 左侧最小宽度
 * @param minRightWidth 右侧最小宽度
 * @param gapWidth 间隔宽度
 */
const useResizable = (
  containerRef: React.RefObject<HTMLDivElement>,
  minLeftWidth: number,
  minRightWidth: number,
  gapWidth: number,
) => {
  const [leftWidth, setLeftWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 记录拖拽起始信息
  const dragInfoRef = useRef({
    startX: 0,
    startWidth: 0,
    containerWidth: 0,
  });

  // 记录上一次容器宽度，用于计算缩放比例
  const lastContainerWidthRef = useRef<number>(0);

  // 监听容器大小变化，实现自适应缩放
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    lastContainerWidthRef.current = container.getBoundingClientRect().width;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newContainerWidth = entry.contentRect.width;
        const oldContainerWidth = lastContainerWidthRef.current;

        // 仅当宽度发生实际变化且不是初始化时执行
        if (oldContainerWidth > 0 && newContainerWidth !== oldContainerWidth) {
          setLeftWidth((prevLeftWidth) => {
            if (prevLeftWidth === null) return null;

            const availableOld = oldContainerWidth - gapWidth;
            const availableNew = newContainerWidth - gapWidth;

            // 避免除以0或负数
            if (availableOld <= 0 || availableNew <= 0) return prevLeftWidth;

            // 按比例计算新的左侧宽度
            let newLeft = (prevLeftWidth / availableOld) * availableNew;

            // 计算左侧最大宽度（总宽度 - 间隔 - 右侧最小宽度）
            const maxLeft = newContainerWidth - gapWidth - minRightWidth;

            // 限制范围
            if (newLeft < minLeftWidth) newLeft = minLeftWidth;
            if (newLeft > maxLeft) newLeft = maxLeft;

            // 再次确保不小于最小宽度（优先级高于最大宽度限制）
            if (newLeft < minLeftWidth) newLeft = minLeftWidth;

            return newLeft;
          });
        }
        lastContainerWidthRef.current = newContainerWidth;
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [containerRef, gapWidth, minLeftWidth, minRightWidth]);

  // 处理鼠标移动事件
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { startX, startWidth, containerWidth } = dragInfoRef.current;
      const deltaX = e.clientX - startX;
      let newWidth = startWidth + deltaX;

      // 计算左侧最大允许宽度
      const maxLeftWidth = containerWidth - minRightWidth - gapWidth;

      // 限制拖拽范围
      if (newWidth < minLeftWidth) newWidth = minLeftWidth;
      if (newWidth > maxLeftWidth) newWidth = maxLeftWidth;

      setLeftWidth(newWidth);
    },
    [minLeftWidth, minRightWidth, gapWidth],
  );

  // 处理鼠标松开事件
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [handleMouseMove]);

  // 开始拖拽
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

  // 清理副作用
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
    MIN_LEFT_WIDTH,
    MIN_RIGHT_WIDTH,
    GAP_WIDTH,
  );

  // 计算 Grid 布局模版
  const getGridTemplateColumns = () => {
    if (isFullLeft) {
      // 左侧全屏模式
      return '1fr 0px 0px';
    }
    if (leftWidth !== null) {
      // 自定义宽度模式
      return `${leftWidth}px ${GAP_WIDTH}px 1fr`;
    }
    // 默认等分模式
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

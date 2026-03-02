import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CatalogSection from './components/CatalogSection';
import { renderLeafContent } from './components/registry';
import styles from './index.less';

type MenuNode = {
  key: string;
  title: string;
  children?: MenuNode[];
};

const menuStructure: MenuNode[] = [
  { key: 'overview', title: '资产总览' },
  {
    key: 'yield',
    title: '收益率',
    children: [
      {
        key: 'yield-source',
        title: '收益来源',
        children: [
          { key: 'yield-dividend', title: '分红' },
          { key: 'yield-fundamental', title: '经营基本面' },
          { key: 'yield-valuation', title: '估值' },
        ],
      },
      { key: 'return-decomposition', title: '历史收益分解' },
    ],
  },
  {
    key: 'volatility',
    title: '波动率',
    children: [
      { key: 'vol-hist', title: '历史波动率分析' },
      { key: 'vol-risk-return', title: '风险收益特征' },
    ],
  },
  {
    key: 'correlation',
    title: '相关性',
    children: [
      { key: 'corr-cross', title: '跨资产相关性' },
      { key: 'corr-inner', title: '内部相关性' },
    ],
  },
  {
    key: 'compare',
    title: '跨资产比较',
    children: [
      { key: 'compare-bond', title: 'REITs与债券' },
      { key: 'compare-stock', title: 'REITs与股票' },
    ],
  },
];

const CatalogScrollPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const rafLockRef = useRef<number | null>(null);

  const { sections, keyToAncestorKeys, defaultOpenKeys } = useMemo(() => {
    const ancestorMap = new Map<string, string[]>();
    const openKeySet = new Set<string>();
    const flatSections: Array<{ key: string; title: string; level: number }> =
      [];

    const walk = (nodes: MenuNode[], ancestors: string[] = [], level = 0) => {
      nodes.forEach((node) => {
        ancestorMap.set(node.key, ancestors);
        flatSections.push({ key: node.key, title: node.title, level });

        if (node.children && node.children.length > 0) {
          openKeySet.add(node.key);
          walk(node.children, [...ancestors, node.key], level + 1);
        }
      });
    };

    walk(menuStructure);
    return {
      sections: flatSections,
      keyToAncestorKeys: ancestorMap,
      defaultOpenKeys: Array.from(openKeySet),
    };
  }, []);

  const [selectedKey, setSelectedKey] = useState<string>(
    sections[0]?.key ?? '',
  );
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);
  const [isCatalogCollapsed, setIsCatalogCollapsed] = useState(false);

  const scrollToSection = useCallback((key: string) => {
    const container = contentRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLElement>(`#${key}`);
    if (!el) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offset = 12;
    const targetTop =
      container.scrollTop + (elRect.top - containerRect.top) - offset;
    container.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  }, []);

  const handleCatalogNodeClick = useCallback(
    (nextKey: string) => {
      setSelectedKey(nextKey);
      const ancestors = keyToAncestorKeys.get(nextKey) ?? [];
      if (ancestors.length > 0) {
        setOpenKeys((prev) => Array.from(new Set([...prev, ...ancestors])));
      }
      scrollToSection(nextKey);
    },
    [keyToAncestorKeys, scrollToSection],
  );

  const menuItems: MenuProps['items'] = useMemo(() => {
    const toMenuItems = (nodes: MenuNode[]): MenuProps['items'] => {
      return nodes.map((node) => {
        if (node.children && node.children.length > 0) {
          const submenuKey = node.key;
          return {
            key: submenuKey,
            label: node.title,
            onTitleClick: ({ key, domEvent }) => {
              domEvent.preventDefault();
              domEvent.stopPropagation();
              handleCatalogNodeClick(String(key));
            },
            expandIcon: ({ isOpen }) => {
              return (
                <span
                  className={styles.submenuExpandIcon}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenKeys((prev) => {
                      const next = new Set(prev);
                      if (next.has(submenuKey)) next.delete(submenuKey);
                      else next.add(submenuKey);
                      return Array.from(next);
                    });
                  }}
                  aria-label={isOpen ? '收起子目录' : '展开子目录'}
                >
                  {isOpen ? <UpOutlined /> : <DownOutlined />}
                </span>
              );
            },
            children: toMenuItems(node.children),
          } as any;
        }

        return { key: node.key, label: node.title } as any;
      });
    };

    return toMenuItems(menuStructure);
  }, [handleCatalogNodeClick]);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    handleCatalogNodeClick(String(key));
  };

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (rafLockRef.current != null) return;
      rafLockRef.current = window.requestAnimationFrame(() => {
        rafLockRef.current = null;
        const scrollTop = container.scrollTop;
        const containerRect = container.getBoundingClientRect();
        const stickyOffset = 12;
        let nextActive = sections[0]?.key ?? '';

        for (let i = 0; i < sections.length; i += 1) {
          const id = sections[i].key;
          const el = container.querySelector<HTMLElement>(`#${id}`);
          if (!el) continue;
          const elRect = el.getBoundingClientRect();
          const elTop = elRect.top - containerRect.top + scrollTop;
          if (elTop - stickyOffset <= scrollTop) nextActive = id;
          else break;
        }

        if (nextActive && nextActive !== selectedKey) {
          setSelectedKey(nextActive);
          const ancestors = keyToAncestorKeys.get(nextActive) ?? [];
          if (ancestors.length > 0) {
            setOpenKeys((prev) => Array.from(new Set([...prev, ...ancestors])));
          }
        }
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafLockRef.current != null) {
        window.cancelAnimationFrame(rafLockRef.current);
        rafLockRef.current = null;
      }
    };
  }, [keyToAncestorKeys, sections, selectedKey]);

  const renderNodes = (nodes: MenuNode[], level = 0): React.ReactNode => {
    return nodes.map((node) => {
      const hasChildren = Boolean(node.children && node.children.length > 0);
      return (
        <CatalogSection
          key={node.key}
          id={node.key}
          title={node.title}
          level={level}
        >
          {hasChildren
            ? renderNodes(node.children ?? [], level + 1)
            : renderLeafContent({ key: node.key, title: node.title })}
        </CatalogSection>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div
        className={[
          styles.catalog,
          isCatalogCollapsed ? styles.catalogCollapsed : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={styles.menuWrapper}>
          <Menu
            className={styles.menu}
            mode="inline"
            inlineIndent={16}
            items={menuItems}
            openKeys={openKeys}
            onOpenChange={() => {}}
            selectedKeys={selectedKey ? [selectedKey] : []}
            onClick={handleMenuClick}
          />
        </div>
      </div>

      <div className={styles.collapseHandle}>
        <button
          type="button"
          className={styles.collapseButton}
          aria-label={isCatalogCollapsed ? '展开目录' : '收起目录'}
          onClick={() => setIsCatalogCollapsed((prev) => !prev)}
        >
          <span className={styles.collapseIcon} aria-hidden="true">
            {isCatalogCollapsed ? <RightOutlined /> : <LeftOutlined />}
          </span>
          <span className={styles.collapseLabel}>
            {isCatalogCollapsed ? '展开目录' : '收起目录'}
          </span>
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <div className={styles.brand}>REITS</div>
            <div className={styles.name}>中证REITs全收益</div>
            <div className={styles.stats}>
              <span className={styles.code}>932006</span>
              <span className={styles.price}>1,031.50</span>
              <span className={styles.change}>-0.17%</span>
            </div>
          </div>
          <button type="button" className={styles.rangeButton}>
            <span className={styles.rangeText}>概览F5</span>
          </button>
        </div>
        <div ref={contentRef} className={styles.contentBody}>
          {renderNodes(menuStructure)}
        </div>
      </div>
    </div>
  );
};

export default CatalogScrollPage;

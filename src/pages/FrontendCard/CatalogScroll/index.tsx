import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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

const paragraphs = [
  '这是一段用于制造滚动高度的示例文本，用来演示“目录滚动”的交互效果。',
  '左侧目录点击后，右侧内容区域会滚动到对应章节；滚动内容区域时，目录高亮也会同步变化。',
  '如果你希望目录跟随窗口滚动而不是容器滚动，可以把右侧内容改成页面整体滚动并调整 getContainer。',
];

const RangeSelectIcon: React.FC = () => {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.5 2.5H2.5V3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12.5 2.5H13.5V3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M3.5 13.5H2.5V12.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12.5 13.5H13.5V12.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <rect
        x="4.3"
        y="4.3"
        width="7.4"
        height="7.4"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.7"
      />
    </svg>
  );
};

const CatalogScrollPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const rafLockRef = useRef<number | null>(null);

  const { menuItems, sectionItems, keyToAncestorKeys, defaultOpenKeys } =
    useMemo(() => {
      const ancestorMap = new Map<string, string[]>();
      const leafSections: Array<{ key: string; title: string }> = [];
      const openKeySet = new Set<string>();

      const toMenuItems = (nodes: MenuNode[], ancestors: string[] = []) => {
        return nodes.map((node): NonNullable<MenuProps['items']>[number] => {
          if (node.children && node.children.length > 0) {
            openKeySet.add(node.key);
            return {
              key: node.key,
              label: node.title,
              children: toMenuItems(node.children, [...ancestors, node.key]),
            };
          }

          leafSections.push({ key: node.key, title: node.title });
          ancestorMap.set(node.key, ancestors);
          return { key: node.key, label: node.title };
        });
      };

      const items: MenuProps['items'] = toMenuItems(menuStructure);
      return {
        menuItems: items,
        sectionItems: leafSections,
        keyToAncestorKeys: ancestorMap,
        defaultOpenKeys: Array.from(openKeySet),
      };
    }, []);

  const [selectedKey, setSelectedKey] = useState<string>(
    sectionItems[0]?.key ?? '',
  );
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);
  const [isCatalogCollapsed, setIsCatalogCollapsed] = useState(false);

  const scrollToSection = (key: string) => {
    const container = contentRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLElement>(`#${key}`);
    if (!el) return;
    container.scrollTo({
      top: Math.max(0, el.offsetTop - 8),
      behavior: 'smooth',
    });
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const nextKey = String(key);
    setSelectedKey(nextKey);
    const ancestors = keyToAncestorKeys.get(nextKey) ?? [];
    if (ancestors.length > 0) {
      setOpenKeys((prev) => Array.from(new Set([...prev, ...ancestors])));
    }
    scrollToSection(nextKey);
  };

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (rafLockRef.current != null) return;
      rafLockRef.current = window.requestAnimationFrame(() => {
        rafLockRef.current = null;
        const scrollTop = container.scrollTop;
        let nextActive = sectionItems[0]?.key ?? '';

        for (let i = 0; i < sectionItems.length; i += 1) {
          const id = sectionItems[i].key;
          const el = container.querySelector<HTMLElement>(`#${id}`);
          if (!el) continue;
          if (el.offsetTop - 12 <= scrollTop) nextActive = id;
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
  }, [keyToAncestorKeys, openKeys, sectionItems, selectedKey]);

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
            onOpenChange={(keys) => setOpenKeys(keys as string[])}
            selectedKeys={selectedKey ? [selectedKey] : []}
            onClick={handleMenuClick}
          />
        </div>
      </div>

      <div className={styles.collapseHandle}>
        <Button
          className={styles.collapseButton}
          type="text"
          size="small"
          icon={isCatalogCollapsed ? <RightOutlined /> : <LeftOutlined />}
          aria-label={isCatalogCollapsed ? '展开目录' : '收起目录'}
          onClick={() => setIsCatalogCollapsed((prev) => !prev)}
        />
      </div>

      <div ref={contentRef} className={styles.content}>
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
        {sectionItems.map((s) => (
          <section key={s.key} id={s.key} className={styles.section}>
            <div className={styles.sectionTitle}>{s.title}</div>
            <div className={styles.sectionBody}>
              {Array.from({ length: 10 }).map((_, idx) => (
                <p key={idx} className={styles.paragraph}>
                  {paragraphs[idx % paragraphs.length]}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CatalogScrollPage;

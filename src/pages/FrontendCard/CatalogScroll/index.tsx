import { Anchor, Card } from 'antd';
import React, { useMemo, useRef } from 'react';
import styles from './index.less';

const sections = [
  { key: 'intro', title: '简介' },
  { key: 'usage', title: '用法' },
  { key: 'api', title: 'API 约定' },
  { key: 'cases', title: '常见场景' },
  { key: 'notes', title: '注意事项' },
  { key: 'faq', title: 'FAQ' },
];

const paragraphs = [
  '这是一段用于制造滚动高度的示例文本，用来演示“目录滚动”的交互效果。',
  '左侧目录点击后，右侧内容区域会滚动到对应章节；滚动内容区域时，目录高亮也会同步变化。',
  '如果你希望目录跟随窗口滚动而不是容器滚动，可以把右侧内容改成页面整体滚动并调整 getContainer。',
];

const CatalogScrollPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    return sections.map((s) => ({
      key: s.key,
      href: `#${s.key}`,
      title: s.title,
    }));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.catalog}>
        <Card size="small" title="目录">
          <Anchor
            affix={false}
            items={items}
            getContainer={() => contentRef.current || window}
          />
        </Card>
      </div>

      <div ref={contentRef} className={styles.content}>
        {sections.map((s) => (
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

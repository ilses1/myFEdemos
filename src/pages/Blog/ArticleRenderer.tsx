import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import { Breadcrumb, Divider, Spin, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './ArticleRenderer.less';

const { Title, Paragraph, Text } = Typography;

type ArticleMeta = {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  mdFile: string;
};

type ArticleRendererProps = {
  meta: ArticleMeta;
};

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ meta }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(meta.mdFile)
      .then((res) => res.text())
      .then((text) => {
        if (!cancelled) {
          setContent(text);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [meta.mdFile]);

  return (
    <div className={styles.articleWrapper}>
      <Breadcrumb
        className={styles.breadcrumb}
        items={[
          { title: <a onClick={() => history.push('/blog')}>博客</a> },
          { title: meta.title },
        ]}
      />

      <div className={styles.articleCard}>
        <div className={styles.articleHeader}>
          <Title level={2} className={styles.articleTitle}>
            {meta.title}
          </Title>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <ClockCircleOutlined />
              <Text type="secondary">
                {meta.date} · {meta.readTime}
              </Text>
            </div>
          </div>

          <div className={styles.tagsRow}>
            <TagOutlined />
            {meta.tags.map((tag) => (
              <Tag key={tag} color="geekblue">
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        <Divider />

        {loading ? (
          <div className={styles.loadingArea}>
            <Spin size="large" tip="加载文章中..." />
          </div>
        ) : (
          <div className={styles.markdownBody}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}

        <Divider />

        <div className={styles.articleFooter}>
          <a className={styles.backLink} onClick={() => history.push('/blog')}>
            <ArrowLeftOutlined /> 返回博客列表
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleRenderer;

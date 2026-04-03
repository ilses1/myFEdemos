import {
  ArrowRightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Card, Col, Row, Tag, Typography } from 'antd';
import React from 'react';
import styles from './index.less';

const { Title, Paragraph } = Typography;

type BlogArticle = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  gradient: string;
};

const articles: BlogArticle[] = [
  {
    id: 'scrollbar-button-fix',
    title: '滚动条上下按钮隐藏不生效的原因与修复',
    excerpt:
      '排查 ::-webkit-scrollbar-button 隐藏不生效的根因：scrollbar-width / scrollbar-color 标准属性与 WebKit 私有伪元素的冲突，以及如何使用 !important 和 -webkit-appearance 彻底修复。',
    date: '2026-04-03',
    readTime: '5 min read',
    tags: ['CSS', 'WebKit', '滚动条'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'css-gradient-transition',
    title: '渐变背景为什么无法直接 transition？以及如何用颜色变量解决',
    excerpt:
      '深入理解 CSS 渐变背景的本质（图片而非颜色），探索伪元素叠加、@property 注册可动画颜色变量等方案，实现平滑的渐变 hover 过渡效果。',
    date: '2026-04-03',
    readTime: '10 min read',
    tags: ['CSS', 'Animation', '@property'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'echarts-legend-align',
    title: 'ECharts Legend 图标与文字垂直居中对齐：rich + padding 实战',
    excerpt:
      '解决 ECharts 图例图标与文字基线不对齐的经典问题。通过 rich formatter + textStyle.padding 微调，实现像素级视觉居中。',
    date: '2026-04-03',
    readTime: '4 min read',
    tags: ['ECharts', '可视化', 'CSS'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
];

const BlogList: React.FC = () => {
  return (
    <PageContainer>
      <div className={styles.blogListContainer}>
        <div className={styles.headerSection}>
          <Title level={2} className={styles.mainTitle}>
            技术博客
          </Title>
          <Paragraph className={styles.subtitle}>
            前端开发中的实战经验与踩坑记录
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {articles.map((article, index) => (
            <Col xs={24} md={12} lg={8} key={article.id}>
              <Card
                hoverable
                className={styles.articleCard}
                onClick={() => history.push(`/blog/${article.id}`)}
                styles={{ body: { padding: 0 } }}
              >
                <div
                  className={styles.cardCover}
                  style={{
                    background: article.gradient,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className={styles.cardCoverOverlay}>
                    {article.tags.map((tag) => (
                      <Tag key={tag} color="white" className={styles.tag}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <Title level={5} className={styles.cardTitle}>
                    {article.title}
                  </Title>
                  <Paragraph
                    ellipsis={{ rows: 2 }}
                    className={styles.cardExcerpt}
                  >
                    {article.excerpt}
                  </Paragraph>

                  <div className={styles.cardFooter}>
                    <div className={styles.metaInfo}>
                      <CalendarOutlined />
                      <span>{article.date}</span>
                      <ClockCircleOutlined />
                      <span>{article.readTime}</span>
                    </div>
                    <ArrowRightOutlined className={styles.readMoreIcon} />
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageContainer>
  );
};

export default BlogList;

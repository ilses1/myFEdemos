import { PageContainer } from '@ant-design/pro-components';
import { Affix, Anchor, Avatar, Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { openExternalUrl } from '@/utils/openExternalUrl';
import { toolsData } from './data';

const { Title } = Typography;

const DevTools: React.FC = () => {
  const handleCardClick = async (url: string) => {
    await openExternalUrl(url);
  };

  const getId = (title: string) =>
    `devtools-${title}
      `
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5-_]/g, '')
      .toLowerCase();

  return (
    <PageContainer>
      <Row gutter={24}>
        <Col xs={24} lg={18} xl={19} xxl={20}>
          {toolsData.map((category) => (
            <div
              key={category.title}
              id={getId(category.title)}
              style={{ marginBottom: 24 }}
            >
              <Title level={4} style={{ marginBottom: 16 }}>
                {category.title}
              </Title>
              <Row gutter={[16, 16]}>
                {category.items.map((item) => (
                  <Col
                    key={item.name}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    xl={6}
                    xxl={6}
                  >
                    <Card
                      hoverable
                      onClick={() => handleCardClick(item.url)}
                      style={{ height: '100%' }}
                    >
                      <Card.Meta
                        avatar={
                          <Avatar src={item.icon} shape="square" size="large" />
                        }
                        title={item.name}
                        description={
                          <div
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              minHeight: 44,
                            }}
                          >
                            {item.desc}
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Col>
        <Col xs={0} lg={6} xl={5} xxl={4}>
          <Affix offsetTop={80}>
            <Anchor>
              {toolsData.map((category) => (
                <Anchor.Link
                  key={category.title}
                  href={`#${getId(category.title)}`}
                  title={category.title}
                />
              ))}
            </Anchor>
          </Affix>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default DevTools;

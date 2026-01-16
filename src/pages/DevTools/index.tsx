import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Typography, Avatar } from 'antd';
import React from 'react';
import { toolsData } from './data';

const { Title } = Typography;

const DevTools: React.FC = () => {
  const handleCardClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <PageContainer>
      {toolsData.map((category) => (
        <div key={category.title} style={{ marginBottom: 24 }}>
          <Title level={4} style={{ marginBottom: 16 }}>{category.title}</Title>
          <Row gutter={[16, 16]}>
            {category.items.map((item) => (
              <Col key={item.name} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  hoverable
                  onClick={() => handleCardClick(item.url)}
                  style={{ height: '100%' }}
                >
                  <Card.Meta
                    avatar={<Avatar src={item.icon} shape="square" size="large" />}
                    title={item.name}
                    description={
                      <div style={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical',
                        minHeight: 44 
                      }}>
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
    </PageContainer>
  );
};

export default DevTools;

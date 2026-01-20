import { CodeOutlined, CopyOutlined, EyeOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Drawer, message, Modal, Row, Tooltip } from 'antd';
import React, { Suspense, useState } from 'react';
import { AnimationItem, animations } from './data';
import styles from './index.less';

const CodeViewer = React.lazy(() => import('./CodeViewer'));

const AnimationCollection: React.FC = () => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [codeDrawerVisible, setCodeDrawerVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<AnimationItem | null>(null);

  const handleViewDetail = (item: AnimationItem) => {
    setCurrentItem(item);
    setDetailModalVisible(true);
  };

  const handleViewCode = (item: AnimationItem) => {
    setCurrentItem(item);
    setCodeDrawerVisible(true);
  };

  const handleCopy = (text: string) => {
    // 优先使用 navigator.clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          message.success('复制成功！');
        })
        .catch((err) => {
          console.error('Clipboard API failed:', err);
          fallbackCopy(text);
        });
    } else {
      fallbackCopy(text);
    }
  };

  // 兼容性回退方案：使用 textarea + execCommand
  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // 避免页面滚动
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        message.success('复制成功！');
      } else {
        message.error('复制失败，请手动复制');
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      message.error('复制失败，请手动复制');
    }

    document.body.removeChild(textArea);
  };

  const renderAnimation = (item: AnimationItem) => {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: item.css }} />
        <div dangerouslySetInnerHTML={{ __html: item.html }} />
      </>
    );
  };

  return (
    <PageContainer title="动画集锦" ghost>
      <div className={styles.container}>
        <Row gutter={[24, 24]}>
          {animations.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <div className={styles.card}>
                <div className={styles.previewArea}>
                  {renderAnimation(item)}
                </div>
                <Card
                  bordered={false}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                  bodyStyle={{
                    padding: '16px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div className={styles.cardContent}>
                    <div className={styles.cardTitle}>{item.title}</div>
                    <div className={styles.cardDesc}>{item.description}</div>
                    <div className={styles.actions}>
                      <Tooltip title="查看代码">
                        <Button
                          icon={<CodeOutlined />}
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCode(item);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="放大预览">
                        <Button
                          type="primary"
                          ghost
                          icon={<EyeOutlined />}
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(item);
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        {/* Detail Modal */}
        <Modal
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={null}
          title={currentItem?.title}
          width={600}
          centered
        >
          {currentItem && (
            <div className={styles.detailPreview}>
              {renderAnimation(currentItem)}
            </div>
          )}
        </Modal>

        {/* Code Drawer */}
        <Drawer
          open={codeDrawerVisible}
          onClose={() => setCodeDrawerVisible(false)}
          title={`代码: ${currentItem?.title}`}
          width={600}
        >
          {currentItem && (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              <div className={styles.codeBlock}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <h4>HTML</h4>
                  <Tooltip title="复制代码">
                    <Button
                      type="text"
                      icon={<CopyOutlined />}
                      size="small"
                      onClick={() => handleCopy(currentItem.html)}
                    />
                  </Tooltip>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                  <CodeViewer code={currentItem.html} language="html" />
                </Suspense>
              </div>
              <div className={styles.codeBlock}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <h4>CSS</h4>
                  <Tooltip title="复制代码">
                    <Button
                      type="text"
                      icon={<CopyOutlined />}
                      size="small"
                      onClick={() => handleCopy(currentItem.css)}
                    />
                  </Tooltip>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                  <CodeViewer code={currentItem.css} language="css" />
                </Suspense>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </PageContainer>
  );
};

export default AnimationCollection;

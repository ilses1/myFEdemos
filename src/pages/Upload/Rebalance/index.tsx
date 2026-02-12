import { Button, Card, Modal, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';
import ExcelUpload from '../Excel';

type RowItem = {
  key: string;
  brokerName: string;
};

const dataSource: RowItem[] = Array.from({ length: 7 }, (_, i) => ({
  key: `broker_${i}`,
  brokerName: '某某机构',
}));

const RebalanceImport: React.FC = () => {
  const [excelModalOpen, setExcelModalOpen] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Typography.Text type="secondary">调仓时间</Typography.Text>
          <Typography.Text>2017-10-01 12:00</Typography.Text>
          <Button type="primary" onClick={() => setExcelModalOpen(true)}>
            导入调仓
          </Button>
        </div>

        <Card>
          <Table<RowItem>
            rowKey="key"
            dataSource={dataSource}
            pagination={false}
            columns={[
              { title: '券商名称', dataIndex: 'brokerName', key: 'brokerName' },
              {
                title: '相关说明导入',
                key: 'action',
                width: 160,
                align: 'right',
                render: () => (
                  <Button
                    type="primary"
                    onClick={() => setExcelModalOpen(true)}
                  >
                    导入
                  </Button>
                ),
              },
            ]}
          />
        </Card>

        <Modal
          open={excelModalOpen}
          title="导入调仓"
          onCancel={() => setExcelModalOpen(false)}
          footer={null}
          width={1100}
          destroyOnClose
          styles={{ body: { padding: 0 } }}
        >
          <ExcelUpload />
        </Modal>
      </Space>
    </div>
  );
};

export default RebalanceImport;

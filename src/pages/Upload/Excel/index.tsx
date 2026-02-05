import { mockUploadExcel } from '@/services/uploadExcel';
import type { UploadProps } from 'antd';
import { Button, Upload, message } from 'antd';
import React, { useState } from 'react';

const ExcelUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isExcel = /\.(xlsx|xls)$/i.test(file.name);
    if (!isExcel) {
      message.error('请上传 .xls 或 .xlsx 文件');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onError, onSuccess } = options;
    if (!(file instanceof File)) {
      onError?.(new Error('文件类型不正确'));
      return;
    }

    setUploading(true);

    try {
      const data = await mockUploadExcel(file);
      message.success('上传成功（模拟接口）');
      onSuccess?.(data, file);
    } catch (e) {
      const err = e instanceof Error ? e : new Error('上传失败');
      message.error(err.message);
      onError?.(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Upload
      accept=".xls,.xlsx"
      maxCount={1}
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      disabled={uploading}
      showUploadList={false}
    >
      <Button type="primary" loading={uploading}>
        点击上传 Excel
      </Button>
    </Upload>
  );
};

export default ExcelUpload;

import React from 'react';
import DocumentUploadPreview from '../components/DocumentUploadPreview';

const PptUpload: React.FC = () => {
  return (
    <DocumentUploadPreview
      title="PPT 上传预览"
      description="上传 PPT 文件后可在预览区尝试查看并查看模拟上传结果。"
      accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      allowedExtensions={['.ppt', '.pptx']}
      kind="ppt"
      maxSizeMB={50}
    />
  );
};

export default PptUpload;

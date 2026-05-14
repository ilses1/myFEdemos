import React from 'react';
import DocumentUploadPreview from '../components/DocumentUploadPreview';

const Ppt2Upload: React.FC = () => {
  return (
    <DocumentUploadPreview
      title="PPT 上传预览 (Canvas)"
      description="上传 PPT 文件后使用 ppxviewjs 进行 Canvas 渲染预览。"
      accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      allowedExtensions={['.ppt', '.pptx']}
      kind="ppt2"
      maxSizeMB={50}
    />
  );
};

export default Ppt2Upload;

import React from 'react';
import DocumentUploadPreview from '../components/DocumentUploadPreview';

const Ppt3Upload: React.FC = () => {
  return (
    <DocumentUploadPreview
      title="PPT 上传预览 (pptx-react-viewer)"
      description="上传 PPT 文件后使用 pptx-react-viewer 进行高质量渲染预览，支持工具栏、缩略图导航和演示模式。"
      accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      allowedExtensions={['.ppt', '.pptx']}
      kind="ppt3"
      maxSizeMB={50}
    />
  );
};

export default Ppt3Upload;

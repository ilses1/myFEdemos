import React from 'react';
import DocumentUploadPreview from '../components/DocumentUploadPreview';

const Pdf3Upload: React.FC = () => {
  return (
    <DocumentUploadPreview
      title="PDF 预览 3 (高级交互)"
      description="上传 PDF 文件后，左侧显示缩略图，支持点击跳转与高亮显示，同时支持全屏预览。"
      accept=".pdf,application/pdf"
      allowedExtensions={['.pdf']}
      kind="pdf3"
    />
  );
};

export default Pdf3Upload;

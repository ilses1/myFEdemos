import React from 'react';
import DocumentUploadPreview from '../components/DocumentUploadPreview';

const PdfUpload: React.FC = () => {
  return (
    <DocumentUploadPreview
      title="PDF 上传预览"
      description="上传 PDF 文件后可直接在页面内预览并查看模拟上传结果。"
      accept=".pdf,application/pdf"
      allowedExtensions={['.pdf']}
      kind="pdf"
    />
  );
};

export default PdfUpload;

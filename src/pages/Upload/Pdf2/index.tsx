import React from 'react';
import DocumentUploadPreview from '../components/DocumentUploadPreview';

const Pdf2Upload: React.FC = () => {
  return (
    <DocumentUploadPreview
      title="PDF 原生预览"
      description="上传 PDF 文件后使用浏览器原生插件进行预览，对比第三方渲染组件的效果。"
      accept=".pdf,application/pdf"
      allowedExtensions={['.pdf']}
      kind="pdf2"
    />
  );
};

export default Pdf2Upload;

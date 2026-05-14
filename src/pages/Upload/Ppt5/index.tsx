import React from 'react';
import DocumentUploadPreview from '../components/DocumentUploadPreview';

const Ppt5Upload: React.FC = () => {
  return (
    <DocumentUploadPreview
      title="PPT 上传预览 5 (pptx-to-pdf)"
      description="上传 PPT 文件后使用 pptx-to-pdf 进行格式转换，随后通过成熟的 PDF 查看器进行预览。该方案提供了最完整的功能集（如缩略图、搜索、下载）。"
      accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      allowedExtensions={['.ppt', '.pptx']}
      kind="ppt5"
      maxSizeMB={50}
    />
  );
};

export default Ppt5Upload;

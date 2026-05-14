import React from 'react';
import DocumentUploadPreview from '../components/DocumentUploadPreview';

const Ppt4Upload: React.FC = () => {
  return (
    <DocumentUploadPreview
      title="PPT 上传预览 4 (pptx-svg)"
      description="上传 PPT 文件后使用 pptx-svg (基于 WASM) 进行渲染预览。该方案将 PPT 转换为 SVG，支持矢量缩放，渲染质量高。"
      accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      allowedExtensions={['.ppt', '.pptx']}
      kind="ppt4"
      maxSizeMB={50}
    />
  );
};

export default Ppt4Upload;

import React from 'react';
import DocumentUploadPreview from '../components/DocumentUploadPreview';

const WordUpload: React.FC = () => {
  return (
    <DocumentUploadPreview
      title="Word 上传预览"
      description="上传 Word 文件后可在预览区尝试查看并查看模拟上传结果。"
      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      allowedExtensions={['.doc', '.docx']}
      kind="word"
      maxSizeMB={20}
    />
  );
};

export default WordUpload;

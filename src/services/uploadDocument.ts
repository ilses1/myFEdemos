export type DocumentKind = 'pdf' | 'word' | 'ppt';

export type UploadDocumentResult = {
  taskId: string;
  fileName: string;
  size: number;
  uploadedAt: string;
  kind: DocumentKind;
};

export function mockUploadDocument(
  file: File,
  kind: DocumentKind,
): Promise<UploadDocumentResult> {
  const delayMs = 800 + Math.floor(Math.random() * 1000);

  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const shouldFail = Math.random() < 0.12;
      if (shouldFail) {
        reject(new Error('模拟上传失败，请稍后重试'));
        return;
      }

      resolve({
        taskId: `${kind}_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        fileName: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        kind,
      });
    }, delayMs);
  });
}

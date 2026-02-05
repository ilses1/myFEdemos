export type UploadExcelResult = {
  taskId: string;
  fileName: string;
  size: number;
  rows: number;
  uploadedAt: string;
};

export function mockUploadExcel(file: File): Promise<UploadExcelResult> {
  const delayMs = 1200 + Math.floor(Math.random() * 1200);

  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const shouldFail = Math.random() < 0.15;
      if (shouldFail) {
        reject(new Error('模拟上传失败，请重试'));
        return;
      }

      resolve({
        taskId: `excel_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        fileName: file.name,
        size: file.size,
        rows: 200 + Math.floor(Math.random() * 5000),
        uploadedAt: new Date().toISOString(),
      });
    }, delayMs);
  });
}

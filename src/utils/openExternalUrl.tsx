import React from 'react';
import { Checkbox, Modal, Typography } from 'antd';

const EXTERNAL_LINK_DISCLAIMER_STORAGE_KEY = 'external_link_disclaimer_skip';

export type OpenExternalUrlOptions = {
  title?: string;
  message?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  enableDontAskAgain?: boolean;
};

export const openExternalUrl = async (url: string, options?: OpenExternalUrlOptions) => {
  if (!url) return;

  let resolvedUrl: URL | null = null;
  try {
    resolvedUrl = new URL(url, window.location.href);
  } catch {
    resolvedUrl = null;
  }

  const finalUrl = resolvedUrl?.toString() ?? url;
  const isExternal = resolvedUrl ? resolvedUrl.origin !== window.location.origin : true;

  const openInNewTab = () => {
    const nextWindow = window.open(finalUrl, '_blank', 'noopener,noreferrer');
    if (nextWindow) nextWindow.opener = null;
  };

  if (!isExternal) {
    openInNewTab();
    return;
  }

  const enableDontAskAgain = options?.enableDontAskAgain !== false;
  if (enableDontAskAgain && localStorage.getItem(EXTERNAL_LINK_DISCLAIMER_STORAGE_KEY) === '1') {
    openInNewTab();
    return;
  }

  let dontAskAgain = false;

  await new Promise<void>((resolve) => {
    Modal.confirm({
      title: options?.title ?? '即将跳转到第三方网站',
      okText: options?.okText ?? '继续访问',
      cancelText: options?.cancelText ?? '取消',
      content: (
        <div>
          <Typography.Paragraph style={{ marginBottom: enableDontAskAgain ? 12 : 0 }}>
            {options?.message ??
              '你将离开本站并访问第三方网站，第三方内容与服务由其自身负责，本站不对其内容、隐私与安全性承担责任。是否继续？'}
          </Typography.Paragraph>
          {enableDontAskAgain ? (
            <Checkbox onChange={(e) => (dontAskAgain = e.target.checked)}>不再提示</Checkbox>
          ) : null}
        </div>
      ),
      onOk: () => {
        if (enableDontAskAgain && dontAskAgain) {
          localStorage.setItem(EXTERNAL_LINK_DISCLAIMER_STORAGE_KEY, '1');
        }
        openInNewTab();
        resolve();
      },
      onCancel: () => resolve(),
    });
  });
};


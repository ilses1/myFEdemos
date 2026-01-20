import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import html from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('css', css);

interface CodeViewerProps {
  code: string;
  language: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, language }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{ margin: 0, borderRadius: '6px' }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeViewer;

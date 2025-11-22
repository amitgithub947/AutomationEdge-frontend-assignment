declare module 'react-syntax-highlighter' {
  import React from 'react';

  interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children: string;
    customStyle?: React.CSSProperties;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    codeTagProps?: any;
    [key: string]: any;
  }

  const SyntaxHighlighter: React.FC<SyntaxHighlighterProps>;
  export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
  export const atomOneDark: any;
}

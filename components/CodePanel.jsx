'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Zap } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const LANGUAGE_MAP = {
  python: 'python',
  javascript: 'javascript',
  cpp: 'cpp',
};

export default function CodePanel({ code, language, isLoading }) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(13);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 1, 20));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 1, 10));
  };

  const resetFontSize = () => {
    setFontSize(13);
  };

  if (!code && !isLoading) {
    return (
      <div className="flex flex-col h-full bg-gray-900 items-center justify-center text-center p-6">
        <Zap className="w-12 h-12 text-gray-600 mb-4" />
        <p className="text-gray-400 text-lg font-medium mb-2">Ready to generate</p>
        <p className="text-gray-500 text-sm">
          Write a prompt on the left and click Generate to see code
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 dark:bg-black">
      <div className="flex-shrink-0 border-b border-gray-800 px-6 py-4 flex items-center justify-between bg-gray-950">
        <div className="flex items-center gap-3">
          <span className="inline-block px-2 py-1 bg-gray-800 text-gray-300 text-xs font-mono rounded">
            {LANGUAGE_MAP[language]}
          </span>
          <span className="text-xs text-gray-500">
            {code.split('\n').length} lines
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
            <button
              onClick={decreaseFontSize}
              className="px-2 py-1 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors"
              aria-label="Decrease font size"
            >
              A−
            </button>
            <span className="px-2 text-xs text-gray-400 font-medium min-w-[30px] text-center">
              {fontSize}
            </span>
            <button
              onClick={increaseFontSize}
              className="px-2 py-1 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors"
              aria-label="Increase font size"
            >
              A+
            </button>
            <button
              onClick={resetFontSize}
              className="px-2 py-1 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors border-l border-gray-700"
              aria-label="Reset font size"
            >
              Reset
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors active:scale-95"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-gray-700 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Generating your code...</p>
            </div>
          </div>
        ) : (
          <SyntaxHighlighter
            language={LANGUAGE_MAP[language] || 'python'}
            style={atomOneDark}
            customStyle={{
              padding: '1.5rem',
              margin: 0,
              fontSize: `${fontSize}px`,
              lineHeight: '1.6',
              backgroundColor: '#111827',
            }}
            showLineNumbers
            wrapLines
            codeTagProps={{
              style: {
                fontSize: `${fontSize}px`,
                fontFamily: "'Fira Code', 'Monaco', monospace",
              },
            }}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}

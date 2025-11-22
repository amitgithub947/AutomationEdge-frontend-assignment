'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, History, Zap } from 'lucide-react';

interface PromptPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
  onHistoryClick: () => void;
}

export default function PromptPanel({
  prompt,
  setPrompt,
  language,
  setLanguage,
  isLoading,
  onGenerate,
  onHistoryClick,
}: PromptPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(prompt.length);
  }, [prompt]);

  useEffect(() => {
    if (isLoading && textareaRef.current) {
      textareaRef.current.blur();
    }
  }, [isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onGenerate();
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Prompt
        </h2>

        <div className="space-y-3">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              disabled={isLoading}
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 gap-4">
        <div className="flex-1 flex flex-col">
          <label htmlFor="prompt" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Describe what you want to code
          </label>
          <textarea
            id="prompt"
            ref={textareaRef}
            value={prompt}
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="e.g., Write a Python function to reverse a string..."
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {charCount} characters · Press Ctrl+Enter to generate
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onGenerate}
            disabled={isLoading || !prompt.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isLoading ? (
              <>
                <Zap className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Generate
              </>
            )}
          </button>

          <button
            onClick={onHistoryClick}
            disabled={isLoading}
            className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Show history"
          >
            <History className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
        <p className="font-medium mb-2">💡 Try these keywords:</p>
        <ul className="space-y-1 text-gray-500 dark:text-gray-500">
          <li>• reverse, factorial, sort</li>
          <li>• palindrome, fibonacci, search</li>
        </ul>
      </div>
    </div>
  );
}

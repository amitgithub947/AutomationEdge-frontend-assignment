'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import PromptPanel from '../components/PromptPanel';
import CodePanel from '../components/CodePanel';
import HistoryPanel from '../components/HistoryPanel';
import { saveToHistory, HistoryItem } from '../lib/storage';
import { useToast } from '../hooks/use-toast';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [isLoading, setIsLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a prompt',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate code');
      }

      const data = await response.json();
      setCode(data.code);

      saveToHistory({
        prompt: prompt.trim(),
        code: data.code,
        language: data.meta.language,
      });

      toast({
        title: 'Success',
        description: 'Code generated and saved to history',
      });
    } catch (error) {
      console.error('Error generating code:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate code',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setLanguage(item.language);
    setCode(item.code);
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col min-h-0">
          <PromptPanel
            prompt={prompt}
            setPrompt={setPrompt}
            language={language}
            setLanguage={setLanguage}
            isLoading={isLoading}
            onGenerate={handleGenerate}
            onHistoryClick={() => setHistoryOpen(true)}
          />
        </div>

        <div className="hidden lg:flex w-1/2 min-h-0">
          <CodePanel code={code} language={language} isLoading={isLoading} />
        </div>
      </div>

      <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 min-h-0 flex-shrink-0 max-h-[40vh]">
        <CodePanel code={code} language={language} isLoading={isLoading} />
      </div>

      <HistoryPanel
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectItem={handleSelectHistoryItem}
      />
    </div>
  );
}

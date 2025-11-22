'use client';

import { useState, useEffect } from 'react';
import { X, Trash2, Star, Search } from 'lucide-react';
import { getHistory, updateHistoryItem, deleteHistoryItem, HistoryItem } from '../lib/storage';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: HistoryItem) => void;
}

export default function HistoryPanel({ isOpen, onClose, onSelectItem }: HistoryPanelProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('all');

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  const loadHistory = () => {
    const data = getHistory();
    setHistory(data);
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = filterLanguage === 'all' || item.language === filterLanguage;
    return matchesSearch && matchesLanguage;
  });

  const handleToggleStar = (id: string) => {
    const item = history.find(h => h.id === id);
    if (item) {
      updateHistoryItem(id, { starred: !item.starred });
      setHistory(history.map(h => h.id === id ? { ...h, starred: !h.starred } : h));
    }
  };

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    setHistory(history.filter(h => h.id !== id));
  };

  const handleSelectItem = (item: HistoryItem) => {
    onSelectItem(item);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Prompt History</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close history"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Languages</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <div className="flex-1 overflow-auto">
          {filteredHistory.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <p>No history yet. Generate some code to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0" onClick={() => handleSelectItem(item)}>
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                        {item.prompt}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-block px-2 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded font-mono">
                          {item.language}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleToggleStar(item.id)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label={item.starred ? 'Unstar' : 'Star'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            item.starred
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 flex-shrink-0">
            {filteredHistory.length} of {history.length} items
          </div>
        )}
      </div>
    </div>
  );
}

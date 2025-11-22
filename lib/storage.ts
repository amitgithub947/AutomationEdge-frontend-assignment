const STORAGE_KEY = 'voltai_history';

export interface HistoryItem {
  id: string;
  prompt: string;
  code: string;
  language: string;
  timestamp: number;
  starred: boolean;
}

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

export function saveToHistory(item: Omit<HistoryItem, 'id' | 'timestamp' | 'starred'>): HistoryItem {
  if (typeof window === 'undefined') {
    return { ...item, id: '', timestamp: 0, starred: false };
  }

  try {
    const history = getHistory();
    const newItem: HistoryItem = {
      id: generateId(),
      ...item,
      timestamp: Date.now(),
      starred: false
    };
    history.unshift(newItem);

    const trimmedHistory = history.slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
    return newItem;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return { ...item, id: '', timestamp: 0, starred: false };
  }
}

export function updateHistoryItem(id: string, updates: Partial<HistoryItem>): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getHistory();
    const index = history.findIndex(item => item.id === id);

    if (index !== -1) {
      history[index] = { ...history[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Error updating localStorage:', error);
  }
}

export function deleteHistoryItem(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting from localStorage:', error);
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

export function searchHistory(query: string): HistoryItem[] {
  if (!query) return getHistory();

  const history = getHistory();
  const queryLower = query.toLowerCase();

  return history.filter(item =>
    item.prompt.toLowerCase().includes(queryLower) ||
    item.code.toLowerCase().includes(queryLower)
  );
}

export function filterByLanguage(language: string): HistoryItem[] {
  if (!language || language === 'all') return getHistory();

  const history = getHistory();
  return history.filter(item => item.language === language);
}

export function getStarredItems(): HistoryItem[] {
  const history = getHistory();
  return history.filter(item => item.starred);
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

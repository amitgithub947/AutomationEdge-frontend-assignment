import type { NextApiRequest, NextApiResponse } from 'next';
import { findSnippet } from '../../lib/mockSnippets';

interface ResponseData {
  code?: string;
  meta?: {
    language: string;
    mock: boolean;
    timestamp: string;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { prompt, language } = req.body;

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt is required and must be a non-empty string.' });
  }

  const validLanguages = ['python', 'javascript', 'cpp'];
  const selectedLanguage = validLanguages.includes(language) ? language : 'python';

  await simulateDelay();

  const code = findSnippet(prompt, selectedLanguage);

  return res.status(200).json({
    code,
    meta: {
      language: selectedLanguage,
      mock: true,
      timestamp: new Date().toISOString()
    }
  });
}

function simulateDelay(): Promise<void> {
  const delay = Math.floor(Math.random() * 400) + 500;
  return new Promise(resolve => setTimeout(resolve, delay));
}

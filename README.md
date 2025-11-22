# Mini Code Copilot

A lightweight web app that converts natural language prompts into code snippets. Built with Next.js, React, and Tailwind CSS with a deterministic mock API that returns code examples in Python, JavaScript, and C++.

## Features

### Core Features
- **Prompt Input**: Natural language text area for describing code you want to generate
- **Code Output**: Syntax-highlighted code display with line numbers
- **Language Selector**: Choose between Python, JavaScript, and C++
- **Mock API**: Deterministic `/api/generate` endpoint that returns code based on keywords
- **Responsive Design**: Side-by-side layout on desktop, stacked on mobile
- **Loading States**: Visual feedback while generating code

### Bonus Features
- **Prompt History**: Persisted to localStorage with full search and filter capabilities
- **Star/Favorite**: Mark important prompts for quick access
- **Copy to Clipboard**: One-click code copying with confirmation feedback
- **Adjustable Font Size**: Control code display size (10-20px)
- **Dark/Light Theme Toggle**: Switch between themes with persistence
- **Keyboard Shortcut**: Use Ctrl+Enter (Cmd+Enter on Mac) to generate
- **History Management**: Delete individual items or search across all saved prompts

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
git clone https://github.com/amitgithub947
cd /folder ai
npm install
```

### Development
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

## Project Structure

```
volt-ai/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   ├── globals.css         # Global styles
│   └── api/
│       └── generate.js     # Mock code generation API
├── components/
│   ├── Header.jsx          # App header with theme toggle
│   ├── PromptPanel.jsx     # Prompt input and controls
│   ├── CodePanel.jsx       # Code output with syntax highlighting
│   └── HistoryPanel.jsx    # History modal with search
├── lib/
│   ├── mockSnippets.js     # Mock code snippets database
│   ├── storage.js          # localStorage utilities
│   └── utils.ts            # General utilities
├── hooks/
│   └── use-toast.ts        # Toast notification hook
├── package.json
└── README.md
```

## API Specification

### Generate Code Endpoint

**Request**
```
POST /api/generate
Content-Type: application/json

{
  "prompt": "Write a Python function to reverse a string",
  "language": "python"
}
```

**Response (200 OK)**
```json
{
  "code": "def reverse_string(s):\n    return s[::-1]\n\n# Example usage\ntext = \"Hello\"\nprint(reverse_string(text))",
  "meta": {
    "language": "python",
    "mock": true,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses**
- `400 Bad Request`: Missing or empty prompt
- `405 Method Not Allowed`: Non-POST request

### Mock Snippet Keywords

The API matches keywords in your prompt to return relevant code snippets:

| Keyword | Snippets |
|---------|----------|
| reverse, string, backwards | String reversal function |
| factorial, recursive | Factorial calculation |
| sort, array, bubble | Bubble sort algorithm |
| fibonacci, sequence | Fibonacci generator |
| palindrome, check | Palindrome checker |

If no keywords match, a generic data processing function is returned.

## localStorage Schema

History items are stored with this structure:

```javascript
{
  id: "1699999999999-abc123xyz",
  prompt: "Write a Python function to reverse a string",
  code: "def reverse_string(s):\n    return s[::-1]",
  language: "python",
  timestamp: 1699999999999,
  starred: false
}
```

**Storage Key**: `voltai_history` (Array of max 100 items)

**Theme Preference**: `voltai_theme` ("light" or "dark")

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` / `Cmd+Enter` | Generate code |
| `Click History Button` | Open prompt history modal |

 

## Deployment

### Vercel 

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel auto-detects Next.js and deploys automatically
4. Your app is live at `https://your-project.vercel.app`

### Environment Variables

No environment variables are required for the demo version. The mock API works without configuration.

For production with a real API, add:
```
NEXT_PUBLIC_API_URL=https://your-api.com
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Fully keyboard navigable
- ARIA labels on all interactive elements
- Sufficient color contrast (WCAG AA)
- Proper heading hierarchy
- Semantic HTML structure

## Future Enhancements

- Real AI backend (OpenAI API integration)
- Code execution sandbox
- User authentication and cloud sync
- Code diff viewer
- Snippet sharing
- Custom snippet templates
- Language/framework specific prompts
- Code quality analysis

## License

MIT

## Support

For issues or suggestions, please open a GitHub issue or contact the maintainer.

---

**Live Demo**: https://automation-edge-frontend-assignment.vercel.app/

**GitHub Repository**: [https://github.com/amitgithub947/AutomationEdge-frontend-assignment]



export const mockSnippets = {
  python: {
    reverse: {
      keywords: ['reverse', 'string', 'backwards'],
      code: `def reverse_string(s):
    """Reverse a string using Python slicing."""
    return s[::-1]

# Example usage
text = "Hello, World!"
result = reverse_string(text)
print(result)  # !dlroW ,olleH`
    },
    factorial: {
      keywords: ['factorial', 'recursive'],
      code: `def factorial(n):
    """Calculate factorial recursively."""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Example usage
number = 5
result = factorial(number)
print(f"Factorial of {number} is {result}")  # 120`
    },
    sort: {
      keywords: ['sort', 'list', 'array', 'bubble'],
      code: `def bubble_sort(arr):
    """Sort an array using bubble sort algorithm."""
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers.copy())
print(sorted_numbers)  # [11, 12, 22, 25, 34, 64, 90]`
    },
    fibonacci: {
      keywords: ['fibonacci', 'sequence'],
      code: `def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]

    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    return sequence

# Example usage
result = fibonacci(10)
print(result)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`
    },
    palindrome: {
      keywords: ['palindrome', 'check'],
      code: `def is_palindrome(s):
    """Check if a string is a palindrome."""
    # Remove spaces and convert to lowercase
    s = s.replace(" ", "").lower()
    return s == s[::-1]

# Example usage
text1 = "racecar"
text2 = "A man a plan a canal Panama"
print(is_palindrome(text1))  # True
print(is_palindrome(text2))  # True`
    },
    default: {
      keywords: [],
      code: `def process_data(data):
    """Generic data processing function."""
    result = []
    for item in data:
        # Process each item
        processed = item.strip().upper()
        result.append(processed)
    return result

# Example usage
input_data = ["hello", "world", "python"]
output = process_data(input_data)
print(output)  # ['HELLO', 'WORLD', 'PYTHON']`
    }
  },
  javascript: {
    reverse: {
      keywords: ['reverse', 'string', 'backwards'],
      code: `function reverseString(s) {
  // Reverse a string using split, reverse, and join
  return s.split('').reverse().join('');
}

// Example usage
const text = "Hello, World!";
const result = reverseString(text);
console.log(result);  // !dlroW ,olleH`
    },
    factorial: {
      keywords: ['factorial', 'recursive'],
      code: `function factorial(n) {
  // Calculate factorial recursively
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Example usage
const number = 5;
const result = factorial(number);
console.log(\`Factorial of \${number} is \${result}\`);  // 120`
    },
    sort: {
      keywords: ['sort', 'list', 'array', 'bubble'],
      code: `function bubbleSort(arr) {
  // Sort an array using bubble sort algorithm
  const n = arr.length;
  const sorted = [...arr];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
      }
    }
  }
  return sorted;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = bubbleSort(numbers);
console.log(sortedNumbers);  // [11, 12, 22, 25, 34, 64, 90]`
    },
    fibonacci: {
      keywords: ['fibonacci', 'sequence'],
      code: `function fibonacci(n) {
  // Generate Fibonacci sequence up to n terms
  if (n <= 0) return [];
  if (n === 1) return [0];

  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i-1] + sequence[i-2]);
  }
  return sequence;
}

// Example usage
const result = fibonacci(10);
console.log(result);  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`
    },
    palindrome: {
      keywords: ['palindrome', 'check'],
      code: `function isPalindrome(s) {
  // Check if a string is a palindrome
  const cleaned = s.replace(/\s/g, '').toLowerCase();
  return cleaned === cleaned.split('').reverse().join('');
}

// Example usage
const text1 = "racecar";
const text2 = "A man a plan a canal Panama";
console.log(isPalindrome(text1));  // true
console.log(isPalindrome(text2));  // true`
    },
    default: {
      keywords: [],
      code: `function processData(data) {
  // Generic data processing function
  return data.map(item =>
    item.trim().toUpperCase()
  );
}

// Example usage
const inputData = ["hello", "world", "javascript"];
const output = processData(inputData);
console.log(output);  // ['HELLO', 'WORLD', 'JAVASCRIPT']`
    }
  },
  cpp: {
    reverse: {
      keywords: ['reverse', 'string', 'backwards'],
      code: `#include <iostream>
#include <string>
#include <algorithm>

std::string reverseString(const std::string& s) {
    // Reverse a string using reverse iterators
    return std::string(s.rbegin(), s.rend());
}

int main() {
    std::string text = "Hello, World!";
    std::string result = reverseString(text);
    std::cout << result << std::endl;  // !dlroW ,olleH
    return 0;
}`
    },
    factorial: {
      keywords: ['factorial', 'recursive'],
      code: `#include <iostream>

int factorial(int n) {
    // Calculate factorial recursively
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int number = 5;
    int result = factorial(number);
    std::cout << "Factorial of " << number
              << " is " << result << std::endl;  // 120
    return 0;
}`
    },
    sort: {
      keywords: ['sort', 'list', 'array', 'bubble'],
      code: `#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr) {
    // Sort an array using bubble sort algorithm
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(numbers);

    for (int num : numbers) {
        std::cout << num << " ";  // 11 12 22 25 34 64 90
    }
    std::cout << std::endl;
    return 0;
}`
    },
    fibonacci: {
      keywords: ['fibonacci', 'sequence'],
      code: `#include <iostream>
#include <vector>

std::vector<int> fibonacci(int n) {
    // Generate Fibonacci sequence up to n terms
    if (n <= 0) return {};
    if (n == 1) return {0};

    std::vector<int> sequence = {0, 1};
    for (int i = 2; i < n; i++) {
        sequence.push_back(sequence[i-1] + sequence[i-2]);
    }
    return sequence;
}

int main() {
    std::vector<int> result = fibonacci(10);
    for (int num : result) {
        std::cout << num << " ";  // 0 1 1 2 3 5 8 13 21 34
    }
    std::cout << std::endl;
    return 0;
}`
    },
    palindrome: {
      keywords: ['palindrome', 'check'],
      code: `#include <iostream>
#include <string>
#include <algorithm>

bool isPalindrome(std::string s) {
    // Check if a string is a palindrome
    s.erase(remove(s.begin(), s.end(), ' '), s.end());
    std::transform(s.begin(), s.end(), s.begin(), ::tolower);

    std::string reversed(s.rbegin(), s.rend());
    return s == reversed;
}

int main() {
    std::string text1 = "racecar";
    std::string text2 = "A man a plan a canal Panama";

    std::cout << std::boolalpha;
    std::cout << isPalindrome(text1) << std::endl;  // true
    std::cout << isPalindrome(text2) << std::endl;  // true
    return 0;
}`
    },
    default: {
      keywords: [],
      code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

std::vector<std::string> processData(std::vector<std::string> data) {
    // Generic data processing function
    std::vector<std::string> result;
    for (auto& item : data) {
        std::string processed = item;
        // Remove whitespace and convert to uppercase
        processed.erase(remove(processed.begin(), processed.end(), ' '),
                       processed.end());
        std::transform(processed.begin(), processed.end(),
                      processed.begin(), ::toupper);
        result.push_back(processed);
    }
    return result;
}

int main() {
    std::vector<std::string> input = {"hello", "world", "cpp"};
    std::vector<std::string> output = processData(input);

    for (const auto& str : output) {
        std::cout << str << " ";  // HELLO WORLD CPP
    }
    std::cout << std::endl;
    return 0;
}`
    }
  }
};

export function findSnippet(prompt: string, language: string): string {
  const promptLower = prompt.toLowerCase();
  const languageSnippets = mockSnippets[language as keyof typeof mockSnippets] || mockSnippets.python;

  for (const [key, snippet] of Object.entries(languageSnippets)) {
    if (key === 'default') continue;

    const hasKeyword = (snippet as any).keywords.some((keyword: string) =>
      promptLower.includes(keyword.toLowerCase())
    );

    if (hasKeyword) {
      return (snippet as any).code;
    }
  }

  return (languageSnippets as any).default.code;
}

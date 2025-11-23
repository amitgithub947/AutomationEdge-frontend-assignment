export const mockSnippets = {
  python: `def reverse_string(s):
    """Reverse a string using Python slicing."""
    return s[::-1]

# Example usage
text = "Hello, World!"
result = reverse_string(text)
print(result)  # !dlroW ,olleH`,

  javascript: `function reverseString(s) {
  // Reverse a string using split, reverse, and join
  return s.split('').reverse().join('');
}

// Example usage
const text = "Hello, World!";
const result = reverseString(text);
console.log(result);  // !dlroW ,olleH`,

  cpp: `#include <iostream>
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
};

export function getSnippet(language: string): string {
  return mockSnippets[language as keyof typeof mockSnippets] || mockSnippets.python;
}

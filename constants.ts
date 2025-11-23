import { Language } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { id: 'gdscript', name: 'GDScript', extension: 'gd' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts' },
  { id: 'csharp', name: 'C#', extension: 'cs' },
  { id: 'cpp', name: 'C++', extension: 'cpp' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'rust', name: 'Rust', extension: 'rs' },
  { id: 'go', name: 'Go', extension: 'go' },
  { id: 'swift', name: 'Swift', extension: 'swift' },
  { id: 'kotlin', name: 'Kotlin', extension: 'kt' },
  { id: 'php', name: 'PHP', extension: 'php' },
  { id: 'ruby', name: 'Ruby', extension: 'rb' },
  { id: 'lua', name: 'Lua', extension: 'lua' },
  { id: 'sql', name: 'SQL', extension: 'sql' },
  { id: 'html', name: 'HTML/CSS', extension: 'html' },
  { id: 'bash', name: 'Bash Script', extension: 'sh' },
  { id: 'r', name: 'R', extension: 'r' },
  { id: 'dart', name: 'Dart', extension: 'dart' },
  { id: 'scala', name: 'Scala', extension: 'scala' },
  { id: 'haskell', name: 'Haskell', extension: 'hs' },
];

export const INITIAL_INPUT = "Create a function that calculates the fibonacci sequence up to n terms.";

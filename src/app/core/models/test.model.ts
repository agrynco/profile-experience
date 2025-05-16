export interface Test {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  passingScore: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'coding';
  options?: Option[];
  correctAnswers?: string[];
  points: number;
  codeLanguage?: string;
  testCases?: TestCase[];
}

export interface Option {
  id: string;
  text: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface TestResult {
  id: string;
  testId: string;
  userId: string;
  score: number;
  maxScore: number;
  percentageScore: number;
  answers: Answer[];
  startedAt: Date;
  completedAt: Date;
  timeSpent: number; // in seconds
  pass: boolean;
}

export interface Answer {
  questionId: string;
  selectedOptions?: string[];
  codeAnswer?: string;
  isCorrect: boolean;
  points: number;
  feedback?: string;
}
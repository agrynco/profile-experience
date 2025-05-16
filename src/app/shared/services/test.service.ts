import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Test, TestResult, Answer } from '../../core/models/test.model';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = environment.apiUrl;
  
  // Mock data for demo purposes
  private mockTests: Test[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'This test evaluates your understanding of JavaScript basics including variables, data types, functions, and basic DOM manipulation.',
      duration: 30, // 30 minutes
      questions: [
        {
          id: '101',
          text: 'Which of the following is NOT a primitive data type in JavaScript?',
          type: 'multiple-choice',
          options: [
            { id: '1001', text: 'String' },
            { id: '1002', text: 'Boolean' },
            { id: '1003', text: 'Object' },
            { id: '1004', text: 'Number' }
          ],
          correctAnswers: ['1003'],
          points: 5
        },
        {
          id: '102',
          text: 'What will be the output of the following code?\n\nconsole.log(typeof null);',
          type: 'multiple-choice',
          options: [
            { id: '1005', text: '"null"' },
            { id: '1006', text: '"undefined"' },
            { id: '1007', text: '"object"' },
            { id: '1008', text: '"number"' }
          ],
          correctAnswers: ['1007'],
          points: 5
        },
        {
          id: '103',
          text: 'JavaScript is a case-sensitive language.',
          type: 'true-false',
          options: [
            { id: '1009', text: 'True' },
            { id: '1010', text: 'False' }
          ],
          correctAnswers: ['1009'],
          points: 5
        },
        {
          id: '104',
          text: 'Write a function that returns the factorial of a number.',
          type: 'coding',
          codeLanguage: 'JavaScript',
          testCases: [
            { input: '5', expectedOutput: '120', isHidden: false },
            { input: '0', expectedOutput: '1', isHidden: false },
            { input: '10', expectedOutput: '3628800', isHidden: true }
          ],
          points: 15
        }
      ],
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-01-15'),
      tags: ['JavaScript', 'Frontend', 'Basics'],
      difficulty: 'easy',
      passingScore: 70
    },
    {
      id: '2',
      title: 'React Component Development',
      description: 'Test your knowledge of React components, state management, and lifecycle methods.',
      duration: 45, // 45 minutes
      questions: [
        {
          id: '201',
          text: 'Which of the following is the correct way to create a functional component in React?',
          type: 'multiple-choice',
          options: [
            { id: '2001', text: 'function MyComponent() { return <div>Hello</div>; }' },
            { id: '2002', text: 'class MyComponent { render() { return <div>Hello</div>; } }' },
            { id: '2003', text: 'const MyComponent = () => { <div>Hello</div> }' },
            { id: '2004', text: 'MyComponent = function() { return <div>Hello</div>; }' }
          ],
          correctAnswers: ['2001'],
          points: 5
        },
        {
          id: '202',
          text: 'In React, the state of a component can be modified directly.',
          type: 'true-false',
          options: [
            { id: '2005', text: 'True' },
            { id: '2006', text: 'False' }
          ],
          correctAnswers: ['2006'],
          points: 5
        }
      ],
      createdAt: new Date('2023-02-10'),
      updatedAt: new Date('2023-02-15'),
      tags: ['React', 'Frontend', 'Components'],
      difficulty: 'medium',
      passingScore: 75
    }
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getTests(): Observable<Test[]> {
    // In a real app, we would call the API
    // return this.http.get<Test[]>(`${this.apiUrl}/tests`);
    
    // For demo, return mock data with artificial delay
    return of(this.mockTests).pipe(delay(800));
  }

  getTestById(id: string): Observable<Test> {
    // In a real app, we would call the API
    // return this.http.get<Test>(`${this.apiUrl}/tests/${id}`);
    
    // For demo, find test in mock data
    const test = this.mockTests.find(t => t.id === id);
    if (test) {
      return of(test).pipe(delay(800));
    }
    
    // Return error if test not found
    return new Observable(observer => {
      setTimeout(() => {
        observer.error(new Error('Test not found'));
      }, 800);
    });
  }

  submitTest(testId: string, answers: Answer[]): Observable<TestResult> {
    // In a real app, we would call the API
    // return this.http.post<TestResult>(`${this.apiUrl}/tests/${testId}/submit`, { answers });
    
    // For demo, create a mock result
    const test = this.mockTests.find(t => t.id === testId);
    const user = this.authService.getCurrentUser();
    
    if (!test || !user) {
      return new Observable(observer => {
        setTimeout(() => {
          observer.error(new Error('Test or user not found'));
        }, 800);
      });
    }
    
    // Simulate grading
    let totalScore = 0;
    let maxScore = 0;
    
    const gradedAnswers = answers.map(answer => {
      const question = test.questions.find(q => q.id === answer.questionId);
      if (!question) return answer;
      
      maxScore += question.points;
      
      // Simulate correctness check (in a real app this would be done server-side)
      let isCorrect = false;
      
      if (question.type === 'multiple-choice' || question.type === 'true-false') {
        if (answer.selectedOptions && question.correctAnswers) {
          // Simple array comparison (would be more sophisticated in real app)
          isCorrect = JSON.stringify(answer.selectedOptions.sort()) === 
                      JSON.stringify(question.correctAnswers.sort());
        }
      } else if (question.type === 'coding') {
        // For demo, randomly mark coding questions as correct/incorrect
        isCorrect = Math.random() > 0.5;
      }
      
      const points = isCorrect ? question.points : 0;
      totalScore += points;
      
      return {
        ...answer,
        isCorrect,
        points
      };
    });
    
    const percentageScore = (totalScore / maxScore) * 100;
    const pass = percentageScore >= test.passingScore;
    
    const result: TestResult = {
      id: Math.random().toString(36).substring(2, 11), // Generate random ID
      testId: test.id,
      userId: user.id,
      score: totalScore,
      maxScore: maxScore,
      percentageScore: percentageScore,
      answers: gradedAnswers,
      startedAt: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      completedAt: new Date(),
      timeSpent: 1200, // 20 minutes in seconds
      pass: pass
    };
    
    return of(result).pipe(delay(1500)); // Simulate processing time
  }

  createTest(test: Partial<Test>): Observable<Test> {
    // In a real app, we would call the API
    // return this.http.post<Test>(`${this.apiUrl}/tests`, test);
    
    // For demo, return mock created test
    const newTest: Test = {
      id: Math.random().toString(36).substring(2, 11),
      title: test.title || 'New Test',
      description: test.description || '',
      duration: test.duration || 30,
      questions: test.questions || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: test.tags || [],
      difficulty: test.difficulty || 'medium',
      passingScore: test.passingScore || 70
    };
    
    this.mockTests.push(newTest);
    return of(newTest).pipe(delay(800));
  }

  getTestResults(userId: string): Observable<TestResult[]> {
    // In a real app, we would call the API
    // return this.http.get<TestResult[]>(`${this.apiUrl}/users/${userId}/results`);
    
    // For demo, return mock results
    const mockResults: TestResult[] = [
      {
        id: '1',
        testId: '1',
        userId: userId,
        score: 25,
        maxScore: 30,
        percentageScore: 83.33,
        answers: [],
        startedAt: new Date('2023-03-10T14:30:00'),
        completedAt: new Date('2023-03-10T15:00:00'),
        timeSpent: 1800,
        pass: true
      }
    ];
    
    return of(mockResults).pipe(delay(800));
  }
}
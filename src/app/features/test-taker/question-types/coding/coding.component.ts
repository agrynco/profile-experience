import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Question, Answer, TestCase } from '../../../../core/models/test.model';

@Component({
  selector: 'app-coding-question',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.css']
})
export class CodingQuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() existingAnswer: Answer | undefined;
  
  @Output() answerChanged = new EventEmitter<Answer>();
  
  codeAnswer: string = '';
  showTestCases: boolean = false;
  
  ngOnInit(): void {
    if (this.existingAnswer && this.existingAnswer.codeAnswer) {
      this.codeAnswer = this.existingAnswer.codeAnswer;
    } else {
      // Provide starter code based on the language
      this.codeAnswer = this.getStarterCode();
    }
  }
  
  onCodeChange(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.codeAnswer = input.value;
    this.emitAnswer();
  }
  
  toggleTestCases(): void {
    this.showTestCases = !this.showTestCases;
  }
  
  getVisibleTestCases(): TestCase[] {
    return this.question.testCases ? 
      this.question.testCases.filter(tc => !tc.isHidden) : 
      [];
  }
  
  private emitAnswer(): void {
    const answer: Answer = {
      questionId: this.question.id,
      codeAnswer: this.codeAnswer,
      isCorrect: false, // Will be evaluated server-side
      points: 0 // Will be calculated server-side
    };
    
    this.answerChanged.emit(answer);
  }
  
  private getStarterCode(): string {
    switch (this.question.codeLanguage?.toLowerCase()) {
      case 'javascript':
        return `// Write your JavaScript code here
function solution(input) {
  // Your code goes here
  return;
}`;
      case 'python':
        return `# Write your Python code here
def solution(input):
    # Your code goes here
    return`;
      case 'java':
        return `// Write your Java code here
public class Solution {
    public static void main(String[] args) {
        // Your code goes here
    }
}`;
      default:
        return `// Write your code here`;
    }
  }
}
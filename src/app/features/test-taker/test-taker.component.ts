import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Test, Question, Answer } from '../../core/models/test.model';
import { TestService } from '../../shared/services/test.service';

@Component({
  selector: 'app-test-taker',
  templateUrl: './test-taker.component.html',
  styleUrls: ['./test-taker.component.css']
})
export class TestTakerComponent implements OnInit, OnDestroy {
  test!: Test;
  currentQuestionIndex = 0;
  answers: Map<string, Answer> = new Map();
  isLoading = true;
  errorMessage = '';
  
  // Timer related properties
  timeRemaining: number = 0;
  timerSubscription?: Subscription;
  
  // Test state flags
  testStarted = false;
  testSubmitted = false;
  
  // Confirmation modal
  showConfirmModal = false;
  confirmationMessage = '';
  confirmationAction: () => void = () => {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    if (!testId) {
      this.errorMessage = 'Test ID is required';
      this.isLoading = false;
      return;
    }
    
    this.testService.getTestById(testId).subscribe({
      next: (test) => {
        this.test = test;
        this.timeRemaining = test.duration * 60; // Convert minutes to seconds
        this.isLoading = false;
        
        // Initialize answers map
        this.test.questions.forEach(question => {
          this.answers.set(question.id, {
            questionId: question.id,
            isCorrect: false,
            points: 0
          });
        });
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load test';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTest(): void {
    this.testStarted = true;
    this.startTimer();
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.autoSubmitTest();
      }
    });
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  get currentQuestion(): Question {
    return this.test.questions[this.currentQuestionIndex];
  }

  get progressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.test.questions.length) * 100;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.test.questions.length - 1) {
      this.currentQuestionIndex++;
      this.animateQuestion('slide-left');
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.animateQuestion('slide-right');
    }
  }

  animateQuestion(animation: string): void {
    const questionEl = document.querySelector('.question-card');
    if (questionEl) {
      questionEl.classList.add(animation);
      setTimeout(() => {
        questionEl.classList.remove(animation);
      }, 300);
    }
  }

  updateAnswer(answer: Answer): void {
    this.answers.set(answer.questionId, answer);
  }
  
  isAnswered(questionId: string): boolean {
    const answer = this.answers.get(questionId);
    if (!answer) return false;
    
    if (answer.selectedOptions) {
      return answer.selectedOptions.length > 0;
    } else if (answer.codeAnswer) {
      return answer.codeAnswer.trim().length > 0;
    }
    
    return false;
  }

  onSubmitConfirm(): void {
    this.showConfirmModal = true;
    this.confirmationMessage = 'Are you sure you want to submit this test? You cannot make changes once submitted.';
    this.confirmationAction = () => this.submitTest();
  }

  submitTest(): void {
    this.stopTimer();
    this.testSubmitted = true;
    this.showConfirmModal = false;
    
    // Convert answers map to array
    const answersArray = Array.from(this.answers.values());
    
    this.testService.submitTest(this.test.id, answersArray).subscribe({
      next: (result) => {
        this.router.navigate(['/results', result.id]);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to submit test';
      }
    });
  }

  autoSubmitTest(): void {
    this.stopTimer();
    
    // Show auto-submit message
    this.showConfirmModal = true;
    this.confirmationMessage = 'Time\'s up! Your test will be submitted automatically.';
    this.confirmationAction = () => this.submitTest();
    
    // Auto-submit after 3 seconds
    setTimeout(() => {
      if (this.showConfirmModal) {
        this.submitTest();
      }
    }, 3000);
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
  }

  navigateToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }
}
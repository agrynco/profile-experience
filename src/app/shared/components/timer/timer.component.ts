import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration: number = 0; // Duration in seconds
  @Input() warningThreshold: number = 300; // 5 minutes warning threshold
  
  @Output() timerComplete = new EventEmitter<void>();
  
  timeRemaining: number = 0;
  timerSubscription?: Subscription;
  
  ngOnInit(): void {
    this.timeRemaining = this.duration;
    this.startTimer();
  }
  
  ngOnDestroy(): void {
    this.stopTimer();
  }
  
  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.stopTimer();
        this.timerComplete.emit();
      }
    });
  }
  
  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  
  pauseTimer(): void {
    this.stopTimer();
  }
  
  resumeTimer(): void {
    this.startTimer();
  }
  
  resetTimer(): void {
    this.stopTimer();
    this.timeRemaining = this.duration;
    this.startTimer();
  }
  
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  get isWarning(): boolean {
    return this.timeRemaining <= this.warningThreshold;
  }
}
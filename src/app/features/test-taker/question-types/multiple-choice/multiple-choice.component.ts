import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Question, Answer } from '../../../../core/models/test.model';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceQuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() existingAnswer: Answer | undefined;
  
  @Output() answerChanged = new EventEmitter<Answer>();
  
  selectedOptions: string[] = [];
  
  ngOnInit(): void {
    if (this.existingAnswer && this.existingAnswer.selectedOptions) {
      this.selectedOptions = [...this.existingAnswer.selectedOptions];
    }
  }
  
  toggleOption(optionId: string): void {
    const isTrueFalse = this.question.type === 'true-false';
    
    if (isTrueFalse || this.question.options!.length === 1) {
      // For true/false or single-option questions, only allow one selection
      this.selectedOptions = [optionId];
    } else {
      const index = this.selectedOptions.indexOf(optionId);
      if (index === -1) {
        this.selectedOptions.push(optionId);
      } else {
        this.selectedOptions.splice(index, 1);
      }
    }
    
    this.emitAnswer();
  }
  
  isSelected(optionId: string): boolean {
    return this.selectedOptions.includes(optionId);
  }
  
  private emitAnswer(): void {
    const answer: Answer = {
      questionId: this.question.id,
      selectedOptions: this.selectedOptions,
      isCorrect: false, // Will be evaluated server-side
      points: 0 // Will be calculated server-side
    };
    
    this.answerChanged.emit(answer);
  }
}
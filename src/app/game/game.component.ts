import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  boxes: { number: number | null }[] = Array(9).fill({ number: null });
  correctSequence: number[] = [];
  userSequence: number[] = [];
  gameActive = false;
  countdown = 0;
  countdownInterval: any;
  canClickBoxes = false;
  message = '';

  ngOnInit() {}

  startGame(level: 'easy' | 'hard' | 'extreme') {
    if (this.gameActive) return;

    this.gameActive = true;
    this.userSequence = [];
    this.correctSequence = Array.from({ length: 9 }, (_, i) => i + 1);
    this.shuffleArray(this.correctSequence);
    this.displayNumbers();

    const countdownTime = this.getCountdownTime(level);
    this.startCountdown(countdownTime);

    setTimeout(() => this.hideNumbers(), this.getLevelTime(level));
  }

  getLevelTime(level: 'easy' | 'hard' | 'extreme'): number {
    switch (level) {
      case 'easy':
        return 7000;
      case 'hard':
        return 4000;
      case 'extreme':
        return 1000;
      default:
        return 30000;
    }
  }

  getCountdownTime(level: 'easy' | 'hard' | 'extreme'): number {
    switch (level) {
      case 'easy':
        return 7;
      case 'hard':
        return 4;
      case 'extreme':
        return 1;
      default:
        return 30;
    }
  }

  shuffleArray(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  displayNumbers() {
    this.boxes = this.boxes.map((box, index) => ({ number: this.correctSequence[index] }));
    this.message = 'Memorize the order!';
  }

  hideNumbers() {
    this.boxes = this.boxes.map(() => ({ number: null }));
    this.message = 'Click the boxes in order from 1 to 9!';
    this.canClickBoxes = true;
  }

  checkNumber(boxNumber: number) {
    if (!this.gameActive || !this.canClickBoxes) return;

    const expectedNumber = this.userSequence.length + 1;

    if (this.correctSequence[boxNumber - 1] === expectedNumber) {
      this.boxes[boxNumber - 1] = { number: expectedNumber };
      this.userSequence.push(boxNumber);

      if (this.userSequence.length === 9) {
        this.endGame();
      }
    } else {
      this.endGame();
    }
  }

  startCountdown(seconds: number) {
    this.countdown = seconds;

    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.canClickBoxes = true;
      }
    }, 1000);
  }

  endGame() {
    this.gameActive = false;
    this.canClickBoxes = false;

    clearInterval(this.countdownInterval);

    this.correctSequence.forEach((number, index) => {
      this.boxes[index] = { number: number };
      if (this.userSequence.includes(index + 1)) {
        this.boxes[index] = { number: number }; // Green for correct
      } else {
        this.boxes[index] = { number: number }; // Red for missed or incorrect
      }
    });

    if (this.userSequence.length === 9 && this.userSequence.every((num, i) => this.correctSequence[num - 1] === i + 1)) {
      this.message = 'You won! Great memory!';
    } else {
      this.message = 'Game Over! Here\'s the correct pattern.';
    }
  }
}

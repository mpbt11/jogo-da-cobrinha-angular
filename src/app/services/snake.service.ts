import { Injectable } from '@angular/core';
import { snakeBody } from '../models/snake';
import { InputService } from './input.service';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  public newSegments = 0;

  constructor(private inputService: InputService) {}

  public update() {
    this.addSegments();

    const inputDirection = this.inputService.getInputDirection();

    for (let i = snakeBody.length - 2; i >= 0; i--) {
      snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
  }

  public draw() {
    const gameboard: any = document.getElementById('game-board');
    snakeBody.forEach((segment) => {
      const snakeElement: any = document.createElement('div');

      snakeElement.style.gridRowStart = segment.y;

      snakeElement.style.gridColumnStart = segment.x;

      snakeElement.style.backgroundColor = 'green';

      snakeElement.style.padding = '5px';

      gameboard?.appendChild(snakeElement);
    });
  }

  public collision(position: any) {
    return snakeBody.some((segment) => {
      return position.x === segment.x && position.y === segment.y;
    });
  }

  public expandSnake(amout: any) {
    this.newSegments += amout;
  }

  public addSegments() {
    if (this.newSegments > 0) {
      snakeBody.push({
        ...snakeBody[snakeBody.length - 1],
      });
      this.newSegments -= 1;
    }
  }

  public getSnakeHead() {
    return snakeBody[0];
  }

  public hasSelfCollision() {
    const snakeHead = snakeBody[0];

    return snakeBody.some((segment, index) => {
      if (index === 0) return false;
      return snakeHead.x === segment.x && snakeHead.y === segment.y;
    });
  }
}

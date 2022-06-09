import { SnakeService } from './snake.service';
import { BoardService } from './board.service';
import { EXPANSION_RATE } from '../models/food';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  public foodPosition: any;

  constructor(
    private boardService: BoardService,
    private snakeService: SnakeService
  ) {}

  public update = () => {
    if (this.snakeService.collision(this.foodPosition)) {
      this.snakeService.expandSnake(EXPANSION_RATE);
      this.foodPosition = this.generateRondomPosition();
    }
  };

  public draw() {
    const gameboard: any = document.getElementById('game-board');

    const foodElement: any = document.createElement('div');

    foodElement.style.gridRowStart = this.foodPosition.y;

    foodElement.style.gridColumnStart = this.foodPosition.x;

    foodElement.style.backgroundColor = 'red';

    gameboard?.appendChild(foodElement);
  }

  private generateRondomPosition() {
    let newFoodPosition;

    while (
      newFoodPosition === undefined ||
      this.snakeService.collision(newFoodPosition)
    ) {
      newFoodPosition = this.boardService.generateRondomBoardPosition();
    }
    return newFoodPosition;
  }

  public startFood() {
    this.foodPosition = this.generateRondomPosition();
  }
}

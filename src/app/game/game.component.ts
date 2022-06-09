import { Component, HostListener, OnInit } from '@angular/core';
import { SNAKE_SPEED } from '../models/snake';
import { BoardService } from '../services/board.service';
import { SnakeService } from '../services/snake.service';
import { FoodService } from '../services/food.service';
import { InputService } from '../services/input.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  public lastTimeRender: any;
  public SNAKE_SPEED = SNAKE_SPEED;

  constructor(
    private snakeService: SnakeService,
    private boardService: BoardService,
    private foodService: FoodService,
    private inputService: InputService
  ) {}

  ngOnInit(): void {
    this.start();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.inputService.input(event);
  }

  start() {
    this.lastTimeRender = 0;
    this.foodService.startFood();

    const main = (currentTime: any) => {
      if (this.checkGameOver()) {
        if (confirm('GAME OVER')) {
          window.location.reload();
        } else {
          window.requestAnimationFrame(main);
        }
        return;
      }
      window.requestAnimationFrame(main);

      const secondsSinceLastRender = (currentTime - this.lastTimeRender) / 1000;

      if (secondsSinceLastRender < 1 / this.SNAKE_SPEED) return;

      this.lastTimeRender = currentTime;

      this.update();

      this.draw();
    };

    window.requestAnimationFrame(main);
  }

  private update() {
    const gameboard: any = document.getElementById('game-board');
    gameboard.innerHTML = null;
    this.snakeService.update();
    this.foodService.update();
  }

  private draw() {
    this.snakeService.draw();
    this.foodService.draw();
  }

  private checkGameOver() {
    return (
      this.boardService.isOutsideBoard(this.snakeService.getSnakeHead()) ||
      this.snakeService.hasSelfCollision()
    );
  }
}

import { Injectable } from '@angular/core';
import { BOARD_SIZE } from '../models/board';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor() {}

  public generateRondomBoardPosition = () => {
    return {
      x: Math.floor(Math.random() * BOARD_SIZE) + 1,
      y: Math.floor(Math.random() * BOARD_SIZE) + 1,
    };
  };

  public isOutsideBoard = (position: any) => {
    return (
      position.x > BOARD_SIZE ||
      position.x < 1 ||
      position.y > BOARD_SIZE ||
      position.y < 1
    );
  };
}

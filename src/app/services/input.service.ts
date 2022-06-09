import { Injectable } from '@angular/core';
import { inputDirection } from '../models/snake';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  public lastInputDirection: any = {
    x: 0,
    y: 0,
  };

  constructor() {}

  public input(event: any) {
    switch (event.key) {
      case 'ArrowUp':
        if (this.lastInputDirection.y !== 0) break;
        inputDirection.x = 0;
        inputDirection.y = -1;
        break;
      case 'ArrowDown':
        if (this.lastInputDirection.y !== 0) break;
        inputDirection.x = 0;
        inputDirection.y = 1;
        break;
      case 'ArrowRight':
        if (this.lastInputDirection.x !== 0) break;
        inputDirection.x = 1;
        inputDirection.y = 0;
        break;
      case 'ArrowLeft':
        if (this.lastInputDirection.x !== 0) break;
        inputDirection.x = -1;
        inputDirection.y = 0;
        break;
      default:
        break;
    }
  }

  public getInputDirection() {
    this.lastInputDirection = inputDirection;
    return inputDirection;
  }
}
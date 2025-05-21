import { printBoard } from '../src/boardPrinter.js';
import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';

describe('boardPrinter', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should print empty board correctly', () => {
    const gameState = {
      you: { id: 'me', body: [] },
      board: {
        width: 3,
        height: 3,
        food: [],
        snakes: []
      }
    };
    
    printBoard(gameState);
    
    expect(consoleSpy).toHaveBeenCalledWith('BOARD:');
    expect(consoleSpy).toHaveBeenCalledWith('. . .');
  });

  it('should print snakes and food correctly', () => {
    const gameState = {
      you: {
        id: 'me',
        body: [
          { x: 1, y: 1 }, // head
          { x: 1, y: 0 }  // body
        ]
      },
      board: {
        width: 3,
        height: 3,
        food: [{ x: 0, y: 2 }],
        snakes: [
          {
            id: 'me',
            body: [
              { x: 1, y: 1 },
              { x: 1, y: 0 }
            ]
          },
          {
            id: 'enemy',
            body: [
              { x: 2, y: 2 }, // head
              { x: 2, y: 1 }   // body
            ]
          }
        ]
      }
    };
    
    printBoard(gameState);
    
    expect(consoleSpy).toHaveBeenCalledWith('F . h');
    expect(consoleSpy).toHaveBeenCalledWith('. H E');
    expect(consoleSpy).toHaveBeenCalledWith('. S .');
  });
});
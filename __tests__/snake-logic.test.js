import {
  preventSelfCollision,
  preventOtherSnakeCollision,
  preventWallCollision,
  findClosestFood,
  allowTailCollision
} from '../src/snakeLogic.js';
import { describe, it, expect } from '@jest/globals';

describe('snakeLogic', () => {
  describe('preventSelfCollision', () => {
    it('should prevent moving into neck position', () => {
      const gameState = {
        you: {
          body: [
            { x: 5, y: 5 }, // head
            { x: 5, y: 4 }  // neck (coming from below)
          ]
        }
      };
      
      const safeMoves = preventSelfCollision(gameState);
      expect(safeMoves).not.toContain('down');
    });

    it('should allow all moves when no immediate collision', () => {
      const gameState = {
        you: {
          body: [
            { x: 5, y: 5 } // head only, no neck
          ]
        }
      };
      
      expect(preventSelfCollision(gameState)).toEqual(['up', 'down', 'left', 'right']);
    });
  });

  describe('preventOtherSnakeCollision', () => {
    it('should mark moves unsafe when colliding with other snakes', () => {
      const gameState = {
        you: {
          id: 'me',
          body: [{ x: 5, y: 5 }]
        },
        board: {
          snakes: [
            {
              id: 'enemy',
              body: [{ x: 5, y: 6 }] // enemy head above
            }
          ]
        }
      };
      
      const isMoveSafe = { up: true, down: true, left: true, right: true };
      preventOtherSnakeCollision(gameState, isMoveSafe);
      expect(isMoveSafe.up).toBe(false);
    });
  });

  describe('preventWallCollision', () => {
    it('should prevent moving into walls', () => {
      const gameState = {
        you: {
          body: [{ x: 0, y: 0 }] // bottom-left corner
        },
        board: {
          width: 11,
          height: 11
        }
      };
      
      const isMoveSafe = { up: true, down: true, left: true, right: true };
      preventWallCollision(gameState, isMoveSafe);
      expect(isMoveSafe.left).toBe(false);
      expect(isMoveSafe.down).toBe(false);
    });
  });

  describe('findClosestFood', () => {
    it('should find move towards closest food', () => {
      const gameState = {
        you: {
          body: [{ x: 5, y: 5 }]
        },
        board: {
          food: [
            { x: 5, y: 7 }, // up
            { x: 3, y: 5 }  // left (closest)
          ]
        }
      };
      
      const isMoveSafe = { up: true, down: true, left: true, right: true };
      expect(findClosestFood(gameState, isMoveSafe)).toEqual('up');
    });
  });

  describe('allowTailCollision', () => {
    it('should allow moving into tail when no food is present', () => {
      const gameState = {
        you: {
          body: [{ x: 5, y: 5 }]
        },
        board: {
          snakes: [
            {
              id: 'enemy',
              body: [
                { x: 6, y: 5 }, // head
                { x: 6, y: 6 }, // body
                { x: 5, y: 6 }   // tail
              ]
            }
          ],
          food: []
        }
      };
      
      const isMoveSafe = { up: false, down: false, left: false, right: false };
      allowTailCollision(gameState, isMoveSafe);
      expect(isMoveSafe.up).toBe(true);
    });
  });
});
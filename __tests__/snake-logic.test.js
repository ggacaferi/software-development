import {
  preventSelfCollision,
  preventOtherSnakeCollision,
  preventWallCollision,
  findClosestFood,
  allowTailCollision,
} from "../src/snakeLogic.js";

import { describe, it, expect, test } from "@jest/globals";

describe("snakeLogic", () => {
  describe("preventSelfCollision", () => {
    it("should prevent moving into neck position", () => {
      const gameState = {
        you: {
          body: [
            { x: 5, y: 5 }, // head

            { x: 5, y: 4 }, // neck (coming from below)
          ],
        },
      };

      const safeMoves = preventSelfCollision(gameState);

      expect(safeMoves).not.toContain("down");
    });

    it("should allow all moves when no immediate collision", () => {
      const gameState = {
        you: {
          body: [
            { x: 5, y: 5 }, // head only, no neck
          ],
        },
      };

      expect(preventSelfCollision(gameState)).toEqual([
        "up",
        "down",
        "left",
        "right",
      ]);
    });
  });

  describe("preventOtherSnakeCollision", () => {
    it("should mark moves unsafe when colliding with other snakes", () => {
      const gameState = {
        you: {
          id: "me",

          body: [{ x: 5, y: 5 }],
        },

        board: {
          snakes: [
            {
              id: "enemy",

              body: [{ x: 5, y: 6 }], // enemy head above
            },
          ],
        },
      };

      const isMoveSafe = { up: true, down: true, left: true, right: true };

      preventOtherSnakeCollision(gameState, isMoveSafe);

      expect(isMoveSafe.up).toBe(false);
    });

    test("preventOtherSnakeCollision prevents collision with other snakes", () => {
      const gameState = {
        board: {
          snakes: [
            {
              body: [
                { x: 2, y: 3 },
                { x: 2, y: 4 },
              ],
            }, // Opponent snake
          ],
        },

        you: { body: [{ x: 2, y: 2 }] }, // My head
      };

      const isMoveSafe = { up: true, down: true, left: true, right: true };

      preventOtherSnakeCollision(gameState, isMoveSafe);

      expect(isMoveSafe.up).toBe(false);
    });

    it("should prevent collisions with multiple snakes", () => {
      const gameState = {
        you: {
          body: [{ x: 5, y: 5 }],
        },

        board: {
          snakes: [
            {
              id: "enemy1",

              body: [{ x: 5, y: 6 }], // enemy1 head above
            },

            {
              id: "enemy2",

              body: [{ x: 4, y: 5 }], // enemy2 head to the left
            },
          ],
        },
      };

      const isMoveSafe = { up: true, down: true, left: true, right: true };

      preventOtherSnakeCollision(gameState, isMoveSafe);

      expect(isMoveSafe.up).toBe(false);

      expect(isMoveSafe.left).toBe(false);

      expect(isMoveSafe.down).toBe(true);

      expect(isMoveSafe.right).toBe(true);
    });
  });

  describe("preventWallCollision", () => {
    it("should prevent moving into walls", () => {
      const gameState = {
        you: {
          body: [{ x: 0, y: 0 }], // bottom-left corner
        },

        board: {
          width: 11,

          height: 11,
        },
      };

      const isMoveSafe = { up: true, down: true, left: true, right: true };

      preventWallCollision(gameState, isMoveSafe);

      expect(isMoveSafe.left).toBe(false);

      expect(isMoveSafe.down).toBe(false);
    });

    it("should prevent moving into walls when near multiple edges", () => {
      const gameState = {
        you: {
          body: [{ x: 0, y: 10 }], // top-left corner
        },

        board: {
          width: 11,
          height: 11,
        },
      };

      const isMoveSafe = { up: true, down: true, left: true, right: true };

      preventWallCollision(gameState, isMoveSafe);

      expect(isMoveSafe.left).toBe(false);

      expect(isMoveSafe.up).toBe(false);

      expect(isMoveSafe.down).toBe(true);

      expect(isMoveSafe.right).toBe(true);
    });
  });

  describe("findClosestFood", () => {
    it("should find move towards closest food", () => {
      const gameState = {
        you: {
          body: [{ x: 5, y: 5 }],
        },

        board: {
          food: [
            { x: 5, y: 7 }, // up

            { x: 3, y: 5 }, // left (closest)
          ],
        },
      };

      const isMoveSafe = { up: true, down: true, left: true, right: true };

      expect(findClosestFood(gameState, isMoveSafe)).toEqual("up");
    });

    test("findClosestFood returns the direction to the nearest food", () => {
      const gameState = {
        you: { body: [{ x: 2, y: 2 }] }, // Head

        board: {
          food: [
            { x: 4, y: 2 }, // Farther food

            { x: 3, y: 2 }, // Closer food
          ],
        },
      };

      const isMoveSafe = { up: true, down: true, left: true, right: true };

      const move = findClosestFood(gameState, isMoveSafe);

      expect(move).toBe("right");
    });

    test("findClosestFood returns null when no food is present", () => {
      const gameState = {
        you: { body: [{ x: 2, y: 2 }] }, // Head

        board: { food: [] },
      };

      const isMoveSafe = { up: true, down: true, left: true, right: true };

      const move = findClosestFood(gameState, isMoveSafe);

      expect(move).toBeNull();
    });
  });

  describe("allowTailCollision", () => {
    it("should allow moving into tail when no food is present", () => {
      const gameState = {
        you: {
          body: [{ x: 5, y: 5 }],
        },

        board: {
          snakes: [
            {
              id: "enemy",

              body: [
                { x: 6, y: 5 }, // head

                { x: 6, y: 6 }, // body

                { x: 5, y: 6 }, // tail
              ],
            },
          ],

          food: [],
        },
      };

      const isMoveSafe = { up: false, down: false, left: false, right: false };

      allowTailCollision(gameState, isMoveSafe);

      expect(isMoveSafe.up).toBe(true);
    });
  });
});

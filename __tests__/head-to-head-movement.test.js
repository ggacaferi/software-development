import { headToHeadMovement } from "../src/headToHeadMovement.js";
import { describe, it, expect } from "@jest/globals";

describe("headToHeadMovement", () => {
  it("should avoid head-to-head when smaller", () => {
    const gameState = {
      you: {
        id: "me",
        body: [{ x: 5, y: 5 }],
        length: 2,
      },
      board: {
        snakes: [
          {
            id: "enemy",
            body: [{ x: 5, y: 6 }], // enemy above
            length: 3, // enemy is longer
          },
        ],
      },
    };

    const isMoveSafe = { up: true, down: true, left: true, right: true };
    headToHeadMovement(gameState, isMoveSafe);
    expect(isMoveSafe.up).toBe(false);
  });

  it("should allow head-to-head when larger", () => {
    const gameState = {
      you: {
        id: "me",
        body: [{ x: 5, y: 5 }],
        length: 3,
      },
      board: {
        snakes: [
          {
            id: "enemy",
            body: [{ x: 5, y: 6 }], // enemy above
            length: 2, // enemy is shorter
          },
        ],
      },
    };

    const isMoveSafe = { up: true, down: true, left: true, right: true };
    headToHeadMovement(gameState, isMoveSafe);
    expect(isMoveSafe.up).toBe(true);
  });

  it("should avoid head-to-head with multiple larger snakes", () => {
    const gameState = {
      you: {
        id: "me",
        body: [{ x: 5, y: 5 }],
        length: 2,
      },
      board: {
        snakes: [
          {
            id: "enemy1",
            body: [{ x: 5, y: 6 }], // enemy1 above
            length: 3,
          },
          {
            id: "enemy2",
            body: [{ x: 4, y: 5 }], // enemy2 to the left
            length: 4,
          },
        ],
      },
    };

    const isMoveSafe = { up: true, down: true, left: true, right: true };
    headToHeadMovement(gameState, isMoveSafe);
    expect(isMoveSafe.up).toBe(false);
    expect(isMoveSafe.left).toBe(false);
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.right).toBe(true);
  });
});

import { aStar, initializeScores, findNodeWithLowestFScore, isGoalReached } from "../src/pathfinding.js";
import { describe, it, expect } from "@jest/globals";


// Since the helper functions are not exported, we can only directly test aStar.
// For full coverage, you would export the helpers or test them indirectly via aStar.

describe("aStar", () => {
  it("finds a direct path on an empty board", () => {
    const start = { x: 0, y: 0 };
    const goal = { x: 2, y: 0 };
    const gameState = {
      width: 3,
      height: 1,
      map: [
        [0, 0, 0]
      ]
    };
    const path = aStar(start, goal, gameState);
    expect(path).toEqual([
      { x: 1, y: 0 },
      { x: 2, y: 0 }
    ]);
  });

  it("returns empty array if no path exists", () => {
    const start = { x: 0, y: 0 };
    const goal = { x: 2, y: 0 };
    const gameState = {
      width: 3,
      height: 1,
      map: [
        [0, 1, 1]
      ]
    };
    const path = aStar(start, goal, gameState);
    expect(path).toEqual([]);
  });

  it("finds a path around an obstacle", () => {
    const start = { x: 0, y: 0 };
    const goal = { x: 2, y: 0 };
    const gameState = {
      width: 3,
      height: 2,
      map: [
        [0, 1, 0],
        [0, 0, 0]
      ]
    };
    const path = aStar(start, goal, gameState);
    // The path should go down, right, right, up
    expect(path).toEqual([
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 0 }
    ]);
  });
});

describe("initializeScores", () => {
  it("initializes gScore and fScore for start node", () => {
    const gScore = {};
    const fScore = {};
    const start = { x: 0, y: 0 };
    const goal = { x: 1, y: 1 };
    initializeScores(start, goal, gScore, fScore);
    const key = `${start.x},${start.y}`;
    expect(gScore[key]).toBe(0);
    expect(fScore[key]).toBeGreaterThanOrEqual(0);
  });
});

describe("findNodeWithLowestFScore", () => {
  it("returns node with lowest fScore", () => {
    const openSet = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    const fScore = {
      [JSON.stringify({ x: 0, y: 0 })]: 10,
      [JSON.stringify({ x: 1, y: 1 })]: 5
    };
    const node = findNodeWithLowestFScore(openSet, fScore);
    expect(node).toEqual({ x: 1, y: 1 });
  });
});

describe("isGoalReached", () => {
  it("returns true if current equals goal", () => {
    expect(isGoalReached({ x: 1, y: 1 }, { x: 1, y: 1 })).toBe(true);
    expect(isGoalReached({ x: 1, y: 1 }, { x: 2, y: 1 })).toBe(false);
  });
});

// Add similar tests for reconstructPath and processNeighbors as needed.
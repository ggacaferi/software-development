/*
 *   Copyright (c) 2025
 *   All rights reserved.
 */

/**
 * Prevents your Battlesnake from colliding with itself by filtering out moves that would go into its own neck.
 * @param {Object} gameState - The current game state.
 * @param {Object} gameState.you - Your snake object.
 * @param {Array<{x: number, y: number}>} gameState.you.body - Array of your snake's body segments, head first.
 * @returns {Array<string>} Array of safe moves ("up", "down", "left", "right").
 */

export function preventSelfCollision(gameState) {
  const myBody = gameState.you.body;
  const myHead = myBody[0];
  const myNeck = myBody[1];

  const possibleMoves = ["up", "down", "left", "right"];
  const safeMoves = possibleMoves.filter((move) => {
    switch (move) {
      case "up":
        return !(myNeck && myHead.x === myNeck.x && myHead.y + 1 === myNeck.y);
      case "down":
        return !(myNeck && myHead.x === myNeck.x && myHead.y - 1 === myNeck.y);
      case "left":
        return !(myNeck && myHead.x - 1 === myNeck.x && myHead.y === myNeck.y);
      case "right":
        return !(myNeck && myHead.x + 1 === myNeck.x && myHead.y === myNeck.y);
      default:
        return true;
    }
  });

  return safeMoves;
}

/**
 * Prevents your Battlesnake from colliding with other snakes by marking moves as unsafe if another snake's body is adjacent.
 * @param {Object} gameState - The current game state.
 * @param {Object} gameState.board - The board object.
 * @param {Array<Object>} gameState.board.snakes - Array of all snake objects on the board.
 * @param {Object} isMoveSafe - An object with keys 'up', 'down', 'left', 'right' indicating safe moves (will be mutated).
 * @returns {Object} The updated isMoveSafe object.
 */

export function preventOtherSnakeCollision(gameState, isMoveSafe) {
  const opponents = gameState.board.snakes;
  const myHead = gameState.you.body[0];

  opponents.forEach((snake) => {
    snake.body.forEach((segment) => {
      if (myHead.x === segment.x && myHead.y + 1 === segment.y) {
        isMoveSafe.up = false;
      }
      if (myHead.x === segment.x && myHead.y - 1 === segment.y) {
        isMoveSafe.down = false;
      }
      if (myHead.x - 1 === segment.x && myHead.y === segment.y) {
        isMoveSafe.left = false;
      }
      if (myHead.x + 1 === segment.x && myHead.y === segment.y) {
        isMoveSafe.right = false;
      }
    });
  });

  return isMoveSafe;
}

/**
 * Prevents your Battlesnake from colliding with the walls by marking moves as unsafe if they would go out of bounds.
 * @param {Object} gameState - The current game state.
 * @param {Object} gameState.board - The board object.
 * @param {number} gameState.board.width - The width of the board.
 * @param {number} gameState.board.height - The height of the board.
 * @param {Object} isMoveSafe - An object with keys 'up', 'down', 'left', 'right' indicating safe moves (will be mutated).
 * @returns {Object} The updated isMoveSafe object.
 */

export function preventWallCollision(gameState, isMoveSafe) {
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  const myHead = gameState.you.body[0];

  if (myHead.x === 0) isMoveSafe.left = false;
  if (myHead.x === boardWidth - 1) isMoveSafe.right = false;
  if (myHead.y === 0) isMoveSafe.down = false;
  if (myHead.y === boardHeight - 1) isMoveSafe.up = false;

  return isMoveSafe;
}

/**
 * Finds and prioritizes the closest food using Manhattan distance, returning the direction to move towards it if safe.
 * @param {Object} gameState - The current game state.
 * @param {Object} gameState.you - Your snake object.
 * @param {Array<{x: number, y: number}>} gameState.you.body - Array of your snake's body segments, head first.
 * @param {Object} gameState.board - The board object.
 * @param {Array<{x: number, y: number}>} gameState.board.food - Array of food positions.
 * @param {Object} isMoveSafe - An object with keys 'up', 'down', 'left', 'right' indicating safe moves.
 * @returns {string|null} The direction to the closest food ("up", "down", "left", "right"), or null if no safe move towards food.
 */

export function findClosestFood(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const food = gameState.board.food;

  if (food.length === 0) return null;

  let closestFood = null;
  let minDistance = Infinity;

  food.forEach((foodItem) => {
    const distance = Math.abs(myHead.x - foodItem.x) + Math.abs(myHead.y - foodItem.y);
    if (distance < minDistance) {
      minDistance = distance;
      closestFood = foodItem;
    }
  });

  const dx = closestFood.x - myHead.x;
  const dy = closestFood.y - myHead.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    if (dx < 0 && isMoveSafe.left) return "left";
    if (dx > 0 && isMoveSafe.right) return "right";
    if (dy < 0 && isMoveSafe.down) return "down";
    if (dy > 0 && isMoveSafe.up) return "up";
  } else {
    if (dy < 0 && isMoveSafe.down) return "down";
    if (dy > 0 && isMoveSafe.up) return "up";
    if (dx < 0 && isMoveSafe.left) return "left";
    if (dx > 0 && isMoveSafe.right) return "right";
  }

  return null;
}

/**
 * Allows moving into another snake's tail if no food is present, by marking those moves as safe.
 * @param {Object} gameState - The current game state.
 * @param {Object} gameState.board - The board object.
 * @param {Array<Object>} gameState.board.snakes - Array of all snake objects on the board.
 * @param {Array<{x: number, y: number}>} gameState.board.food - Array of food positions.
 * @param {Object} gameState.you - Your snake object.
 * @param {Array<{x: number, y: number}>} gameState.you.body - Array of your snake's body segments, head first.
 * @param {Object} isMoveSafe - An object with keys 'up', 'down', 'left', 'right' indicating safe moves (will be mutated).
 * @returns {Object} The updated isMoveSafe object.
 */

export function allowTailCollision(gameState, isMoveSafe) {
  const opponents = gameState.board.snakes;
  const myHead = gameState.you.body[0];

  if (gameState.board.food.length === 0) {
    opponents.forEach((snake) => {
      const tail = snake.body[snake.body.length - 1];
      if (myHead.x === tail.x && myHead.y + 1 === tail.y) {
        isMoveSafe.up = true;
      }
      if (myHead.x === tail.x && myHead.y - 1 === tail.y) {
        isMoveSafe.down = true;
      }
      if (myHead.x - 1 === tail.x && myHead.y === tail.y) {
        isMoveSafe.left = true;
      }
      if (myHead.x + 1 === tail.x && myHead.y === tail.y) {
        isMoveSafe.right = true;
      }
    });
  }

  return isMoveSafe;
}

/**
 * Finds the closest smaller snake and returns the direction to move towards its head, if the move is safe.
 *
 * @param {Object} gameState - The current game state.
 * @param {Object} gameState.board - The board object.
 * @param {Array<Object>} gameState.board.snakes - Array of all snake objects on the board.
 * @param {Object} isMoveSafe - An object with keys 'up', 'down', 'left', 'right' indicating safe moves.
 * @param {number} myLength - The length of your snake.
 * @returns {string|null} The direction ("up", "down", "left", "right") to the closest smaller snake, or null if none found or no safe move.
 */

export function findSmallestSnakeToHunt(gameState, isMoveSafe, myLength) {
  const opponents = gameState.board.snakes;

  // Look for snakes smaller than yours
  const smallerSnakes = opponents.filter(snake => snake.length < myLength);
  if (smallerSnakes.length === 0) return null;

  // Find the closest smaller snake
  let closestSnake = null;
  let minDistance = Infinity;
    const myHead = gameState.you.body[0];

  smallerSnakes.forEach(snake => {
    const enemyHead = snake.body[0];
    const distance = Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
    if (distance < minDistance) {
      minDistance = distance;
      closestSnake = enemyHead;
    }
  });

  // Move towards the closest smaller snake
  const dx = closestSnake.x - myHead.x;
  const dy = closestSnake.y - myHead.y;
  if (Math.abs(dx) >= Math.abs(dy)) {
    if (dx < 0 && isMoveSafe.left) return "left";
    if (dx > 0 && isMoveSafe.right) return "right";
  } else {
    if (dy < 0 && isMoveSafe.down) return "down";
    if (dy > 0 && isMoveSafe.up) return "up";
  }

  return null;
}

/**
 * Heuristic evaluation function for a Battlesnake game state.
 * Returns a score: higher is better for your snake.
 * Factors: distance to food, distance to walls, distance to smaller snakes, health, and available safe moves.
 * @param {Object} gameState - The current game state.
 * @param {Object} isMoveSafe - An object with keys 'up', 'down', 'left', 'right' indicating safe moves.
 * @returns {number} Heuristic score for the current state.
 */
export function evaluateGameState(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const myLength = gameState.you.length;
  const health = gameState.you.health;
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  const food = gameState.board.food;
  const opponents = gameState.board.snakes;

  // Distance to closest food
  let minFoodDist = Infinity;
  if (food.length > 0) {
    for (const f of food) {
      const dist = Math.abs(myHead.x - f.x) + Math.abs(myHead.y - f.y);
      if (dist < minFoodDist) minFoodDist = dist;
    }
  } else {
    minFoodDist = 0;
  }

  // Distance to closest wall
  const distToLeft = myHead.x;
  const distToRight = boardWidth - 1 - myHead.x;
  const distToBottom = myHead.y;
  const distToTop = boardHeight - 1 - myHead.y;
  const minWallDist = Math.min(distToLeft, distToRight, distToBottom, distToTop);

  // Distance to closest smaller snake
  let minSmallerSnakeDist = Infinity;
  for (const snake of opponents) {
    if (snake.id !== gameState.you.id && snake.length < myLength) {
      const enemyHead = snake.body[0];
      const dist = Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
      if (dist < minSmallerSnakeDist) minSmallerSnakeDist = dist;
    }
  }
  if (minSmallerSnakeDist === Infinity) minSmallerSnakeDist = 0;

  // Number of safe moves
  const safeMoveCount = Object.values(isMoveSafe).filter(Boolean).length;

  // Weighted sum (tune weights as needed)
  const score =
    (100 - minFoodDist * 5) +           // Prefer closer food
    (minWallDist * 2) +                 // Prefer being away from walls
    (50 - minSmallerSnakeDist * 3) +    // Prefer being close to smaller snakes (for hunting)
    (health * 2) +                      // Prefer higher health
    (safeMoveCount * 10);               // Prefer more safe moves

  return score;
}

/**
 * Simulates moving in a given direction and returns the new game state.
 * Only updates your snake's head and body, and health. Does not handle food eating or opponent moves.
 * @param {Object} gameState - The current game state.
 * @param {string} move - The move to simulate ("up", "down", "left", "right").
 * @returns {Object} The new game state after the move.
 */
function simulateMove(gameState, move) {
  const dx = { left: -1, right: 1, up: 0, down: 0 }[move];
  const dy = { left: 0, right: 0, up: 1, down: -1 }[move];
  const newHead = {
    x: gameState.you.body[0].x + dx,
    y: gameState.you.body[0].y + dy,
  };
  // Copy game state deeply enough for our needs
  const newGameState = JSON.parse(JSON.stringify(gameState));
  newGameState.you.body.unshift(newHead);
  newGameState.you.body.pop(); // Assume not eating food for now
  newGameState.you.health = Math.max(0, newGameState.you.health - 1);
  return newGameState;
}

/**
 * Looks ahead one move using the heuristic and picks the best move.
 * @param {Object} gameState - The current game state.
 * @returns {string|null} The best move ("up", "down", "left", "right") or null if none safe.
 */
export function chooseBestMoveWithLookahead(gameState) {
  // Get safe moves
  let isMoveSafe = { up: true, down: true, left: true, right: true };
  isMoveSafe = preventWallCollision(gameState, isMoveSafe);
  isMoveSafe = preventOtherSnakeCollision(gameState, isMoveSafe);
  isMoveSafe = allowTailCollision(gameState, isMoveSafe);

  const possibleMoves = Object.entries(isMoveSafe)
    .filter(([_, safe]) => safe)
    .map(([move]) => move);

  if (possibleMoves.length === 0) return null;

  let bestMove = null;
  let bestScore = -Infinity;

  for (const move of possibleMoves) {
    const nextState = simulateMove(gameState, move);

    // Recompute safe moves for the simulated state
    let nextIsMoveSafe = { up: true, down: true, left: true, right: true };
    nextIsMoveSafe = preventWallCollision(nextState, nextIsMoveSafe);
    nextIsMoveSafe = preventOtherSnakeCollision(nextState, nextIsMoveSafe);
    nextIsMoveSafe = allowTailCollision(nextState, nextIsMoveSafe);

    const score = evaluateGameState(nextState, nextIsMoveSafe);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
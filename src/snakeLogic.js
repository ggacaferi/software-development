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
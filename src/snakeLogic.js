/*
 *   Copyright (c) 2025
 *   All rights reserved.
 */

// Prevent your Battlesnake from colliding with itself
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

// Prevent your Battlesnake from colliding with other snakes
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

// Prevent your Battlesnake from colliding with walls
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

// Find and prioritize the closest food using Manhattan distance
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

// Allow moving into another snake's tail if no food is present
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
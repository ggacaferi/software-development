/*
 *   Copyright (c) 2025
 *   All rights reserved.
 */

// Prevent your Battlesnake from colliding with itself
export function preventSelfCollision(gameState) {
  const myBody = gameState.you.body;
  const myHead = myBody[0];
  const myNeck = myBody[1];

  // Remove the neck from possible moves to prevent self-collision
  const possibleMoves = ["up", "down", "left", "right"];
  const safeMoves = possibleMoves.filter((move) => {
    switch (move) {
      case "up":
        return !(myHead.x === myNeck.x && myHead.y - 1 === myNeck.y);
      case "down":
        return !(myHead.x === myNeck.x && myHead.y + 1 === myNeck.y);
      case "left":
        return !(myHead.x - 1 === myNeck.x && myHead.y === myNeck.y);
      case "right":
        return !(myHead.x + 1 === myNeck.x && myHead.y === myNeck.y);
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

  // Check for other snakes' bodies
  opponents.forEach((snake) => {
    // Ignore your own snake
    if (snake.id !== gameState.you.id) {
      snake.body.forEach((segment) => {
        // Check each segment of the opponent snake's body
        if (myHead.x === segment.x && myHead.y === segment.y) {
          // If the head of your snake collides with another snake's body, mark the move as unsafe
          if (myHead.y > segment.y) isMoveSafe.down = false;
          if (myHead.y < segment.y) isMoveSafe.up = false;
          if (myHead.x > segment.x) isMoveSafe.left = false;
          if (myHead.x < segment.x) isMoveSafe.right = false;
        }
      });
    }
  });
}

// Function to prevent wall collisions
export function preventWallCollision(gameState, isMoveSafe) {
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  const myHead = gameState.you.body[0];

  // Remove the wall from possible moves to prevent wall-collision
  isMoveSafe.up = !(myHead.y === 0);
  isMoveSafe.down = !(myHead.y === boardHeight - 1);
  isMoveSafe.left = !(myHead.x === 0);
  isMoveSafe.right = !(myHead.x === boardWidth - 1);
}

// Find and prioritize the closest food using Manhattan distance
export function findClosestFood(gameState, isMoveSafe) {
    const myHead = gameState.you.body[0];
    const food = gameState.board.food;
    
    if (food.length === 0) return null;

    // Find the closest food using Manhattan distance
    let closestFood = null;
    let minDistance = Infinity;

    food.forEach(foodItem => {
        const distance = Math.abs(myHead.x - foodItem.x) + Math.abs(myHead.y - foodItem.y);
        if (distance < minDistance) {
            minDistance = distance;
            closestFood = foodItem;
        }
    });

    // Determine which moves bring us closer to the food
    const preferredMoves = [];
    if (closestFood.x < myHead.x && isMoveSafe.left) {
        preferredMoves.push("left");
    } else if (closestFood.x > myHead.x && isMoveSafe.right) {
        preferredMoves.push("right");
    }

    if (closestFood.y < myHead.y && isMoveSafe.down) {
        preferredMoves.push("down");
    } else if (closestFood.y > myHead.y && isMoveSafe.up) {
        preferredMoves.push("up");
    }

    // If no direct moves toward food are safe, return null
    if (preferredMoves.length === 0) return null;

    // Return a random move from the preferred moves to add some unpredictability
    return preferredMoves[Math.floor(Math.random() * preferredMoves.length)];
}

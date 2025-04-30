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

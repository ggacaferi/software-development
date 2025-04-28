/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
// Prevent your Battlesnake from colliding with itself

function preventSelfCollision(gameState) {
    const myBody = gameState.you.body;
    const myHead = myBody[0];
    const myNeck = myBody[1];

    // Remove the neck from possible moves to prevent self-collision
    const possibleMoves = ["up", "down", "left", "right"];
    const safeMoves = possibleMoves.filter(move => {
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

export { preventSelfCollision };

function preventWallCollision(gameState, isMoveSafe) {
    const myHead = gameState.you.body[0];
    const boardWidth = gameState.board.width;
    const boardHeight = gameState.board.height;

    // Check if moving up would go out of bounds
    if (myHead.y + 1 >= boardHeight) {
        isMoveSafe.up = false;
    }

    // Check if moving down would go out of bounds
    if (myHead.y - 1 < 0) {
        isMoveSafe.down = false;
    }

    // Check if moving left would go out of bounds
    if (myHead.x - 1 < 0) {
        isMoveSafe.left = false;
    }

    // Check if moving right would go out of bounds
    if (myHead.x + 1 >= boardWidth) {
        isMoveSafe.right = false;
    }
}

export { preventSelfCollision, preventWallCollision };
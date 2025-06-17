/*
 *   Copyright (c) 2025
 *   All rights reserved.
 */

// Rename this file to snake-logic.js

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
      case "up": {
        return !(myNeck && myHead.x === myNeck.x && myHead.y + 1 === myNeck.y);
      }
      case "down": {
        return !(myNeck && myHead.x === myNeck.x && myHead.y - 1 === myNeck.y);
      }
      case "left": {
        return !(myNeck && myHead.x - 1 === myNeck.x && myHead.y === myNeck.y);
      }
      case "right": {
        return !(myNeck && myHead.x + 1 === myNeck.x && myHead.y === myNeck.y);
      }
      default: {
        return true;
      }
    }
  });

  return safeMoves;
}

/**
 * Checks if a segment is adjacent to the head and marks the corresponding move as unsafe
 * @param {Object} myHead - The head position of your snake
 * @param {Object} segment - The body segment to check for collision
 * @param {Object} isMoveSafe - Object tracking safe moves
 */
function checkSegmentCollision(myHead, segment, isMoveSafe) {
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
}

/**
 * Prevents your Battlesnake from colliding with other snakes by marking moves as unsafe if another snake's body is adjacent.
 * @param {Object} gameState - The current game state.
 * @param {Object} gameState.board - The board object.
 * @param {Array<Object>} gameState.board.snakes - Array of all snake objects on the board.
 * @param {Object} isMoveSafe - An object with keys 'up', 'down', 'left', 'right' indicating safe moves (will be mutated).
 * @returns {Object} The updated isMoveSafe object.
 * */
export function preventOtherSnakeCollision(gameState, isMoveSafe) {
  const opponents = gameState.board.snakes;
  const myHead = gameState.you.body[0];

  for (const snake of opponents) {
    for (const segment of snake.body) {
      checkSegmentCollision(myHead, segment, isMoveSafe);
    }
  }

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
 * Calculates the Manhattan distance between two points.
 * @param {Object} point1 - First point with x and y coordinates.
 * @param {Object} point2 - Second point with x and y coordinates.
 * @returns {number} The Manhattan distance between the points.
 */
function getManhattanDistance(point1, point2) {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

/**
 * Finds the closest food item to the head.
 * @param {Object} myHead - The head position of the snake.
 * @param {Array} food - Array of food positions.
 * */
function getClosestFoodItem(myHead, food) {
  if (food.length === 0) return null;
  
  let closestFood = food[0];
  let minDistance = getManhattanDistance(myHead, food[0]);
  
  for (let index = 1; index < food.length; index++) {
    const distance = getManhattanDistance(myHead, food[index]);
    if (distance < minDistance) {
      minDistance = distance;
      closestFood = food[index];
    }
  }
  
  return closestFood;
}

/**
 * Checks if a horizontal move is safe and appropriate based on direction.
 * @param {number} dx - X-axis difference between head and target.
 * @param {Object} isMoveSafe - Object indicating which moves are safe.
 * @returns {string|null} The horizontal direction to move or null.
 */
function getHorizontalMove(dx, isMoveSafe) {
  if (dx < 0 && isMoveSafe.left) return "left";
  if (dx > 0 && isMoveSafe.right) return "right";
  return null;
}

/**
 * Checks if a vertical move is safe and appropriate based on direction.
 * @param {number} dy - Y-axis difference between head and target.
 * @param {Object} isMoveSafe - Object indicating which moves are safe.
 * @returns {string|null} The vertical direction to move or null.
 */
function getVerticalMove(dy, isMoveSafe) {
  if (dy < 0 && isMoveSafe.down) return "down";
  if (dy > 0 && isMoveSafe.up) return "up";
  return null;
}

/**
 * Determines the best move direction toward a target.
 * @param {Object} myHead - The head position of the snake.
 * @param {Object} target - The target position to move toward.
 * @param {Object} isMoveSafe - An object with keys indicating safe moves.
 * @returns {string|null} The direction to move or null if no safe move exists.
 */
function getDirectionToTarget(myHead, target, isMoveSafe) {
  const dx = target.x - myHead.x;
  const dy = target.y - myHead.y;
  
  // Determine if we should prioritize horizontal or vertical movement
  const prioritizeHorizontal = Math.abs(dx) >= Math.abs(dy);
  
  // Try primary direction first, then secondary
  const move = prioritizeHorizontal
    ? getHorizontalMove(dx, isMoveSafe) || getVerticalMove(dy, isMoveSafe)
    : getVerticalMove(dy, isMoveSafe) || getHorizontalMove(dx, isMoveSafe);
  
  return move;
}

/**
 * Finds and prioritizes the closest food using Manhattan distance, returning the direction to move towards it if safe.
 * @param {Object} gameState - The current game state.
 * @param {Object} gameState.you - Your snake object.
 * @param {Array<{x: number, y: number}>} gameState.you.body - Array of your snake's body segments, head first.
 * @param {Object} gameState.board - The board object.
 * @param {Array<{x: number, y: number}>} gameState.board.food - Array of food positions.
 * @param {Object} isMoveSafe - An object with keys 'up', 'down', 'left', 'right' indicating safe moves.
 * */

export function findClosestFood(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const closestFood = getClosestFoodItem(myHead, gameState.board.food);
  
  if (!closestFood) return null;
  
  return getDirectionToTarget(myHead, closestFood, isMoveSafe);
}


/**
 * Checks if a move would result in collision with a tail and marks it safe if so
 * @param {Object} myHead - The head position of your snake
 * @param {Object} tail - The tail position to check against
 * @param {Object} isMoveSafe - Object tracking safe moves
 */
function checkTailCollision(myHead, tail, isMoveSafe) {
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
}

/**
 * Adjusts the move safety by allowing tail collisions when no food is on the board.
 * 
 * @param {Object} gameState - The current state of the game
 * @param {Object} gameState.board - The game board information
 * @param {Array} gameState.board.snakes - Array of all snakes in the game
 * @param {Array} gameState.board.food - Array of all food items on the board
 * @param {Object} gameState.you - Your snake's information
 * @param {Array} gameState.you.body - Array of coordinates for your snake's body parts
 * @param {Object} isMoveSafe - Object containing safety status for possible moves
 * @returns {Object} The updated isMoveSafe object
 */
export function allowTailCollision(gameState, isMoveSafe) {
  const opponents = gameState.board.snakes;
  const myHead = gameState.you.body[0];

  if (gameState.board.food.length === 0) {
    for (const snake of opponents) {
      const tail = snake.body.at(-1);
      checkTailCollision(myHead, tail, isMoveSafe);
    }
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
 * */

/**
 * Finds the closest smaller snake head
 * @param {Array<Object>} smallerSnakes - Array of snakes smaller than current snake
 * @param {Object} myHead - Position of my snake's head
 * @returns {Object|null} The head of the closest smaller snake, or null
 */
function findClosestSmallerSnake(smallerSnakes, myHead) {
  let closestSnake = null;
  let minDistance = Infinity;
  
  for (const snake of smallerSnakes) {
    const enemyHead = snake.body[0];
    const distance = getManhattanDistance(myHead, enemyHead);
    if (distance < minDistance) {
      minDistance = distance;
      closestSnake = enemyHead;
    }
  }
  
  return closestSnake;
}

export function findSmallestSnakeToHunt(gameState, isMoveSafe, myLength) {
  const opponents = gameState.board.snakes;
  const myHead = gameState.you.body[0];

  // Look for snakes smaller than yours
  const smallerSnakes = opponents.filter(snake => snake.length < myLength);
  if (smallerSnakes.length === 0) return null;

  // Find the closest smaller snake
  const closestSnake = findClosestSmallerSnake(smallerSnakes, myHead);
  if (!closestSnake) return null;
  
  // Move towards the closest smaller snake
  return getDirectionToTarget(myHead, closestSnake, isMoveSafe);
}

/**
 * Heuristic evaluation function for a Battlesnake game state.
 * Returns a score: higher is better for your snake.
 * Factors: distance to food, distance to walls, distance to smaller snakes, health, and available safe moves.
 * @param {Object} gameState - The current game state.
 * @param {Object} isMoveSafe - An object with keys 'up', 'down', 'left', 'right' indicating safe moves.
 **/

export function evaluateGameState(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const myLength = gameState.you.length;
  const health = gameState.you.health;
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  const food = gameState.board.food;
  const opponents = gameState.board.snakes;

  // Distance to closest food
  let minFoodDistribution = Infinity;
  if (food.length > 0) {
    for (const f of food) {
      const distribution = Math.abs(myHead.x - f.x) + Math.abs(myHead.y - f.y);
      if (distribution < minFoodDistribution) minFoodDistribution = distribution;
    }
  } else {
    minFoodDistribution = 0;
  }

  // Distance to closest wall
  const distributionToLeft = myHead.x;
  const distributionToRight = boardWidth - 1 - myHead.x;
  const distributionToBottom = myHead.y;
  const distributionToTop = boardHeight - 1 - myHead.y;
  const minWallDistribution = Math.min(distributionToLeft, distributionToRight, distributionToBottom, distributionToTop);

  // Distance to closest smaller snake
  let minSmallerSnakeDistribution = Infinity;
  for (const snake of opponents) {
    if (snake.id !== gameState.you.id && snake.length < myLength) {
      const enemyHead = snake.body[0];
      const distribution = Math.abs(myHead.x - enemyHead.x) + Math.abs(myHead.y - enemyHead.y);
      if (distribution < minSmallerSnakeDistribution) minSmallerSnakeDistribution = distribution;
    }
  }
  if (minSmallerSnakeDistribution === Infinity) minSmallerSnakeDistribution = 0;

  // Number of safe moves
  const safeMoveCount = Object.values(isMoveSafe).filter(Boolean).length;

  // Weighted sum (tune weights as needed)
  const score =
    (100 - minFoodDistribution * 5) +           // Prefer closer food
    (minWallDistribution * 2) +                 // Prefer being away from walls
    (50 - minSmallerSnakeDistribution * 3) +    // Prefer being close to smaller snakes (for hunting)
    (health * 2) +                      // Prefer higher health
    (safeMoveCount * 10);               // Prefer more safe moves

  return score;
}

/**
 * Simulates moving in a given direction and returns the new game state.
 * Only updates your snake's head and body, and health. Does not handle food eating or opponent moves.
 * @param {Object} gameState - The current game state.
 * @param {string} move - The move to simulate ("up", "down", "left", "right").
 */
function simulateMove(gameState, move) {
  const dx = { left: -1, right: 1, up: 0, down: 0 }[move];
  const dy = { left: 0, right: 0, up: 1, down: -1 }[move];
  const newHead = {
    x: gameState.you.body[0].x + dx,
    y: gameState.you.body[0].y + dy,
  };
  // Copy game state deeply enough for our needs
  const newGameState = structuredClone(gameState);
  newGameState.you.body.unshift(newHead);
  newGameState.you.body.pop(); // Assume not eating food for now
  newGameState.you.health = Math.max(0, newGameState.you.health - 1);
  return newGameState;
}

/**
 * Looks ahead one move using the heuristic and picks the best move.
 * @param {Object} gameState - The current game state.
 */
export function chooseBestMoveWithLookahead(gameState) {
  // Get safe moves
  let isMoveSafe = { up: true, down: true, left: true, right: true };
  isMoveSafe = preventWallCollision(gameState, isMoveSafe);
  isMoveSafe = preventOtherSnakeCollision(gameState, isMoveSafe);
  isMoveSafe = allowTailCollision(gameState, isMoveSafe);

  const possibleMoves = Object.entries(isMoveSafe)
    .filter(([, safe]) => safe)
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
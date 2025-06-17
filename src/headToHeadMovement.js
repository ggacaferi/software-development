/**
 * Updates the isMoveSafe object to mark moves as unsafe if a head-to-head collision
 * with an equal or longer enemy snake is possible in any direction.
 *
 * @param {Object} gameState - The current game state.
 * @param {Object} gameState.you - Your snake object.
 * @param {Array<{x: number, y: number}>} gameState.you.body - Array of your snake's body segments, head first.
 * @param {number} gameState.you.length - The length of your snake.
 * @param {Object} gameState.board - The board object.
 * @param {Array<Object>} gameState.board.snakes - Array of all snake objects on the board.
 * @param {Object} isMoveSafe - An object with keys 'up', 'down', 'left', 'right' indicating safe moves (will be mutated).
 */

export function headToHeadMovement(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0]; // Your snake's head position
  const myLength = gameState.you.length; // Your snake's length
  
  checkEnemyCollisionPossibilities(gameState, myHead, myLength, isMoveSafe);
}

/**
 * Checks if enemy snakes could potentially cause head-to-head collisions
 * @param {Object} gameState - The current game state
 * @param {Object} myHead - Your snake's head position
 * @param {number} myLength - Your snake's length
 * @param {Object} isMoveSafe - Safe moves object to update
 */
function checkEnemyCollisionPossibilities(gameState, myHead, myLength, isMoveSafe) {
  const opponents = gameState.board.snakes; // All snakes on the board

  for (const enemy of opponents) {
    if (enemy.id === gameState.you.id) {
      continue; // Skip your own snake
    }

    const enemyHead = enemy.body[0]; // Enemy's head
    const enemyLength = enemy.length;
    
    checkPossibleCollision(myHead, myLength, enemyHead, enemyLength, isMoveSafe);
  }
}

/**
 * Evaluates possible head-to-head collisions in each direction
 * @param {Object} myHead - Your snake's head position
 * @param {number} myLength - Your snake's length
 * @param {Object} enemyHead - Enemy snake's head position
 * @param {number} enemyLength - Enemy snake's length
 * @param {Object} isMoveSafe - Safe moves object to update
 */
function checkPossibleCollision(myHead, myLength, enemyHead, enemyLength, isMoveSafe) {
  // Define potential collision points and their corresponding directions
  const collisionChecks = [
    { x: myHead.x, y: myHead.y + 1, direction: 'up' },
    { x: myHead.x, y: myHead.y - 1, direction: 'down' },
    { x: myHead.x - 1, y: myHead.y, direction: 'left' },
    { x: myHead.x + 1, y: myHead.y, direction: 'right' }
  ];
  
  // Check each potential collision point
  for (const check of collisionChecks) {
    if (enemyHead.x === check.x && enemyHead.y === check.y) {
      evaluateCollisionRisk(myLength, enemyLength, isMoveSafe, check.direction);
    }
  }
}

/**
 * Determines if a move is unsafe based on snake lengths
 * @param {number} myLength - Your snake's length
 * @param {number} enemyLength - Enemy snake's length
 * @param {Object} isMoveSafe - Safe moves object to update
 * @param {string} direction - The direction to evaluate
 */
function evaluateCollisionRisk(myLength, enemyLength, isMoveSafe, direction) {
  if (myLength <= enemyLength) {
    isMoveSafe[direction] = false;
  }
  // Otherwise it's safe to move because we're longer
}

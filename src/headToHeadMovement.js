// Exported function to prevent risky head-to-head collisions
export function headToHeadMovement(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0]; // Your snake's head position
  const myLength = gameState.you.length; // Your snake's length
  const opponents = gameState.board.snakes; // All snakes on the board

  for (const enemy of opponents) {
    if (enemy.id === gameState.you.id) continue; // Skip your own snake

    const enemyHead = enemy.body[0]; // Ensure this is the enemy's head
    const enemyLength = enemy.length;

    // Check for head-to-head collision in all directions
    if (enemyHead.x === myHead.x && enemyHead.y === myHead.y + 1) {
      // Enemy is above (y increases upward)
      if (myLength <= enemyLength) isMoveSafe.up = false;
    }
    if (enemyHead.x === myHead.x && enemyHead.y === myHead.y - 1) {
      // Enemy is below
      if (myLength <= enemyLength) isMoveSafe.down = false;
    }
    if (enemyHead.x === myHead.x - 1 && enemyHead.y === myHead.y) {
      // Enemy is to the left
      if (myLength <= enemyLength) isMoveSafe.left = false;
    }
    if (enemyHead.x === myHead.x + 1 && enemyHead.y === myHead.y) {
      // Enemy is to the right
      if (myLength <= enemyLength) isMoveSafe.right = false;
    }
  }
}

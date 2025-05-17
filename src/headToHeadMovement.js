// Exported function to prevent risky head-to-head collisions
export function headToHeadMovement(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0]; // Your snake's head position
  const myLength = gameState.you.length; // Your snake's length
  const opponents = gameState.board.snakes; // All snakes on the board

  for (const enemy of opponents) {
    if (enemy.id === gameState.you.id) continue; // Skip your own snake

    const enemyHead = enemy.body[0];
    const enemyLength = enemy.length;

    // All possible next moves for the enemy snake's head
    const possibleEnemyMoves = [
      { x: enemyHead.x + 1, y: enemyHead.y }, // Right
      { x: enemyHead.x - 1, y: enemyHead.y }, // Left
      { x: enemyHead.x, y: enemyHead.y + 1 }, // Up
      { x: enemyHead.x, y: enemyHead.y - 1 }, // Down
    ];

    // For each possible enemy head move, check if it could collide with us
    for (const move of possibleEnemyMoves) {
      if (
        move.x === myHead.x + 1 &&
        move.y === myHead.y &&
        myLength <= enemyLength
      ) {
        isMoveSafe.right = false; // Dangerous to move right
      }
      if (
        move.x === myHead.x - 1 &&
        move.y === myHead.y &&
        myLength <= enemyLength
      ) {
        isMoveSafe.left = false; // Dangerous to move left
      }
      if (
        move.x === myHead.x &&
        move.y === myHead.y + 1 &&
        myLength <= enemyLength
      ) {
        isMoveSafe.up = false; // Dangerous to move up
      }
      if (
        move.x === myHead.x &&
        move.y === myHead.y - 1 &&
        myLength <= enemyLength
      ) {
        isMoveSafe.down = false; // Dangerous to move down
      }
    }
  }
}

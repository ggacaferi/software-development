// Export the function so it can be used in other files
export function printBoard(gameState) {
  // Get the dimensions of the board
  const width = gameState.board.width;
  const height = gameState.board.height;

  // Initialize an empty board filled with '.' (dots) to represent empty spaces
  let board = Array.from({ length: height }, () => Array(width).fill('.'));

  // Place food items on the board
  for (const food of gameState.board.food) {
    // Flip the Y-axis because Battlesnake's (0,0) is bottom-left,
    // but arrays print top-down (row 0 is the top)
    board[height - 1 - food.y][food.x] = 'F';
  }

  // Place all snakes (your snake and opponents) on the board
  for (const snake of gameState.board.snakes) {
    // Check if the snake is yours
    const isMe = (snake.id === gameState.you.id);

    // Go through each segment of the snake's body
    snake.body.forEach((segment, index) => {
      // Decide what symbol to use
      const symbol = isMe 
        ? (index === 0 ? 'H' : 'S')  // Your head is 'H', body is 'S'
        : (index === 0 ? 'h' : 'E'); // Enemy head is 'h', body is 'E'

      // Again, flip the Y-axis when placing on the board
      board[height - 1 - segment.y][segment.x] = symbol;
    });
  }

  // Print the board row by row
  console.log("BOARD:");
  for (const row of board) {
    console.log(row.join(' ')); // Join each row array into a string with spaces between cells
  }
}

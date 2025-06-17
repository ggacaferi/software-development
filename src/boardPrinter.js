/**
 * Prints a visual representation of the Battlesnake board to the console.
 *
 * - Your snake's head is shown as 'H', body as 'S'.
 * - Enemy snakes' heads are 'h', bodies are 'E'.
 * - Food is shown as 'F'.
 * - Empty spaces are '.'.
 *
 * @param {Object} gameState - The current game state, including board, food, and snakes.
 * @param {Object} gameState.board - The board object containing width, height, food, and snakes.
 * @param {number} gameState.board.width - The width of the board.
 * @param {number} gameState.board.height - The height of the board.
 * @param {Array<Object>} gameState.board.food - Array of food positions, each with x and y.
 * @param {Array<Object>} gameState.board.snakes - Array of snake objects on the board.
 * @param {Object} gameState.you - The player's snake object (used to distinguish your snake).
 */

export function printBoard(gameState) {
  // Get the dimensions of the board
  const width = gameState.board.width;
  const height = gameState.board.height;

  // Initialize an empty board filled with '.' (dots) to represent empty spaces
  let board = Array.from({ length: height }, () => new Array(width).fill("."));

  // Place food items on the board
  for (const food of gameState.board.food) {
    // Flip the Y-axis because Battlesnake's (0,0) is bottom-left,
    // but arrays print top-down (row 0 is the top)
    board[height - 1 - food.y][food.x] = "F";
  }

  // Place all snakes (your snake and opponents) on the board
  for (const snake of gameState.board.snakes) {
    // Check if the snake is yours
    const isMe = snake.id === gameState.you.id;

    // Go through each segment of the snake's body
    for (let [index, segment] of snake.body.entries()) {
      // Decide what symbol to use
      let symbol;
      if (isMe) {
        symbol = index === 0 ? "H" : "S"; // Your head is 'H', body is 'S'
      } else {
        symbol = index === 0 ? "h" : "E"; // Enemy head is 'h', body is 'E'
      }

      // Again, flip the Y-axis when placing on the board
      board[height - 1 - segment.y][segment.x] = symbol;
    }
  }

  // Print the board row by row
  console.log("BOARD:");
  for (const row of board) {
    console.log(row.join(" ")); // Join each row array into a string with spaces between cells
  }
}

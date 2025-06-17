/*
 * Copyright (c) 2025
 * All rights reserved.
 */

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

export function floodFill(startPos, boardState, maxIterations = null) {
    const { width, height, map } = boardState;
    const visited = Array(height).fill(null).map(() => Array(width).fill(false));
    const queue = [];
    let area = 0;

    // Dynamically set maxIterations based on map size if not provided
    if (!maxIterations) {
        maxIterations = Math.min(width * height, 1000); // Cap iterations for large maps
    }

    // Check if starting position is out of bounds or blocked
    if (startPos.x < 0 || startPos.x >= width ||
        startPos.y < 0 || startPos.y >= height ||
        map[startPos.y][startPos.x] === 1) {
        return 0;
    }

    queue.push(startPos);
    visited[startPos.y][startPos.x] = true;

    const directions = [
        { x: 0, y: 1 },  // up
        { x: 0, y: -1 }, // down
        { x: -1, y: 0 }, // left
        { x: 1, y: 0 }   // right
    ];

    while (queue.length > 0 && area < maxIterations) {
        const current = queue.shift();
        area++;

        for (const dir of directions) {
            const newX = current.x + dir.x;
            const newY = current.y + dir.y;

            // Check boundaries
            if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                // Check if not visited and not blocked
                if (!visited[newY][newX] && map[newY][newX] !== 1) {
                    visited[newY][newX] = true;
                    queue.push({ x: newX, y: newY });
                }
            }
        }
    }

    return area;
}
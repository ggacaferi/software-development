/*
 * Copyright (c) 2025
 * All rights reserved.
 */

export function floodFill(startPos, boardState, maxIterations = 1000) {
    const { width, height, map } = boardState;
    const visited = Array(height).fill(null).map(() => Array(width).fill(false));
    const queue = [];
    let area = 0;

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
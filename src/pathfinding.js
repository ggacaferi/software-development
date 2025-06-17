// A* Algorithm Implementation

export function aStar(start, goal, gameState) {
  const openSet = [start];
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  const directions = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  const { width, height, map } = gameState;

  gScore[`${start.x},${start.y}`] = 0;
  fScore[`${start.x},${start.y}`] = heuristic(start, goal);

  while (openSet.length > 0) {
    let current = openSet.reduce((a, b) => fScore[`${a.x},${a.y}`] < fScore[`${b.x},${b.y}`] ? a : b);
    openSet.splice(openSet.indexOf(current), 1);

    if (current.x === goal.x && current.y === goal.y) {
      let path = [];
      while (cameFrom[`${current.x},${current.y}`]) {
        path.unshift(current);
        current = cameFrom[`${current.x},${current.y}`];
      }
      return path;
    }

    for (const dir of directions) {
      const neighbor = { x: current.x + dir.x, y: current.y + dir.y };

      if (neighbor.x >= 0 && neighbor.x < width && neighbor.y >= 0 && neighbor.y < height && map[neighbor.y][neighbor.x] !== 1) {
        const tentativeGScore = gScore[`${current.x},${current.y}`] + 1;

        if (!gScore[`${neighbor.x},${neighbor.y}`] || tentativeGScore < gScore[`${neighbor.x},${neighbor.y}`]) {
          cameFrom[`${neighbor.x},${neighbor.y}`] = current;
          gScore[`${neighbor.x},${neighbor.y}`] = tentativeGScore;
          fScore[`${neighbor.x},${neighbor.y}`] = gScore[`${neighbor.x},${neighbor.y}`] + heuristic(neighbor, goal);

          if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
            openSet.push(neighbor);
          }
        }
      }
    }
  }

  return [];
}

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
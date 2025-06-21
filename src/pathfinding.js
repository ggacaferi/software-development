// A* Algorithm Implementation

export function aStar(start, goal, gameState) {
  const openSet = [start];
  const closedSet = new Set();
  const cameFrom = {};
  const gScore = {};
  const fScore = {};
  const { width, height, map } = gameState;
  const directions = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  initializeScores(start, goal, gScore, fScore);

  while (openSet.length > 0) {
    let current = findNodeWithLowestFScore(openSet, fScore);
    openSet.splice(openSet.indexOf(current), 1);

    // Add to closed set
    closedSet.add(`${current.x},${current.y}`);

    if (isGoalReached(current, goal)) {
      return reconstructPath(current, cameFrom);
    }

    for (const dir of directions) {
      const neighbor = { x: current.x + dir.x, y: current.y + dir.y };
      const neighborKey = `${neighbor.x},${neighbor.y}`;
      if (
        isValidNeighbor(neighbor, width, height, map) &&
        !closedSet.has(neighborKey)
      ) {
        updateNeighborScores(current, neighbor, goal, openSet, cameFrom, gScore, fScore);
      }
    }
  }

  return [];
}

function initializeScores(start, goal, gScore, fScore) {
  const key = `${start.x},${start.y}`;
  gScore[key] = 0;
  fScore[key] = heuristic(start, goal);
}

function findNodeWithLowestFScore(openSet, fScore) {
  return openSet.reduce((a, b) => 
    fScore[`${a.x},${a.y}`] < fScore[`${b.x},${b.y}`] ? a : b
  );
}

function isGoalReached(current, goal) {
  return current.x === goal.x && current.y === goal.y;
}

function reconstructPath(current, cameFrom) {
  let path = [];
  while (cameFrom[`${current.x},${current.y}`]) {
    path.unshift(current);
    current = cameFrom[`${current.x},${current.y}`];
  }
  return path;
}

function processNeighbors(current, goal, openSet, cameFrom, gScore, fScore, directions, width, height, map) {
  for (const dir of directions) {
    const neighbor = { x: current.x + dir.x, y: current.y + dir.y };
    
    if (isValidNeighbor(neighbor, width, height, map)) {
      updateNeighborScores(current, neighbor, goal, openSet, cameFrom, gScore, fScore);
    }
  }
}

function isValidNeighbor(neighbor, width, height, map) {
  return neighbor.x >= 0 && neighbor.x < width && 
         neighbor.y >= 0 && neighbor.y < height && 
         map[neighbor.y][neighbor.x] !== 1;
}

function updateNeighborScores(current, neighbor, goal, openSet, cameFrom, gScore, fScore) {
  const currentKey = `${current.x},${current.y}`;
  const neighborKey = `${neighbor.x},${neighbor.y}`;
  const tentativeGScore = gScore[currentKey] + 1;

  if (!gScore[neighborKey] || tentativeGScore < gScore[neighborKey]) {
    cameFrom[neighborKey] = current;
    gScore[neighborKey] = tentativeGScore;
    fScore[neighborKey] = gScore[neighborKey] + heuristic(neighbor, goal);

    if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
      openSet.push(neighbor);
    }
  }
}

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
export {
  initializeScores,
  findNodeWithLowestFScore,
  isGoalReached,
  reconstructPath,
  processNeighbors
};
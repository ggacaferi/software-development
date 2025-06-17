/*
 *   Copyright (c) 2025
 *   All rights reserved.
 */
// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com


import runServer from './server.js';
import { preventSelfCollision, preventWallCollision, preventOtherSnakeCollision, findClosestFood, allowTailCollision, findSmallestSnakeToHunt, findClosestSmallerSnake} from './snakeLogic.js';
import { printBoard } from './boardPrinter.js';
import { headToHeadMovement } from './headToHeadMovement.js';
import { aStar } from './pathfinding.js'; // Import the A* function



/**
 * Returns Battlesnake info for play.battlesnake.com (appearance and author).
 * @returns {Object} Info object with apiversion, author, color, head, and tail.
 */

function info() {
  return {
    apiversion: "1",
    author: "mouzounis",
    color: "#FF46A2",
    head: "all-seeing",
    tail: "mlh-gene",
  };
}


/**
 * Called when your Battlesnake is starting a game.
 * @param {Object} gameState - The initial game state.
 */
function start(gameState) {
  console.log("Starting game", gameState);
}

/**
 * Called when your Battlesnake's game has ended.
 * @param {Object} gameState - The final game state.
 */
function end(gameState) {
  console.log("Game over", gameState);
}


/**
 * Decides the next move for your Battlesnake.
 * @param {Object} gameState - The current game state.
 * @param {Object} gameState.you - Your snake object.
 * @param {Array<{x: number, y: number}>} gameState.you.body - Array of your snake's body segments, head first.
 * @param {Object} gameState.board - The board object.
 * @param {Array<Object>} gameState.board.snakes - Array of all snake objects on the board.
 * @param {Array<{x: number, y: number}>} gameState.board.food - Array of food positions.
 * @param {number} gameState.turn - The current turn number.
 * @returns {{move: string}} The chosen move direction.
 */


/**
 * Gets the next move direction based on the current position and next step
 * @param {Object} myHead - The head position of the snake
 * @param {Object} nextStep - The next position to move to
 * @returns {string} The direction to move
 */
function getDirectionToTarget(myHead, nextStep) {
  if (nextStep.x < myHead.x) return "left";
  if (nextStep.x > myHead.x) return "right";
  if (nextStep.y < myHead.y) return "down";
  return "up";
}

/**
 * Determines target for the snake based on game conditions
 * @param {Object} gameState - The current game state
 * @param {Object} isMoveSafe - Object containing safe move directions
 * @returns {Object} The target position
 */
function determineTarget(gameState, isMoveSafe) {
  const smallerSnakeMove = findSmallestSnakeToHunt(gameState, isMoveSafe, gameState.you.length);
  if (smallerSnakeMove) {
    return findClosestSmallerSnake(gameState);
  }
  return findClosestFood(gameState, isMoveSafe);
}

function move(gameState) {
  printBoard(gameState);

  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  const myHead = gameState.you.body[0];
  const target = determineTarget(gameState, isMoveSafe);
  
  if (target) {
    const path = aStar(myHead, target, gameState.board);
    
    if (path.length > 0 && path[1]) {
      return { move: getDirectionToTarget(myHead, path[1]) };
    }
  }

  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
  return { move: nextMove };
}


// Start the server with the specified handlers
runServer({
  info: info,
  start: start,
  move: move,
  end: end,
});

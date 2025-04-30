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
import { preventSelfCollision, preventWallCollision, preventOtherSnakeCollision, findClosestFood } from './snakeLogic.js';
import { printBoard } from './boardPrinter.js';
import { preventHeadToHead } from './headToHeadMovement.js';

// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
function info() {
  return {
    apiversion: "1",
    author: "", // TODO: Your Battlesnake Username
    color: "#888888", // TODO: Choose color
    head: "default", // TODO: Choose head
    tail: "default", // TODO: Choose tail
    author: "mouzounis",
    color: "#FF46A2",
    head: "all-seeing",
    tail: "mlh-gene",
  };
}

// start is called when your Battlesnake is starting a game
function start(gameState) {
  console.log("Starting game", gameState);
}

// end is called when your Battlesnake's game has ended
function end(gameState) {
  console.log("Game over", gameState);
}

function move(gameState) {
  // Print the current board state for debugging
  printBoard(gameState);

  // Initialize all directions as safe
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  // Prevent moving directly backwards into your own neck
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {
    isMoveSafe.left = false;
  } else if (myNeck.x > myHead.x) {
    isMoveSafe.right = false;
  } else if (myNeck.y < myHead.y) {
    isMoveSafe.down = false;
  } else if (myNeck.y > myHead.y) {
    isMoveSafe.up = false;
  }

  if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
    isMoveSafe.left = false;
  } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
    isMoveSafe.right = false;
  } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
    isMoveSafe.down = false;
  } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
    isMoveSafe.up = false;
  }

  // Prevent your Battlesnake from colliding with itself
  preventSelfCollision(gameState, isMoveSafe);

  // Prevent your Battlesnake from colliding with walls
  preventWallCollision(gameState, isMoveSafe);

  // Prevent your Battlesnake from colliding with other snakes
  preventOtherSnakeCollision(gameState, isMoveSafe);

  // Prevents head-to-head collisions by marking moves unsafe if an enemy of equal or greater length could contest the same square.
  preventHeadToHead(gameState, isMoveSafe);

  // Try to find food if health is low or just generally
  const foodMove = findClosestFood(gameState, isMoveSafe);
  if (foodMove) {
    console.log(`MOVE ${gameState.turn}: Moving towards food - ${foodMove}`);
    return { move: foodMove };
  }

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  console.log(`MOVE ${gameState.turn}: ${nextMove}`)
  return { move: nextMove };
}

// Start the server with the specified handlers
runServer({
  info: info,
  start: start,
  move: move,
  end: end
});
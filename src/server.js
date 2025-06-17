import express from "express";

/**
 * Starts the Battlesnake server and sets up the API endpoints.
 *
 * @param {Object} handlers - An object containing handler functions for the Battlesnake API.
 * @param {Function} handlers.info - Returns Battlesnake info for the root endpoint.
 * @param {Function} handlers.start - Called when a new game starts.
 * @param {Function} handlers.move - Called on every turn to determine the next move.
 * @param {Function} handlers.end - Called when the game ends.
 */

export default function runServer(handlers) {
  const app = express();
  app.use(express.json());

  app.get("/", (request, respont) => {
    respont.send(handlers.info());
  });

  app.post("/start", (request, respont) => {
    handlers.start(request.body);
    respont.send("ok");
  });

  app.post("/move", (request, respont) => {
    respont.send(handlers.move(request.body));
  });

  app.post("/end", (request, respont) => {
    handlers.end(request.body);
    respont.send("ok");
  });

  app.use(function (request, respont, next) {
    respont.set("Server", "battlesnake/replit/starter-snake-javascript");
    next();
  });

  const host = "0.0.0.0";
  const port = process.env.PORT || 8000;

  app.listen(port, host, () => {
    console.log(`Running Battlesnake at http://${host}:${port}...`);
  });
}

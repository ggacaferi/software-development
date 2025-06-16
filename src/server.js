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

  app.get("/", (req, res) => {
    res.send(handlers.info());
  });

  app.post("/start", (req, res) => {
    handlers.start(req.body);
    res.send("ok");
  });

  app.post("/move", (req, res) => {
    res.send(handlers.move(req.body));
  });

  app.post("/end", (req, res) => {
    handlers.end(req.body);
    res.send("ok");
  });

  app.use(function (req, res, next) {
    res.set("Server", "battlesnake/replit/starter-snake-javascript");
    next();
  });

  const host = "0.0.0.0";
  const port = process.env.PORT || 8000;

  app.listen(port, host, () => {
    console.log(`Running Battlesnake at http://${host}:${port}...`);
  });
}

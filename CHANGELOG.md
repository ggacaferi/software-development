# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Set up ESLint for linting and added .gitignore for node_modules (#32)
- Export preventSelfCollision function for external use
- Implement wall collision prevention logic in snake movement
- Add wall collision prevention logic to game state

### Changed
- Integrated self-collision avoidance in game logic
- Refactored collision detection logic for opponent snakes

### Fixed
- Boundary checks to prevent Battlesnake from moving out of bounds

## [0.2.0] - 2025-04-15

### Added
- Created pull request template
- Separated game logic into snakeLogic.js
- Self-collision avoidance logic
- Collision detection with opponent snakes

### Changed
- Updated Battlesnake configuration settings

## [0.1.0] - 2025-03-20

### Added
- Initial project commit
- Basic collision detection for Battlesnake's body segments
- Boundary checks implementation

### Fixed
- Initial collision detection implementation
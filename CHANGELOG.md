# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-05-20

### Added
- Add floodFill function and corresponding tests for various scenarios
- Add jest configuration file for testing setup
- Added testing capabilities
- Add tail collision logic to allow movement into tails if no food is present
- Add printBoard function for debugging game state visualization

### Changed
- Refactor floodFill tests and fix findClosestFood test case
- Refactored test cases to reach 69% coverage
- Formatted code in head-to-head movement and snake-logic
- Refactor collision detection logic and allow movement into enemy tails when no food is present

### Fixed
- Fix typos in the index.js file
- Fix test to expect 'up' as the closest food direction in snake logic

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

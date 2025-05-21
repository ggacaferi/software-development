import { floodFill } from '../src/floodFill.js';

describe('floodFill', () => {
    // Test 1: Simple open space
    it('should count all cells in an open area', () => {
        const boardState = {
            width: 3,
            height: 3,
            map: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        };
        const startPos = { x: 1, y: 1 };
        expect(floodFill(startPos, boardState)).toBe(9);
    });

    // Test 2: Fully blocked board
    it('should return 1 for starting position when completely blocked', () => {
        const boardState = {
            width: 3,
            height: 3,
            map: [
                [1, 1, 1],
                [1, 0, 1],
                [1, 1, 1]
            ]
        };
        const startPos = { x: 1, y: 1 };
        expect(floodFill(startPos, boardState)).toBe(1);
    });

    // Test 3: Edge starting position
    it('should work correctly when starting at board edge', () => {
        const boardState = {
            width: 3,
            height: 3,
            map: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        };
        const startPos = { x: 0, y: 0 };
        expect(floodFill(startPos, boardState)).toBe(9);
    });

    // Test 4: Complex maze-like pattern
    it('should correctly navigate maze-like patterns', () => {
        const boardState = {
            width: 5,
            height: 5,
            map: [
                [0, 1, 0, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 0, 1, 0],
                [1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0]
            ]
        };
        const startPos = { x: 0, y: 0 };
        expect(floodFill(startPos, boardState)).toBe(18);
    });

    // Test 5: Maximum iterations limit
    it('should respect max iterations parameter', () => {
        const size = 10;
        const boardState = {
            width: size,
            height: size,
            map: Array(size).fill(null).map(() => Array(size).fill(0))
        };
        const startPos = { x: 5, y: 5 };
        expect(floodFill(startPos, boardState, 50)).toBe(50);
    });

    // Test 6: Starting on blocked cell
    it('should return 0 when starting on blocked cell', () => {
        const boardState = {
            width: 3,
            height: 3,
            map: [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ]
        };
        const startPos = { x: 1, y: 1 };
        expect(floodFill(startPos, boardState)).toBe(0);
    });

    // Test 7: Out of bounds starting position
    it('should return 0 for out of bounds starting position', () => {
        const boardState = {
            width: 3,
            height: 3,
            map: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]
        };
        const startPos = { x: -1, y: -1 };
        expect(floodFill(startPos, boardState)).toBe(0);
    });

    // Test 8: Narrow path
    it('should correctly count narrow path spaces', () => {
        const boardState = {
            width: 5,
            height: 1,
            map: [
                [0, 0, 0, 0, 0]
            ]
        };
        const startPos = { x: 2, y: 0 };
        expect(floodFill(startPos, boardState)).toBe(5);
    });

    // Test 9: Performance with large open area
    it('should handle large open areas within iteration limit', () => {
        const size = 20;
        const boardState = {
            width: size,
            height: size,
            map: Array(size).fill(null).map(() => Array(size).fill(0))
        };
        const startPos = { x: 10, y: 10 };
        expect(floodFill(startPos, boardState, 1000)).toBe(400);
    });
});

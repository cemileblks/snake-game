// export function wait(ms = 0) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }
  
//   export function randomElementFromArray(arr) {
//     const element = arr[Math.floor(Math.random() * arr.length)];
//     return element;
//   }

import { getInputDirection } from "./input.js";

export const snakeSpeed = 2;
const snakeBody = [{ x: 9, y: 9 }];
let newSegments = 0;


export function update() { 
    addSegment();
    const inputDirection = getInputDirection();
   for (let i = snakeBody.length - 2; i >=0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
   }
   snakeBody[0].x += inputDirection.x;
   snakeBody[0].y += inputDirection.y;
};

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
};


export function expandSnake(amount) {
    newSegments += amount;
};


export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPostions(segment, position);
    });
};

export function getSnakeHead() {
    return snakeBody[0];
};

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true});
}

function equalPostions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
};

function addSegment() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1]});
    };

    newSegments = 0;
}
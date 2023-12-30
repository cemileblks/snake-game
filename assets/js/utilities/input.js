import { snakeBody } from "./snake.js";
const keysContainer = document.getElementById('keys-container');
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

keysContainer.addEventListener('click', handleButtonClick);

window.addEventListener('keydown', handleKeyDown);

function handleButtonClick(event) {
    const buttonId = event.target.id;
    if (snakeBody.length < 2) {
        handleInputSmallSnake(buttonId);
    }
    handleInput(buttonId);
}

function handleKeyDown(event) {
    switch (event.key) {
        case "ArrowUp":
            if (snakeBody.length < 2) {
                handleInputSmallSnake("up-btn");
                break;
            }
            handleInput("up-btn");
            break;
        case "ArrowDown":
            if (snakeBody.length < 2) {
                handleInputSmallSnake("down-btn");
                break;
            }
            handleInput("down-btn");
            break;
        case "ArrowLeft":
            if (snakeBody.length < 2) {
                handleInputSmallSnake("left-btn");
                break;
            }
            handleInput("left-btn");
            break;
        case "ArrowRight":
            if (snakeBody.length < 2) {
                handleInputSmallSnake("right-btn");
                break;
            }
            handleInput("right-btn");
            break;
        default:
            break;
    }
}

function handleInput(buttonId) {
    switch (buttonId) {
        case "up-btn":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case "down-btn":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case "left-btn":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case "right-btn":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 };
            break;
        default:
            break;
    }
}
function handleInputSmallSnake(buttonId) {
    switch (buttonId) {
        case "up-btn":
            inputDirection = { x: 0, y: -1 };
            break;
        case "down-btn":
            inputDirection = { x: 0, y: 1 };
            break;
        case "left-btn":
            inputDirection = { x: -1, y: 0 };
            break;
        case "right-btn":
            inputDirection = { x: 1, y: 0 };
            break;
        default:
            break;
    }
}

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}
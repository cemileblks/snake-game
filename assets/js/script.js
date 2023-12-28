// import { randomElementFromArray, wait } from "./utilities/utils.js";

// const foodItemsArray = [
//     "🐁",
//     "🍇",
//     "🍉",
//     "🍈",
//     "🍓",
//     "🍍",
//     "🍌",
//     "🥝",
//     "🍏",
//     "🍎",
//     "🍔",
//     "🍅",
//     "🥚",
// ];
// console.log(foodItemsArray);

// // Main elements of the game
// const gameGrid = document.getElementById("game-grid");
// const scoreDisplay = document.querySelector("span");
// const startBtn = document.getElementById("start-btn");
// const keyBtns = document.querySelectorAll("#keys-container button");

// //variables of the game
// const width = 10;
// const numCells = width * width;
// gameGrid.style.width = `${width * 10 * 3}px`;
// gameGrid.style.height = `${width * 10 * 3}px`;

// //snake variables 
// let currentSnake = [2, 1, 0];
// let snakeColor = Math.floor(Math.random() * 360);
// let snakeColorIncrement = 8;

// let snakeDirection = 1;
// let intervalTime = 250;
// let interval = 0;

// // food variables
// let foodItemIndex = 0; // first cell
// let score = 0;

// //to create grig game for the game
// for (let i = 0; i < width * width; i++) {
//     const cell = document.createElement("div");
//     cell.style.width = `${width * 3}px`;
//     cell.style.height = `${width * 3}px`;
//     gameGrid.appendChild(cell);
// }
// const gameCells = document.querySelectorAll("#game-grid div");

// async function createFood() {
//     foodItemIndex = Math.floor(Math.random() * numCells);
//     if (currentSnake.includes(foodItemIndex)) {
//         await wait(100);
//         createFood();
//     } else {
//         gameCells[foodItemIndex].classList.add("food-item");
//         gameCells[foodItemIndex].innerText = randomElementFromArray(foodItemsArray);
//     }
// }

// function startGame() {
//     currentSnake = [2, 1, 0];
//     currentSnake.forEach((i) => {
//         snakeColor += snakeColorIncrement % 360;
//         gameCells[i].style.background = `hsl(${snakeColor}, 100%, 50%)`;
//         gameCells[i].classList.add("snake");
//     });
//     currentSnake.forEach((i) => {
//         gameCells[i].style.background = "none";
//         gameCells[i].classList.remove("snake");
//         gameCells[i].innerText = "";
//     });
//     clearInterval(interval);
//     snakeDirection = 1;

//     gameCells[foodItemIndex].classList.remove("food-item");
//     gameCells[foodItemIndex].innerText = "";
//     createFood();
//     score = 0;
//     scoreDisplay.innerHTML = score;

//     interval = setInterval(gameLoop, intervalTime);
// }

// startBtn.addEventListener("click", startGame);

// function gameLoop() {
//     gameCells[currentSnake[0]].innerText = "";
//     const tail = currentSnake.pop();
//     gameCells[tail].classList.remove("snake");
//     gameCells[tail].style.background = "none";
//     currentSnake.unshift(currentSnake[0] + snakeDirection); // gives direction to the head
//     // console.log(currentSnake);

//     if (gameCells[currentSnake[0]].classList.contains("food-item")) {
//         gameCells[currentSnake[0]].classList.remove("food-item");
//         gameCells[tail].classList.add("snake");
//         snakeColor += snakeColorIncrement % 360;
//         gameCells[tail].style.background = `hsl(${snakeColor}, 100%, 50%)`;
//         currentSnake.push(tail);
//         score++;
//         scoreDisplay.textContent = score;
//         createFood();
//     }

//     gameCells[currentSnake[0]].classList.add("snake");
//     gameCells[currentSnake[0]].innerText = "👀";
//     snakeColor += snakeColorIncrement % 360;
//     gameCells[currentSnake[0]].style.background = `hsl(${snakeColor}, 100%, 50%)`;

//     if (
//         (currentSnake[0] + width >= width * width && snakeDirection === width) || // hits bottom wall
//         (currentSnake[0] % width === width - 1 && snakeDirection === 1) || // hits right wall
//         (currentSnake[0] % width === 0 && snakeDirection === -1) || // hits left wall
//         (currentSnake[0] - width < 0 && snakeDirection === -width) || // hits the top wall
//         gameCells[currentSnake[0] + snakeDirection].classList.contains("snake") // hits itself
//     ) {
//         // grid.classList.add("shake");
//         clearInterval(interval);
//         return;
//     }
// }

// let moveSnake = function (moveDirection) {
//     let directionVal;
//     if (moveDirection === "ArrowRight" && snakeDirection !== -1) {
//         directionVal = 1;
//         if (currentSnake[0] + directionVal === currentSnake[1]) return;
//         snakeDirection = directionVal;
//     }
//     if (moveDirection === "ArrowLeft" && snakeDirection !== 1) {
//         directionVal = -1;
//         if (currentSnake[0] + directionVal === currentSnake[1]) return;
//         snakeDirection = directionVal;
//     }
//     if (moveDirection === "ArrowUp" && snakeDirection !== width) {
//         directionVal = -width;
//         if (currentSnake[0] + directionVal === currentSnake[1]) return;
//         snakeDirection = directionVal;
//     }
//     if (moveDirection === "ArrowDown" && snakeDirection !== -width) {
//         directionVal = width;
//         if (currentSnake[0] + directionVal === currentSnake[1]) return;
//         snakeDirection = directionVal;
//     }
// }

// let handleKeyMove = function(event) {
//     console.log(event);
//     if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key))
//         return;
//     moveSnake(event.key)
// }

// document.addEventListener("keydown", handleKeyMove);

import { update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection, snakeBody} from './utilities/utils.js';
import { update as updateFood, draw as drawFood } from "./utilities/food.js";
import { outsideGrid } from "./utilities/grid.js";

const startBtn = document.getElementById("start-btn");

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-grid")

// startBtn.addEventListener("click", startGame);

function main(currentTime) {
    if(gameOver){
        if(confirm("You lost. Press ok to restart!")) {
            window.location = '/';
        }
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;

    console.log("render");
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
};
function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
};


function checkDeath () {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
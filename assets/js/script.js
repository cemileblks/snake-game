import { randomElementFromArray, wait } from "./utilities/utils.js";

const foodItemsArray = [
    "🐁",
    "🍇",
    "🍉",
    "🍈",
    "🍓",
    "🍍",
    "🍌",
    "🥝",
    "🍏",
    "🍎",
    "🍔",
    "🍅",
    "🥚",
];
console.log(foodItemsArray);

// Main elements of the game
const gameGrid = document.getElementById("game-grid");
const scoreDisplay = document.querySelector("span");
const startBtn = document.getElementById("start-btn");
const keyBtns = document.querySelectorAll("#keys-container button");

//variables of the game
const width = 10;
const numCells = width * width;
gameGrid.style.width = `${width * 10 * 3}px`;
gameGrid.style.height = `${width * 10 * 3}px`;

//snake variables 
let currentSnake = [2, 1, 0];
let snakeColor = Math.floor(Math.random() * 360);
let snakeColorIncrement = 8;

let snakeDirection = 1;
let intervalTime = 200;
let interval = 0;

//to create grig game for the game
for (let i = 0; i < width * width; i++) {
    const cell = document.createElement("div");
    cell.style.width = `${width * 3}px`;
    cell.style.height = `${width * 3}px`;
    gameGrid.appendChild(cell);
}
const gameCells = document.querySelectorAll("#game-grid div");


function startGame() {
    currentSnake = [2, 1, 0];
    currentSnake.forEach((i) => {
        snakeColor += snakeColorIncrement % 360;
        gameCells[i].style.background = `hsl(${snakeColor}, 100%, 50%)`;
        gameCells[i].classList.add("snake");
    });
    currentSnake.forEach((i) => {
        gameCells[i].style.background = "none";
        gameCells[i].classList.remove("snake");
        gameCells[i].innerText = "";
    });
    clearInterval(interval);
    snakeDirection = 1;
    interval = setInterval(gameLoop, intervalTime);
}

startBtn.addEventListener("click", startGame);

function gameLoop() {
    gameCells[currentSnake[0]].innerText = "";
    const tail = currentSnake.pop();
    gameCells[tail].classList.remove("snake");
    gameCells[tail].style.background = "none";
    currentSnake.unshift(currentSnake[0] + snakeDirection); // gives direction to the head
    // console.log(currentSnake);

    gameCells[currentSnake[0]].classList.add("snake");
    gameCells[currentSnake[0]].innerText = "👀";
    snakeColor += snakeColorIncrement % 360;
    gameCells[currentSnake[0]].style.background = `hsl(${snakeColor}, 100%, 50%)`;

    if (
        (currentSnake[0] + width >= width * width && snakeDirection === width) || // hits bottom wall
        (currentSnake[0] % width === width - 1 && snakeDirection === 1) || // hits right wall
        (currentSnake[0] % width === 0 && snakeDirection === -1) || // hits left wall
        (currentSnake[0] - width < 0 && snakeDirection === -width) || // hits the top wall
        gameCells[currentSnake[0] + snakeDirection].classList.contains("snake") // hits itself
    ) {
        // grid.classList.add("shake");
        clearInterval(interval);
        return;
    }
}

let moveSnake = function (moveDirection) {
    let directionVal;
    if (moveDirection === "ArrowRight" && snakeDirection !== -1) {
        directionVal = 1;
        if (currentSnake[0] + directionVal === currentSnake[1]) return;
        snakeDirection = directionVal;
    }
    if (moveDirection === "ArrowLeft" && snakeDirection !== 1) {
        directionVal = -1;
        if (currentSnake[0] + directionVal === currentSnake[1]) return;
        snakeDirection = directionVal;
    }
    if (moveDirection === "ArrowUp" && snakeDirection !== width) {
        directionVal = -width;
        if (currentSnake[0] + directionVal === currentSnake[1]) return;
        snakeDirection = directionVal;
    }
    if (moveDirection === "ArrowDown" && snakeDirection !== -width) {
        directionVal = width;
        if (currentSnake[0] + directionVal === currentSnake[1]) return;
        snakeDirection = directionVal;
    }
}

document.addEventListener("keydown", function (event) {
    console.log(event);
    if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key))
        return;
    moveSnake(event.key)
});




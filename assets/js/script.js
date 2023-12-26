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

//to create grig cells for the game
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
  }
  
  startBtn.addEventListener("click", startGame);






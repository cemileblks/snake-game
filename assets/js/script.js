import { update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection, snakeBody} from './utilities/snake.js';
import { update as updateFood, draw as drawFood } from "./utilities/food.js";
import { outsideGrid } from "./utilities/grid.js";

const startBtn = document.getElementById("start-btn");

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-grid")

function main(currentTime) {
    if(gameOver){
        if(confirm("You lost. Press ok to restart!")) {
            location.reload();
        }
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;

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
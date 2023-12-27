import { onSnake, expandSnake } from "./utils.js";
import { randomGridPosition } from "./grid.js";
let food = getRandomFoodPosition();
const expansionRate = 1;


export function update() {
    if(onSnake(food)){
        expandSnake(expansionRate);
        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard) {

    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = food.y;
    snakeElement.style.gridColumnStart = food.x;
    snakeElement.classList.add('food');
    gameBoard.appendChild(snakeElement);
};


function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition();
    };
    return newFoodPosition;
};


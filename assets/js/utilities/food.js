import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";
let food = getRandomFoodPosition();
const expansionRate =2;
const scoreDisplay = document.querySelector("span");
const foodItem =  "🍎"
let score = 0;

export function update() {
    if(onSnake(food)){
        expandSnake(expansionRate);
        score += 3;
        scoreDisplay.innerHTML = score;
        food = getRandomFoodPosition();
    }
}

export function draw(gameBoard) {

    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = food.y;
    snakeElement.style.gridColumnStart = food.x;
    // const randomFood = getRandomElementFromArray(foodItemsArray);
    snakeElement.innerText = foodItem;
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


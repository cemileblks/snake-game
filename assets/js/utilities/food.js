import { onSnake, expandSnake } from "./utils.js";
import { randomGridPosition } from "./grid.js";
let food = getRandomFoodPosition();
const expansionRate = 1;

const foodItem =  "🍎"

  function getRandomElementFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

//   function createFood() {
//     foodItemIndex = Math.floor(Math.random() * numCells);
//     if (currentSnake.includes(foodItemIndex)) {
//       createFood();
//     } else {
//       cells[foodItemIndex].classList.add("food-item");
//       cells[foodItemIndex].innerText = randomElementFromArray(foodItemsArray);
//     }
//   }


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


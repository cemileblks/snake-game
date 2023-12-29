
const keysContainer = document.getElementById('keys-container');
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

keysContainer.addEventListener('click', handleButtonClick);

// window.addEventListener('keydown', handleKeyDown);

// // Touch events for mobile devices
// keysContainer.addEventListener('touchstart', handleTouchStart);
// keysContainer.addEventListener('touchend', handleTouchEnd);

// function handleButtonClick(event) {
//     const buttonId = event.target.id;
//     handleInput(buttonId);
// }

function handleKeyDown(event) {
    switch (event.key) {
        case "ArrowUp":
            handleInput("up-btn");
            break;
        case "ArrowDown":
            handleInput("down-btn");
            break;
        case "ArrowLeft":
            handleInput("left-btn");
            break;
        case "ArrowRight":
            handleInput("right-btn");
            break;
        default:
            break;
    }
}

function handleTouchStart(event) {
    const touchedElement = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
    const buttonId = touchedElement.id;
    if (buttonId) {
        event.preventDefault(); // Prevent scrolling on touch devices
        handleInput(buttonId);
    }
}

// function handleTouchEnd() {
//     inputDirection = { x: 0, y: 0 };
// }

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

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}
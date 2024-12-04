// Select canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let snake = [{ x: 200, y: 200 }];
let direction = { x: 20, y: 0 };
let food = { x: getRandomPosition(), y: getRandomPosition() };
let score = 0;
const boxSize = 20;

// Draw the snake
function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
        food = { x: getRandomPosition(), y: getRandomPosition() };
    } else {
        snake.pop();
    }
}

// Check collisions
function checkCollision() {
    const head = snake[0];

    // Check walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Get a random position for the food
function getRandomPosition() {
    return Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
}

// Main game loop
function gameLoop() {
    if (checkCollision()) {
        alert(`Game Over! Your final score is ${score}`);
        resetGame();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();
}

// Change direction based on key press
function changeDirection(event) {
    const keyPressed = event.key;

    const up = direction.y === 0 && keyPressed === "ArrowUp";
    const down = direction.y === 0 && keyPressed === "ArrowDown";
    const left = direction.x === 0 && keyPressed === "ArrowLeft";
    const right = direction.x === 0 && keyPressed === "ArrowRight";

    if (up) direction = { x: 0, y: -boxSize };
    if (down) direction = { x: 0, y: boxSize };
    if (left) direction = { x: -boxSize, y: 0 };
    if (right) direction = { x: boxSize, y: 0 };
}

// Reset the game
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 20, y: 0 };
    food = { x: getRandomPosition(), y: getRandomPosition() };
    score = 0;
    document.getElementById("score").textContent = "Score: 0";
}

// Event listener for keypress
document.addEventListener("keydown", changeDirection);

// Start the game loop
setInterval(gameLoop, 100);

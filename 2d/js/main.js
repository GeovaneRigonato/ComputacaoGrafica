let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

let snakeHeadUp = new Image();
snakeHeadUp.src = "/img/up.svg";
let snakeHeadDown = new Image();
snakeHeadDown.src = "/img/down.svg";
let snakeHeadLeft = new Image();
snakeHeadLeft.src = "/img/left.svg";
let snakeHeadRight = new Image();
snakeHeadRight.src = "/img/right.svg";

let snakeHeadImg = new Image();

let foodImg = new Image();
foodImg.src = "/img/maca.png";

let frameCount = 0;
const framesPerMove = 10;

let eatSound = document.getElementById("eatSound");
let gameOverSound = document.getElementById("gameOverSound");

function comerComida() {
    eatSound.play();
}

function gameOver() {
    gameOverSound.play();
}

function drawSnakeHead() {
    context.drawImage(snakeHeadImg, snake[0].x, snake[0].y, box, box);
}

function drawFoodImage() {
    context.drawImage(foodImg, food.x, food.y, box, box);
}

function criarBG() {
    context.fillStyle = "green";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    const radius = box / 2.4;

    for (i = 0; i < snake.length; i++) {
        if (i === 0) {
            context.fillStyle = "transparent";
            context.beginPath();
            context.arc(snake[i].x + box / 2, snake[i].y + box / 2, radius, 0, Math.PI * 2);
            context.fill();
        } else {
            context.fillStyle = "black";
            context.beginPath();
            context.arc(snake[i].x + box / 2, snake[i].y + box / 2, radius, 0, Math.PI * 2);
            context.fill();
        }
    }
}

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    frameCount++;

    if (frameCount >= framesPerMove) {
        frameCount = 0;

        if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
        if (snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
        if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
        if (snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

        for (i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                cancelAnimationFrame(gameAnimation);
                gameOver();
                return;
            }
        }

        criarBG();
        criarCobrinha();
        drawFoodImage();

        if (direction === "right") {
            snakeHeadImg = snakeHeadRight;
        } else if (direction === "left") {
            snakeHeadImg = snakeHeadLeft;
        } else if (direction === "up") {
            snakeHeadImg = snakeHeadUp;
        } else if (direction === "down") {
            snakeHeadImg = snakeHeadDown;
        }

        drawSnakeHead();

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction == "right") snakeX += box;
        if (direction == "left") snakeX -= box;
        if (direction == "up") snakeY -= box;
        if (direction == "down") snakeY += box;

        if (snakeX != food.x || snakeY != food.y) {
            snake.pop();
        } else {
            comerComida();

            food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        snake.unshift(newHead);
    }

    gameAnimation = requestAnimationFrame(iniciarJogo);
}

let gameAnimation = requestAnimationFrame(iniciarJogo);

document.addEventListener('keydown', update);

const scoreDisplay = document.getElementById("score");
const grid = document.querySelector('.grid');
for(let i = 0; i < 400; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}
const grids = document.querySelectorAll(".grid div");

let score;
let snakeInitial = [41, 42];
let newSnakeHead;
let direction;
let oldSnakeHead;
let alive;
let isApple = false;
let move;
let appleRandom;
let speed;
let turnAgain = true;

function snakeDisplay(snakeCurrent) {
    snakeCurrent.forEach(snake => 
        grids[snake].classList.add('snake-body'));
}
function appleDisplay() {
    if(appleRandom) {
        grids[appleRandom].classList.remove('apple');
    }
    generateApple();
    grids[appleRandom].classList.add('apple');
    // console.log(`apple: ${appleRandom}`);
}

function generateApple() {
    appleRandom = Math.floor(Math.random() * 400);
    if (snakeInitial.includes(appleRandom)) {
        generateApple();
    }
    return;
}

document.addEventListener("keydown", turn);

function turn(e) {
    if(turnAgain) {
        if(e.keyCode == 40 && direction !== 'up') {
            direction = 'down';
            turnAgain = false;
        } else if(e.keyCode == 37 && direction !== 'right') {
            direction = 'left';     
            turnAgain = false; 
        } else if(e.keyCode == 39 && direction !== 'left') {
            direction = 'right';
            turnAgain = false;
        } else if(e.keyCode == 38 && direction !== 'down') {
            direction = 'up';
            turnAgain = false;
        }
    }
}

function snakeMove() {
    snakeDisplay(snakeInitial);
    oldSnakeHead = snakeInitial[snakeInitial.length - 1];
    if(direction == 'right') {
        newSnakeHead = oldSnakeHead + 1;
        turnAgain = true;
    } else if(direction == 'down') {
        newSnakeHead = oldSnakeHead + 20;
        turnAgain = true;
    } else if(direction == 'left') {
        newSnakeHead = oldSnakeHead - 1;
        turnAgain = true;
    } else {
        newSnakeHead = oldSnakeHead - 20;
        turnAgain = true;
    }
    gameOver();
    if(alive) {
        snakeInitial.push(newSnakeHead);
        if(newSnakeHead == appleRandom) {
            eatApple();
        }
        if(!isApple) {
            let last = snakeInitial.shift();
            grids[last].classList.remove('snake-body');
        }
        snakeDisplay(snakeInitial);
        isApple = false;
    }
}

function gameOver() {
    //碰到墙
    if(oldSnakeHead % 20 == 19 || oldSnakeHead % 20 == 0  || newSnakeHead < 0 || newSnakeHead > 399) {
        clearInterval(move);
        console.log('game over');
        alert(`Game over! You have ${score} scores! You can try again!`)
        alive = false;
    } 
    //碰到自己
    console.log(snakeInitial, newSnakeHead,oldSnakeHead);
    if(snakeInitial.includes(newSnakeHead)) {
        clearInterval(move);
        alert(`Game over! You hit yourself. You have ${score} scores!`);
        alive = false;
    }
}

function eatApple() {
    isApple = true;
    appleDisplay();
    score++;
    scoreDisplay.innerText = score;
    snakeSpeed();
}
function snakeSpeed() {
    if(score <= 3) {
        speed = 1000;
    } else if (score > 3 && score < 6) {
        speed = 800;
    } else if (score <= 9) {
        speed = 600;
    } else {
        speed = 400;
    }
    clearInterval(move);
    move = setInterval(snakeMove, speed);
}

function start() {
    clearInterval(move);
    grids.forEach(grid => {
        if(grid.classList.contains('snake-body')) {
            grid.classList.remove('snake-body');
        }
    });
    direction = 'right';
    alive = true;
    snakeInitial = [41, 42];
    // for (let i = 0; i < 300; i++) {
    //     let j;
    //     snakeInitial.push(i);
    //     if(i % 20 == 19) {
    //         j = i + 20;
    //         for(j; j > i; j--) {
    //             snakeInitial.push(j);
    //         }
    //         i = j + 20;
    //     }
    // }
    // snakeInitial.push(320);
    // console.log(snakeInitial)
    score = 0;
    scoreDisplay.innerText = 0;
    speed = 1000;
    move = setInterval(snakeMove, speed);
    appleDisplay();
}


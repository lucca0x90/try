/*
const btn = document.querySelector('.btn');
btn.addEventListener("click", start); 

const stopbtn = document.querySelector(".stopbtn");
stopbtn.addEventListener("click", stop);

const timeLeft = document.getElementById("time-left");

const restart = document.querySelector(".restart");
restart.addEventListener("click", reStart);

const hardOne = document.querySelector(".hardOne");
const hardTwo = document.querySelector(".hardTwo");
const hardThree = document.querySelector(".hardThree");


let go;
let last;

let count = 60;
let setTimer;
let score = 0;
let difficultySelection = 1000;

function start() {
    if(count > 0) {
        if (difficultySelection === 1000) {
            alert('Level easy! You can chose the difficulty.');
            hardOne.setAttribute("disabled", true);
            hardThree.setAttribute("disabled", true);
            hardTwo.setAttribute("disabled", true);
        } else if( difficultySelection === 800) {
            alert('Level One');
            hardTwo.setAttribute("disabled", true);
            hardThree.setAttribute("disabled", true);
        } else if(difficultySelection === 600) {
            alert('Level Two');
            hardOne.setAttribute("disabled", true);
            hardThree.setAttribute("disabled", true);
        } else {
            hardOne.setAttribute("disabled", true);
            hardTwo.setAttribute("disabled", true);
        }
        suqareClick();
        go = setInterval(randomMole, difficultySelection);
        setTimer = setInterval(setTime, 1000);
    } else {
        alert('Time is out!')
    }
}

function stop() {
    clearInterval(go);
    clear();
    //clearTimeout(timeOut);
    clearInterval(setTimer);
}

function randomMole() {
    clear();
    var randomNum = Math.floor(Math.random() * 9 + 1);
    last = randomNum;
    document.getElementById(randomNum.toString()).classList.add("mole");
}

function clear() {
    if (typeof last === 'number') {
        document.getElementById(last.toString()).classList.remove("mole");
    }
}


function setTime() {
    count--;
    timeLeft.textContent = count;
    if(count == 0) {
        alert(`You get ${score} scores!`)
        stop()
    }
}

//每个square添加click,输出id值

const allSquare = document.querySelectorAll(".square");
function suqareClick() {
    for(let i = 0; i < 9; i++) {
        let square = allSquare[i];
        square.addEventListener("click", () => {
            if (i + 1 == last) {
                score = score + 1;
                console.log(score)
                document.getElementById('score').textContent = score;
            }
        })
    }
}


function reStart() {
    alert('Restart!');
    count = 60;
    score = 0;
    timeLeft.textContent = 60;
    document.getElementById('score').textContent = score;
    hardOne.removeAttribute("disabled");
    hardTwo.removeAttribute("disabled");
    hardThree.removeAttribute("disabled");
}
//调节难度

hardOne.addEventListener("click", function() {
    difficultySelection = 800;
    hardTwo.setAttribute('disabled', true);
    hardThree.setAttribute('disabled', true);
    alert('Let\'s start!');
})
hardTwo.addEventListener("click", function() {
    difficultySelection = 600;
    hardOne.setAttribute('disabled', true);
    hardThree.setAttribute('disabled', true);
    alert('Let\'s start!');
})
hardThree.addEventListener("click", function() {
    difficultySelection = 400;
    hardTwo.setAttribute('disabled', true);
    hardOne.setAttribute('disabled', true);
    alert('Let\'s start!');
})
*/

let squares = [];
let lastRandomId;
let score = 0;
let timeLeft = 60;

const btn = document.querySelector('.btn');
btn.addEventListener("click", start); 

const stopbtn = document.querySelector(".stopbtn");
stopbtn.addEventListener("click", stop);

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", restart);



let generateMole;

class Square {
    constructor(id) {
        this.id = id;
    }

    listenClick = () => {
        document.getElementById(this.id.toString()).addEventListener('click', this.handleClick)
    }

    handleClick = () => {
        if (lastRandomId === this.id) {
            document.getElementById('score').textContent = ++score;
        }
    }

    removeListener = () => {
        document.getElementById(this.id.toString()).removeEventListener('click', this.handleClick);
    }
}

function init() {
    for (let i = 1; i < 10; i++) {
        let square = new Square(i);
        squares.push(square);
    }
}

let difficultySelection = 1000;

const hardOne = document.querySelector(".hardOne");
const hardTwo = document.querySelector(".hardTwo");
const hardThree = document.querySelector(".hardThree");

hardOne.addEventListener("click", function() {
    difficultySelection = 800;
    hardTwo.setAttribute('disabled', true);
    hardThree.setAttribute('disabled', true);
    alert('Let\'s start!');
})
hardTwo.addEventListener("click", function() {
    difficultySelection = 600;
    hardOne.setAttribute('disabled', true);
    hardThree.setAttribute('disabled', true);
    alert('Let\'s start!');
})
hardThree.addEventListener("click", function() {
    difficultySelection = 400;
    hardTwo.setAttribute('disabled', true);
    hardOne.setAttribute('disabled', true);
    alert('Let\'s start!');
})

function start() {
    if(timeLeft > 0) {
        if (squares.length === 0) init();
        if (difficultySelection === 1000) {
            alert('Level easy! You can chose the difficulty.');
            hardOne.setAttribute("disabled", true);
            hardThree.setAttribute("disabled", true);
            hardTwo.setAttribute("disabled", true);
        } else if( difficultySelection === 800) {
            alert('Level One');
            hardTwo.setAttribute("disabled", true);
            hardThree.setAttribute("disabled", true);
        } else if(difficultySelection === 600) {
            alert('Level Two');
            hardOne.setAttribute("disabled", true);
            hardThree.setAttribute("disabled", true);
        } else {
            hardOne.setAttribute("disabled", true);
            hardTwo.setAttribute("disabled", true);
        }
        squares.forEach(square => {
            square.listenClick();
        });
        generateMole = setInterval(randomMole, difficultySelection);
        timeLeftCount = setInterval(timeOut, 1000);
        btn.setAttribute("disabled", true)
    } else {
        alert('Time is out!');
    }
}

function stop() {
    squares.forEach(square => {
        square.removeListener();
    });
    clearInterval(generateMole);
    clearInterval(timeLeftCount);
    btn.removeAttribute("disabled")
}

function restart() {
    score = 0;
    timeLeft = 60;
    difficultySelection = 1000;
    document.getElementById('score').textContent = score;
    document.getElementById("time-left").textContent = timeLeft;
    btn.removeAttribute("disabled")
    hardOne.removeAttribute("disabled");
    hardTwo.removeAttribute("disabled");
    hardThree.removeAttribute("disabled");
}

function randomMole() {
    clear();
    lastRandomId = Math.floor(Math.random() * 9 + 1);
    document.getElementById(lastRandomId.toString()).classList.add("mole");
}

function clear() {
    if (typeof lastRandomId === 'number') {
        document.getElementById(lastRandomId.toString()).classList.remove("mole");
    }
}

function timeOut() {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;
    if(timeLeft == 0) {
        stop();
        alert(`You have ${score} scores!`)
    }
}

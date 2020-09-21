const result = document.getElementById('result');
const timer = document.getElementById('timer');
const grid = document.querySelector('.grid');

for(let i = 0; i < 16; i++) {
    for(let j = 0; j < 11; j++) {
        let square = document.createElement('div');
        grid.appendChild(square);
    }
}
const grids= document.querySelectorAll('.grid div');

const destination = [0, 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 15];
const safe = [80, 160];
const river = [];
const road = [];
let frogger = [87];
let gameInterval;
let timeInterval;
let circleInterval;
let count = 60;

let riverWin = [];
let roadLose =[];
let winArr = [3, 6, 9, 12];

let circleArr = [];

for(let i = 1; i < 16; i++) {
    let s = 80+i;
    let ss = 160+i;
    safe.push(s,ss);
}
for(let i = 16; i < 80; i++) {
    river.push(i);
}
for(let i = 96; i < 160; i++) {
    road.push(i);
}

//speed : 正值-从左到右, 负值-从右到左
//game: 1-river, 2-road
class Item {
    constructor(s, arr, length, style, game) {
        this.speed = s;
        this.arr = arr;
        this.length = length;
        this.style = style;
        this.addTail = false;
        this.game = game;
    }
}


function generateItem(arr, style) {
    arr.forEach(a => grids[a].classList.add(style));
}
function removeItem(arr, style) {
    arr.forEach(a => grids[a].classList.remove(style));
}

function moveItem(item, line) {
    if(item.game === 1 || item.game === 3) {
        riverWin.push(...item.arr);
    } else if(item.game === 2) {
        roadLose.push(...item.arr);
    }

    if(item.game === 3) {
        circleArr.push(item.arr);
    }
    // randomC = Math.ceil(Math.random()*3);
    // randomArr = circleArr[randomC - 1];
    // console.log(circleArr);

    removeItem(item.arr, item.style);
    for(let i = 0; i < item.arr.length; i++) {
        item.arr[i] += item.speed;
    }
    if(item.speed > 0) {
        if(item.addTail) {
            for(let i = 0; i < item.speed; i++) {
                if(item.arr.length < item.length) {
                    let tail = item.arr[0] - 1;
                    item.arr.unshift(tail);
                }
            }
            if(item.arr.length === item.length) {
                item.addTail = false;
            }
        }
        if(item.arr.find(a => a >= 16*line)) {
            if(item.arr.length <= 1) {
                item.arr = [16 * (line-1)];
                item.addTail = true;
            } else {
                let turn = item.arr.findIndex(a => a >= 16*line);
                item.arr.splice(turn, item.arr.length);
                if(item.arr.length === 0) {
                    item.arr = [16 * (line-1)];
                    item.addTail = true;
                }
            }
        }
    }
    if(item.speed < 0) {
        if(item.addTail) {
            for(let i = 0; i < (-item.speed); i++) {
                if(item.arr.length < item.length) {
                    let tail = item.arr[item.arr.length - 1] + 1;
                    item.arr.push(tail);
                }
            }
            if(item.arr.length === item.length) {
                item.addTail = false;
            }
        }
        if(item.arr.find(a => a <= 16*(line-1))) {
            if(item.arr.length <= 1) {
                item.arr = [16*line - 1];
                item.addTail = true;
            } else {
                let turn = item.arr.findIndex(a => a >= 16*(line - 1));
                item.arr.splice(0, turn);
                if(item.arr.length === 0 || turn === -1) {
                    item.arr = [16*line - 1];
                    item.addTail = true;
                }
            }
        }
    }
    generateItem(item.arr, item.style);
}

const treeShortOne = new Item(2, [18, 19, 20, 21], 4, 'tree', 1);
const treeShortTwo = new Item(2, [27, 28, 29, 30], 4, 'tree', 1);
const dCircleOne = new Item(-1, [33, 34], 2, 'circle-red', 3);
const dCircleTwo = new Item(-1, [38, 39], 2, 'circle-red', 3);
const dCircleThree = new Item(-1, [44, 45], 2, 'circle-red', 3);
const treeLong = new Item(3, [48, 49, 50, 51, 52, 53], 6, 'tree', 1);
const tcircleOne = new Item(-3, [65, 66, 67], 3, 'circle-red', 1);
const tcircleTwo = new Item(-3, [74, 75, 76], 3, 'circle-red', 1);
const bCarOne = new Item(1, [96, 97], 2, 'car', 2);
const bCarTwo = new Item(1, [101, 102], 2, 'car', 2);
const bCarThree = new Item(1, [106, 107], 2, 'car', 2);
const fCar = new Item(4, [113], 1, 'car-fast', 2);
const lCarOne = new Item(1, [130, 131], 2, 'car-long', 2);
const lCarTwo = new Item(1, [137, 138], 2, 'car-long', 2);
const carOne = new Item(2, [147], 1, 'car', 2);
const carTwo = new Item(2, [151], 1, 'car', 2);
const carThree = new Item(2, [155], 1, 'car', 2);
const carFour = new Item(2, [159], 1, 'car', 2);
function init() {
    generateItem(destination, 'destination');
    generateItem(safe, 'safe');
    generateItem(river, 'river');
    generateItem(road, 'road');

    //river
    generateItem(treeShortOne.arr, 'tree');
    generateItem(treeShortTwo.arr, 'tree');

    generateItem(dCircleOne.arr, 'circle-red');
    generateItem(dCircleTwo.arr, 'circle-red');
    generateItem(dCircleThree.arr, 'circle-red');

    generateItem(treeLong.arr, 'tree');

    generateItem(tcircleOne.arr, 'circle-red');
    generateItem(tcircleTwo.arr, 'circle-red');

    //road
    generateItem(bCarOne.arr, 'car');
    generateItem(bCarTwo.arr, 'car');
    generateItem(bCarThree.arr, 'car');

    generateItem(fCar.arr, 'car-fast');

    generateItem(lCarOne.arr, 'car-long');
    generateItem(lCarTwo.arr, 'car-long');

    generateItem(carOne.arr, 'car');
    generateItem(carTwo.arr, 'car');
    generateItem(carThree.arr, 'car');
    generateItem(carFour.arr, 'car');
    fGenerate(frogger);
}


function move() {
    riverWin = [];
    roadLose = [];

    moveItem(treeShortOne, 2);
    moveItem(treeShortTwo, 2);
    
    moveItem(dCircleOne, 3);
    moveItem(dCircleTwo, 3);
    moveItem(dCircleThree, 3);
    
    moveItem(treeLong, 4);
    
    moveItem(tcircleOne, 5);
    moveItem(tcircleTwo, 5);
    
    moveItem(bCarOne, 7);
    moveItem(bCarTwo, 7);
    moveItem(bCarThree, 7);
    
    moveItem(fCar, 8);
    
    moveItem(lCarOne, 9);
    moveItem(lCarTwo, 9);
    
    moveItem(carOne, 10);
    moveItem(carTwo, 10);
    moveItem(carThree, 10);
    moveItem(carFour, 10);
}



function fGenerate(arr) {
    grids[arr[0]].setAttribute('id', 'frogger');
    //generateItem([166], 'frogger');    no display
}

function froggerMove(e) {
    switch(e.keyCode) {
        case 37:
            if(frogger[0] % 16 !== 0) {
                grids[frogger[0]].removeAttribute('id');
                frogger[0] = frogger[0] - 1;
                fGenerate(frogger);
            }
        break;
        case 38:
            if(frogger[0] > 15) {
                grids[frogger[0]].removeAttribute('id');
                frogger[0] = frogger[0] - 16;
                fGenerate(frogger);
            }
        break;
        case 39:
            if(frogger[0] % 16 !== 15) {
                grids[frogger[0]].removeAttribute('id');
                frogger[0] = frogger[0] + 1;
                fGenerate(frogger);
            }
        break;
        case 40:
            if(frogger[0] < 16*10) {
                grids[frogger[0]].removeAttribute('id');
                frogger[0] = frogger[0] + 16;
                fGenerate(frogger);
            }
        break;
    }
}

let randomC;
let randomArr = [];
function circleDisappear() {
    // console.log('start', circleArr )
    if(randomC) {
        for(let i = 0; i < randomArr.length; i++) {
            randomArr[i] += 1;
        }
        removeItem(randomArr, 'circle-green');
        // console.log('remove', randomArr, randomC)
        randomArr = [];
        for(let i = 31; i < 48; i++) {
            if(!grids[i].classList.contains('circle-red') && grids[i].classList.contains('circle-green')) {
                grids[i].classList.remove('circle-green');
                console.log('ok', grids[i], i)
            }
        }
    }

    randomC = Math.ceil(Math.random()*3);
    randomArr = circleArr[randomC - 1];
    generateItem(randomArr, 'circle-green');
    // console.log('gener', randomArr, randomC)
    circleArr = [];
}

function fRiverMove(arr) {
    grids[arr[0]].removeAttribute('id');
    let line = Math.floor(arr[0] / 16) + 1;

    switch(line) {
        case 5:
            arr[0] += -3;
            if(arr[0] <= 16*4) {
                arr[0] = 16*4;
            }
        break;
        case 4:
            arr[0] += 3;
            if(arr[0] >= 16*4) {
                arr[0] = 16*4 -1;
            }
        break;
        case 3:
            arr[0] += -1;
            if(arr[0] <= 16*2) {
                arr[0] = 16*2;
            }
        break;
        case 2:
            arr[0] += 2;
            if(arr[0] >= 16*2) {
                arr[0] = 16*2 -1;
            }
        break;
    }
    fGenerate(arr);
}

function lose() {
    //destination
    const dLose = [0, 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 15];
    dLose.forEach(d => {
        if(d === frogger[0]) {
            clearInterval(gameInterval);
            clearInterval(timeInterval);
            result.innerText = 'OH, YOU LOSE!!';
            document.removeEventListener('keyup', froggerMove);
        }
    })
    //river
    if(frogger[0] > 15 && frogger[0] < 80) {
        if(riverWin.find(r => r === frogger[0])) {
            fRiverMove(frogger);
        } else{
            clearInterval(timeInterval);
            clearInterval(gameInterval);
            result.innerText = 'OH, YOU LOSE!!';
            document.removeEventListener('keyup', froggerMove);
        }
    }
    //road
    if(frogger[0] >= 96) {
        roadLose.forEach(r => {
            if(r === frogger[0]) {
                clearInterval(gameInterval);
                clearInterval(timeInterval);
                result.innerText = 'OH, YOU LOSE!!';
                document.removeEventListener('keyup', froggerMove);
            }
        })
    }
}

function win() {
    winArr.forEach(w => {
        if(w === frogger[0]) {
            clearInterval(gameInterval);
            clearInterval(timeInterval);
            result.innerText = 'YOU WIN!';
            document.removeEventListener('keyup', froggerMove);
        }
    })
}

function timeOut() {
    if(count) {
        count--;
        timer.innerText = count;
    } else {
        clearInterval(timeInterval);
        clearInterval(gameInterval);
        result.innerText = 'Game Over!!!';
        document.removeEventListener('keyup', froggerMove);
    }
}


function loop () {
    move();
    win();
    lose();
    // circleDisappear();
}
function start() {
    init();
    document.addEventListener('keyup', froggerMove);
    gameInterval = setInterval(loop, 900);
    timeInterval = setInterval(timeOut, 1000);
}
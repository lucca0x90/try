const result = document.getElementById("result");
const grid = document.querySelector(".grids");

//240 * 130 个div ,给每个div添加属性值 id
for(let i = 0; i < 130; i++) {
    for(let j = 0; j < 240; j++) {
        let square = document.createElement('div');
        grid.appendChild(square);
        square.setAttribute('id', `${j}-${i}`);
    }
}
const grids = document.querySelectorAll('.grids div');
let score = 0;
let allInvaders = [];
let gameInterval;

const itemDirection ={
    invader: [
        {x: 4, y: 0},
        {x: 0, y: 4},
        {x: -4, y: 0}
    ],
    defender: [
        {x: 3, y: 0},
        {x: -3, y: 0}
    ],
    bulletD: [
        {x: 0, y: -3}
    ],
    bulletI: [
        {x: 0, y: 4}
    ]
}
// const invaderDirection = [{
//     x: 4,
//     y: 0,
// }, {
//     x: 0,
//     y: 4,
// }, {
//     x: -4,
//     y: 0,
// }];
let invaderMoveDirection = itemDirection.invader[0];
let defenderMoveDirection;

let invaderBox = {
    left: 0,
    right: 0,
    bottom: 0,
};

let defender;
let fort;
let bulletDefender;

let allBulletDefenders =[];
let allBulletInvaders =[];
let allForts = [];

let allExplosion = [];


/** 8 * 7（x,y)的网格 */
class Invader {
    constructor(x, y, i, j) {
        this.position = {
            x: x,
            y: y,
        };
        this.squares = [
            {y:0, x:3}, {y:0, x:4}, 
            {y:1, x:2}, {y:1, x:3}, {y:1, x:4}, {y:1, x:5},
            {y:2, x:1}, {y:2, x:3}, {y:2, x:4}, {y:2, x:6},
            {y:3, x:0}, {y:3, x:1}, {y:3, x:2}, {y:3, x:3}, {y:3, x:4}, {y:3, x:5}, {y:3, x:6}, {y:3, x:7},
            {y:4, x:1}, {y:4, x:3}, {y:4, x:4}, {y:4, x:6},
            {y:5, x:0}, {y:5, x:7},
            {y:6, x:1}, {y:6, x:6}
        ];
        this.id = {
            i: i,
            j: j
        };
    }
}

/** 16 * 12（x,y)的网格 */
class Fort {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        };
        this.squares = [
            {y:0, x:3}, {y:0, x:4}, {y:0, x:5}, {y:0, x:6}, {y:0, x:7}, {y:0, x:8}, {y:0, x:9}, {y:0, x:10},{y:0, x:11}, {y:0, x:12},
            {y:1, x:2}, {y:1, x:3}, {y:1, x:4}, {y:1, x:5}, {y:1, x:6}, {y:1, x:7}, {y:1, x:8}, {y:1, x:9}, {y:1, x:10}, {y:1, x:11}, {y:1, x:12}, {y:1, x:13}, 
            {y:2, x:1}, {y:2, x:2}, {y:2, x:3}, {y:2, x:4}, {y:2, x:5}, {y:2, x:6}, {y:2, x:7}, {y:2, x:8}, {y:2, x:9}, {y:2, x:10}, {y:2, x:11}, {y:2, x:12}, {y:2, x:13}, {y:2, x:14},
            {y:3, x:0}, {y:3, x:1}, {y:3, x:2}, {y:3, x:3}, {y:3, x:4}, {y:3, x:5}, {y:3, x:6}, {y:3, x:7}, {y:3, x:8}, {y:3, x:9}, {y:3, x:10}, {y:3, x:11}, {y:3, x:12}, {y:3, x:13}, {y:3, x:14}, {y:3, x:15},
            {y:4, x:0}, {y:4, x:1}, {y:4, x:2}, {y:4, x:3}, {y:4, x:4}, {y:4, x:5}, {y:4, x:6}, {y:4, x:7}, {y:4, x:8}, {y:4, x:9}, {y:4, x:10}, {y:4, x:11}, {y:4, x:12}, {y:4, x:13}, {y:4, x:14}, {y:4, x:15},
            {y:5, x:0}, {y:5, x:1}, {y:5, x:2}, {y:5, x:3}, {y:5, x:4}, {y:5, x:5}, {y:5, x:6}, {y:5, x:7}, {y:5, x:8}, {y:5, x:9}, {y:5, x:10}, {y:5, x:11}, {y:5, x:12}, {y:5, x:13}, {y:5, x:14}, {y:5, x:15},
            {y:6, x:0}, {y:6, x:1}, {y:6, x:2}, {y:6, x:3}, {y:6, x:4}, {y:6, x:5}, {y:6, x:6}, {y:6, x:7}, {y:6, x:8}, {y:6, x:9}, {y:6, x:10}, {y:6, x:11}, {y:6, x:12}, {y:6, x:13}, {y:6, x:14}, {y:6, x:15},
            {y:7, x:0}, {y:7, x:1}, {y:7, x:2}, {y:7, x:3}, {y:7, x:4}, {y:7, x:5}, {y:7, x:6}, {y:7, x:7}, {y:7, x:8}, {y:7, x:9}, {y:7, x:10}, {y:7, x:11}, {y:7, x:12}, {y:7, x:13}, {y:7, x:14}, {y:7, x:15},
            {y:8, x:0}, {y:8, x:1}, {y:8, x:2}, {y:8, x:3}, {y:8, x:4}, {y:8, x:5}, {y:8, x:10}, {y:8, x:11}, {y:8, x:12}, {y:8, x:13}, {y:8, x:14}, {y:8, x:15},
            {y:9, x:0}, {y:9, x:1}, {y:9, x:2}, {y:9, x:3}, {y:9, x:4}, {y:9, x:11}, {y:9, x:12}, {y:9, x:13}, {y:9, x:14}, {y:9, x:15},
            {y:10, x:0}, {y:10, x:1}, {y:10, x:2}, {y:10, x:3}, {y:10, x:4}, {y:10, x:11}, {y:10, x:12}, {y:10, x:13}, {y:10, x:14}, {y:10, x:15},
            {y:11, x:0}, {y:11, x:1}, {y:11, x:2}, {y:11, x:3}, {y:11, x:4}, {y:11, x:11}, {y:11, x:12}, {y:11, x:13}, {y:11, x:14}, {y:11, x:15},  
        ]
    }
}

/** 11 * 6（x,y)的网格 */
class Defender {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        };
        this.squares = [
            {y:0, x:5},
            {y:1, x:4}, {y:1, x:5}, {y:1, x:6},
            {y:2, x:1}, {y:2, x:2}, {y:2, x:3}, {y:2, x:4}, {y:2, x:5}, {y:2, x:6}, {y:2, x:7}, {y:2, x:8}, {y:2, x:9},
            {y:3, x:0}, {y:3, x:1}, {y:3, x:2}, {y:3, x:3}, {y:3, x:4}, {y:3, x:5}, {y:3, x:6}, {y:3, x:7}, {y:3, x:8}, {y:3, x:9}, {y:3, x:10},
            {y:4, x:0}, {y:4, x:1}, {y:4, x:2}, {y:4, x:3}, {y:4, x:4}, {y:4, x:5}, {y:4, x:6}, {y:4, x:7}, {y:4, x:8}, {y:4, x:9}, {y:4, x:10},
            {y:5, x:0}, {y:5, x:1}, {y:5, x:2}, {y:5, x:3}, {y:5, x:4}, {y:5, x:5}, {y:5, x:6}, {y:5, x:7}, {y:5 ,x:8}, {y:5, x:9}, {y:5, x:10},
        ]
    }
}

/** 3 * 7（x,y)的网格 */
class BulletInvader {
    constructor(x, y, change, loop, id) {
        this.position = {
            x: x, 
            y: y
        };
        // this.squares = [];
        this.squares = [[
            {y:0, x:1},
            {y:1, x:2},
            {y:2, x:1},
            {y:3, x:0},
            {y:4, x:1},
            {y:5, x:2},
            {y:6, x:1}
        ],[
            {y:0, x:2},
            {y:1, x:1},
            {y:2, x:0},
            {y:3, x:1},
            {y:4, x:2},
            {y:5, x:1},
            {y:6, x:0},
        ],[
            {y:0, x:1},
            {y:1, x:0},
            {y:2, x:1},
            {y:3, x:2},
            {y:4, x:1},
            {y:5, x:0},
            {y:6, x:1},
        ],[
            {y:0, x:0},
            {y:1, x:1},
            {y:2, x:2},
            {y:3, x:1},
            {y:4, x:0},
            {y:5, x:1},
            {y:6, x:2},
        ]];
        this.change = change;
        this.loop = loop;
        this.id = id;
    }
} 

/** 1 * 6（x,y)的网格 */
class BulletDefender {
    constructor(x, y, id) {
        this.position = {
            x: x,
            y: y
        };
        this.squares = [
            {y:0, x:0}, {y:1, x:0}, {y:2, x:0}, {y:3, x:0}, {y:4, x:0}, {y:5, x:0}, 
        ];
        this.id = id;
    }
}

/** 7 * 5（x,y)的网格 */
class Explosion {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        };
        this.squares = [
            {y:0, x:1}, {y:0, x:5}, 
            {y:1, x:2}, {y:1, x:4}, 
            {y:3, x:0}, {y:3, x:1}, {y:3, x:5}, {y:3, x:6}, 
            {y:5, x:2}, {y:5, x:4}, 
            {y:6, x:1}, {y:6, x:5}, 
        ]
    }
}

function generateOneItem(item) {
    item.squares.forEach(square => {
        square.x = square.x + item.position.x;
        square.y = square.y + item.position.y;
        let squareId;
        squareId = `${square.x}-${square.y}`;
        // console.log('generate: ' + squareId)
        document.getElementById(squareId).classList.add('have-black');
    })
}

/**
 * 清除样式
 * @param {Invader} item 实例
 */
function removeOneItem(item) {
    item.squares.forEach(square => {
        square.x = square.x ;
        square.y = square.y;
        let squareId;
        squareId = `${square.x}-${square.y}`;
        document.getElementById(squareId).classList.remove('have-black');
    })
}

function generateMoveItem(item, direction) {
    item.squares.forEach(square => {
        square.x = square.x + direction.x;
        square.y = square.y + direction.y;
        let squareId;
        squareId = `${square.x}-${square.y}`;
        document.getElementById(squareId).classList.add('have-black');
    })
}


//初始position为（3, 4）, 5 * 11个invader, x方向间隔3, y方向间隔4
function generateAllInvaders() {
    for(let i = 0; i < 11; i++) {
        for(let j = 0; j < 5; j++) {
            let invader = new Invader(3 + i*11, 4 + j*11, i, j);
            generateOneItem(invader);
            allInvaders.push(invader);
        }
    }
    invaderBox.bottom = 5 * 7 + 4 * 4 + 4;
}

//初始position为（27, 95）, 4个fort
function generateAllForts() {
    for(let i = 0; i < 4; i++) {
        fort = new Fort(20 + i * 60, 90);
        generateOneItem(fort);
        allForts.push(fort);
    }
}

/** 初始position为（20, 122）, 1个defender */
function generateDefender() {
    defender = new Defender(120, 122);
    generateOneItem(defender);
}

let lastChange = 4;
function invadersMove() { 
    if(allInvaders.length !== 0) {
        invaderBox.left = allInvaders[0].squares[0].x - 3;
        invaderBox.right = allInvaders[allInvaders.length-1].squares[0].x + 3;
        let lastLine = 0;
        allInvaders.forEach(i => {
            if(i.id.j === lastChange && lastChange >= 0) lastLine++;
        });
        if(lastLine === 0) {
            lastChange -= 1;
            invaderBox.bottom -= 11;
        }
        if(invaderBox.right >= 235 && invaderMoveDirection.x > 0) {
            invaderMoveDirection = itemDirection.invader[1];
        } else if(invaderBox.left <= 3 && invaderMoveDirection.x < 0) {
            invaderMoveDirection = itemDirection.invader[1];
        } else if (invaderMoveDirection.y > 0 && (invaderBox.right >= 235 || invaderBox.left <= 3)) {
            invaderMoveDirection = invaderBox.left <= 3 ? itemDirection.invader[0] : itemDirection.invader[2];
        }
        allInvaders.forEach(invader => removeOneItem(invader));
        allInvaders.forEach(invader => generateMoveItem(invader, invaderMoveDirection));
        invaderBox.right += invaderMoveDirection.x;
        invaderBox.left += invaderMoveDirection.x;
        invaderBox.bottom += invaderMoveDirection.y;
    }
}

function defenderMove(e) {
    if(e.keyCode == 37 && defender.squares[0].x >= 9) {
        removeOneItem(defender);
        defenderMoveDirection = itemDirection.defender[1];
        generateMoveItem(defender, defenderMoveDirection);
    } else if(e.keyCode == 39 && defender.squares[0].x <= 230) {
        removeOneItem(defender);
        defenderMoveDirection = itemDirection.defender[0];
        generateMoveItem(defender, defenderMoveDirection);
    } else if(e.keyCode == 38) {
        bulletDefender = new BulletDefender(defender.squares[0].x, 122-6, new Date().getTime());
        generateOneItem(bulletDefender);
        allBulletDefenders.push(bulletDefender);
    }
}

function bulletDefendersMove() {
    if(allBulletDefenders.length !== 0) {
        for(let i = 0; i < allBulletDefenders.length; i++) {
            removeOneItem(allBulletDefenders[i]);
            generateMoveItem(allBulletDefenders[i], itemDirection.bulletD[0]);
            if(allBulletDefenders[i].squares[0].y <= 3) {
                removeOneItem(allBulletDefenders[i]);
                allBulletDefenders.splice(i, 1);
            }
        }
    }
}

function generateBulletIs() {
    if(allInvaders.length !== 0) {
        if(allBulletInvaders.length < 5) {
            let randomI = allInvaders[Math.floor(Math.random() * allInvaders.length)].squares[0];
            let randomBulletI = new BulletInvader(randomI.x, randomI.y, 0, 0, new Date().getTime());
            generateBIOne(randomBulletI);
            allBulletInvaders.push(randomBulletI);
        }

    }
}
function generateBIOne(item) {
    for(let i = 0; i < 4; i++) {
        item.squares[i].forEach(square => {
            square.x = square.x + item.position.x;
            square.y = square.y + item.position.y + 4*i;
            let squareId;
            squareId = `${square.x}-${square.y}`;
            if(i === 0) {
                document.getElementById(squareId).classList.add('have-black');
            }
        })
    }
}

function removeBIOne(item) {
    item.squares[item.change].forEach(square => {
        square.x = square.x ;
        square.y = square.y;
        let squareId;
        squareId = `${square.x}-${square.y}`;
        document.getElementById(squareId).classList.remove('have-black');
    })
    item.change++;
    if(item.change === 4) {
        item.change = 0;
        item.loop = 16;
    }
}
function generateBInvaderMove(item) {
    if(item.change === 4) {
        item.change = 0;
        item.loop = 16;
    }
    item.squares[item.change].forEach(square => {
        square.x = square.x;
        square.y = square.y + item.loop;
        let squareId;
        squareId = `${square.x}-${square.y}`;
        document.getElementById(squareId).classList.add('have-black');
    })
}
let bID = [];
function bulletInvadersMove() {
    generateBulletIs();
    if(bID.length !== 0) {
        clearInterval(gameInterval);
        alert('you lose!');
    }
    if(allBulletInvaders.length !== 0) {
        for(let i = 0; i < allBulletInvaders.length; i++) {
            removeBIOne(allBulletInvaders[i]);
            generateBInvaderMove(allBulletInvaders[i]);
            defender.squares.forEach(d => {
                allBulletInvaders[i].squares[allBulletInvaders[i].change].forEach(bi => {
                    if(d.x === bi.x && d.y === bi.y) {
                        bID.push(allBulletInvaders[i].id);
                    }
                })
            })
            if(allBulletInvaders[i].squares[allBulletInvaders[i].change][6].y >= 125) {
                removeBIOne(allBulletInvaders[i]);
                allBulletInvaders.splice(i, 1);
            }
        }
    }
}

let needToRemoveBullets = [];
let needToRemoveInvaders = [];
function invaderExplosion() {
    needToRemoveBullets.forEach(id => {
        if(allBulletDefenders.find(b => b.id === id)) {
            removeOneItem(allBulletDefenders.find(b => b.id === id));
            allBulletDefenders = allBulletDefenders.filter(b => b.id !== id);
        }
    });
    allExplosion.forEach(e => removeOneItem(e));
    allExplosion= [];
    needToRemoveInvaders.forEach(id => {
        let explosionOne = allInvaders.find(i => i.id === id);
        removeOneItem(explosionOne);
        let explosionPoint = explosionOne.squares[0];
        let explosion = new Explosion(explosionPoint.x - 3, explosionPoint.y);
        allExplosion.push(explosion);
        allInvaders = allInvaders.filter(i => i.id !== id);
        if(allInvaders.length > 45) {
            score = '00' + (55 - allInvaders.length);
        } else if(allInvaders.length >= 0) {
            score = '0' + (55 - allInvaders.length);
        }
        result.innerText = score;
    })
    allExplosion.forEach(e => generateOneItem(e));
    needToRemoveBullets = [];
    needToRemoveInvaders = [];
    if(allBulletDefenders.length !== 0) {
        for(let i = 0; i < allInvaders.length; i++) {
            for(let j = 0; j < allBulletDefenders.length; j++) {
                allInvaders[i].squares.forEach(squareInvader => {
                    allBulletDefenders[j].squares.forEach(squareBullet => {
                        if(squareInvader.x == squareBullet.x && squareInvader.y == squareBullet.y) {
                            // allInvaders.splice(i, 1)
                            // allBulletDefenders.splice(j, 1);
                            if (!needToRemoveBullets.includes(allBulletDefenders[j].id));
                                needToRemoveBullets.push(allBulletDefenders[j].id);
                            if (!needToRemoveInvaders.includes(allInvaders[i].id))
                                needToRemoveInvaders.push(allInvaders[i].id);
                        }
                    })
                });
            }
        }
    } 
}

let deleteBulletIs = [];
let deleteBulletDs = [];
let disapperF = [];
function fortBulletID() {
    disapperF.forEach(df => {
        allForts.forEach(f => {
            if(f.squares.findIndex(fs => fs == df)) {
                f.squares = f.squares.filter(fs => fs !== df);
            }
        })
    })
    disapperF = [];

    //bulletInvader & fort
    deleteBulletIs.forEach(id => {
        if(allBulletInvaders.find(bi => bi.id === id)) {
            removeBIOne(allBulletInvaders.find(bi => bi.id === id));
            allBulletInvaders = allBulletInvaders.filter(bi => bi.id !== id);
        }
    })
    deleteBulletIs = [];
    if(allBulletInvaders.length !== 0) {
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < allBulletInvaders.length; j++) {
                for(let k = 0; k < 7; k++) {
                    let change = allBulletInvaders[j].squares[allBulletInvaders[j].change][k];
                    allForts[i].squares.forEach(f => {
                        if(f.x === change.x && f.y === change.y) {
                            if(!deleteBulletIs.includes(allBulletInvaders[j].id)) {
                                deleteBulletIs.push(allBulletInvaders[j].id);
                            }
                            if(!disapperF.find(df => df === f)) {
                                disapperF.push(f);
                            }
                        }
                    })
                }
            }
        }
    }
    //bulletDefender & fort
    deleteBulletDs.forEach(id => {
        if(allBulletDefenders.find(bd => bd.id === id)) {
            removeOneItem(allBulletDefenders.find(bd => bd.id === id));
            allBulletDefenders = allBulletDefenders.filter(bd => bd.id !== id);
        }
    })
    deleteBulletDs = [];
    if(allBulletDefenders.length !== 0) {
        for(let i = 0; i < 4; i++) {
            for(let j= 0; j < allBulletDefenders.length; j++) {
                allForts[i].squares.forEach(f => {
                    allBulletDefenders[j].squares.forEach(d => {
                        if(f.x === d.x && f.y === d.y) {
                            if(!deleteBulletDs.includes(allBulletDefenders[j].id)) {
                                deleteBulletDs.push(allBulletDefenders[j].id);
                            }
                            if(!disapperF.find(df => df === f)) {
                                removeOneItem(allBulletDefenders[j]);
                                disapperF.push(f);
                            }
                        }
                    })
                })
            }
        }
    }
    
}


let meetBI = [];
let meetBD = [];
let allBExplosion = [];
function bulletDIMeet() {
    allBExplosion.forEach(be => removeOneItem(be));
    allBExplosion = [];
    meetBI.forEach(id => {
        if(allBulletInvaders.find(bi => bi.id === id)) {
            let meetOne = allBulletInvaders.find(bi => bi.id === id);
            removeBIOne(meetOne);
            let meetE = new Explosion(meetOne.squares[meetOne.change][6].x-1, meetOne.squares[meetOne.change][6].y);
            allBExplosion.push(meetE);
            allBulletInvaders = allBulletInvaders.filter(bi => bi.id !== id);
        }
    })
    allBExplosion.forEach(be => generateOneItem(be));
    meetBD.forEach(id => {
        if(allBulletDefenders.find(bd => bd.id === id)) {
            removeOneItem(allBulletDefenders.find(bi => bi.id === id));
            allBulletDefenders = allBulletDefenders.filter(bi => bi.id !== id);
        }
    })
    meetBI = [];
    meetBD = [];
    if(allBulletInvaders.length !== 0 && allBulletDefenders.length !==0) {
        for(let i = 0; i < allBulletDefenders.length; i++) {
            for(let j= 0; j < allBulletInvaders.length; j++) {
                for(let k = 0; k < 7; k++) {
                    let meet = allBulletInvaders[j].squares[allBulletInvaders[j].change][k];
                    allBulletDefenders[i].squares.forEach(d => {
                        if(d.x === meet.x && d.y === meet.y) {
                            if(!meetBI.includes(allBulletInvaders[j].id)) {
                                meetBI.push(allBulletInvaders[j].id);
                            }
                            if(!meetBD.includes(allBulletDefenders[i].id)) {
                                meetBD.push(allBulletDefenders[i].id);
                            }
                        }
                    })
                }
            }
        }
    }
}

function gameOver() {
    if(invaderBox.bottom > 122) {
        clearInterval(gameInterval);
    }
    if(allInvaders.length === 0) {
        clearInterval(gameInterval);
        alert('You win!')
    }
}

function mainloop() {
    gameInterval = setInterval(() => {
        invadersMove();
        bulletDefendersMove();
        fortBulletID();
        invaderExplosion();
        bulletInvadersMove();
        bulletDIMeet();
        gameOver();
    }, 300);
    document.addEventListener('keyup', defenderMove);
}

function init() {
    generateAllInvaders();
    generateAllForts();
    generateDefender();
    generateBulletIs();
}

function main() {
    init();
    mainloop();
}

function play() {
    main();
}


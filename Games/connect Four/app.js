const player = document.getElementById("player");
const result = document.getElementById("result");
const grids = document.querySelectorAll(".grid div");

let currentPlayer = 1;
let playerOneIndex = [];
let playerTwoIndex = [];
let choseId;
let haveWinner = true;


function gridClick() {
    grids.forEach((grid, index) => {
        grid.addEventListener("click", 
        () => {
            if(haveWinner) {
                if(currentPlayer == 1) {
                    // console.log('one: '+ playerOneIndex, index);
                    if(!(playerOneIndex.includes(index) || playerTwoIndex.includes(index))) {
                        fall(index);
                        if(!(playerOneIndex.includes(choseId) || playerTwoIndex.includes(choseId))) {
                            grids[choseId].classList.add('player-one');
                            player.textContent = 2;
                            currentPlayer = 2;
                            playerOneIndex.push(choseId);
                            console.log('after:'+playerOneIndex);
                            if(playerOneIndex.length >= 4) {
                                matchWin(playerOneIndex);
                            }
                        }
                    }
                } else {
                    // console.log('two: '+ playerTwoIndex, index)
                    if(!(playerTwoIndex.includes(index) || playerOneIndex.includes(index))) {
                        fall(index);
                        if(!(playerTwoIndex.includes(choseId) || playerOneIndex.includes(choseId))) {
                            grids[choseId].classList.add('player-two');
                            player.textContent = 1;
                            currentPlayer = 1;
                            playerTwoIndex.push(choseId);
                            console.log('after-two:'+playerTwoIndex);
                            if(playerOneIndex.length >= 4) {
                                matchWin(playerTwoIndex);
                            }
                            if(playerTwoIndex.length === 21 && haveWinner) {
                                showAlert('Let\'s play again!');
                            }
                        }
                    }   
                }
            }
        })
    })
}

//掉落
function fall(index) {
    for(let i = index; i < 42; i = i + 7) {
        if(!(playerOneIndex.includes(i) || playerTwoIndex.includes(i))) {
            if(i <= 34) {
                continue;
            } else {
                choseId = i;
                // console.log('底层:'+choseId);
                break;
            }
        } else{
            choseId = i -7;
            // console.log('相邻上一层:'+choseId);
            break;
        }
    }
}

function matchWin(arr) {
    const winningArrays = [
        [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],
        [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
        [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
        [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
        [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],
        [13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
        [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 17, 23, 29],
        [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16],
        [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
        [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
        ];
    for(let i = 0; i < winningArrays.length; i++) {
        let isTrue = [];
        for(let j = 0; j < 4; j++) {
            isTrue.push(arr.includes(winningArrays[i][j]));
        }
        
        if(isTrue.includes(false)) {
            continue;
        } else {
            if(arr == playerOneIndex) {
                result.textContent = `Congratulation! Player 1 Win!`;
                haveWinner = false;
            } else{
                result.textContent = `Congratulation! Player 2 Win!`;
                haveWinner = false;
            }
            return ;
        }
    }
}

function reset() {
    playerOneIndex = [];
    playerTwoIndex = [];
    grids.forEach(grid => grid.classList.remove('player-one'));
    grids.forEach(grid => grid.classList.remove('player-two'));
    haveWinner = true;
    result.textContent = '';
    currentPlayer = 1;
    player.textContent = 1;
}

function cancelOne() {
    if(playerOneIndex.length === 0) {
        alert('Let\'s play!')
    } else {
        let oneLast = playerOneIndex.slice(playerOneIndex.length-1, playerOneIndex.length);
        playerOneIndex.pop();
        console.log(oneLast);
        grids[oneLast].classList.remove('player-one');
        currentPlayer = 1;
        player.textContent = 1;
    }
}
function cancelTwo() {
    if(playerTwoIndex.length === 0) {
        alert('Let\'s play!')
    } else {
        let twoLast = playerTwoIndex.slice(playerTwoIndex.length-1, playerTwoIndex.length);
        playerTwoIndex.pop();
        grids[twoLast].classList.remove('player-two');
        currentPlayer = 2;
        player.textContent = 2;
    }
}

function showAlert(msg) {
    setTimeout(() => {
        alert(msg);
    }, 0);
}

gridClick();


// (function testDraw(ary) {
//     grids.forEach((grid, index) => {
//         if (ary.includes(index)) {
//             grid.classList.add('player-one')
//         }
//     })
// })([11, 7, 23, 29]);
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let cellSize = 50;
let snakeCells = [[0, 0]];
// let snakeCells = [[0, 0], [50, 0], [100, 0]];
let boardWidth = 1000;
let boardHeight = 600;
let foodCells = generateRandomCoords();
let direction = 'right';
let gameOver = false;
let score = 0;


let intervalID = setInterval(function () {
    update();
    draw();
    // console.log('Hello');
}, 100);

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
        direction = 'up';
    }
    else if (event.key === 'ArrowDown') {
        direction = 'down';
    }
    else if (event.key === 'ArrowLeft') {
        direction = 'left';
    }
    else {
        direction = 'right';
    }

    // direction = event.key;
})

function update() {
    let headX = snakeCells[snakeCells.length - 1][0];
    let headY = snakeCells[snakeCells.length - 1][1];


    //updating snake cells
    let newHeadX;
    // let newHeadX = headX + cellSize;
    let newHeadY;
    // let newHeadY = headY;

    if (direction === 'right') {
        newHeadX = headX + cellSize;
        newHeadY = headY;
        if (newHeadX === boardWidth) {
            gameOver = true;
        }
    }
    else if (direction === 'down') {
        newHeadX = headX;
        newHeadY = headY + cellSize;
        if (newHeadY === boardHeight) {
            gameOver = true;
        }
    }
    else if (direction === 'up') {
        newHeadX = headX;
        newHeadY = headY - cellSize;
        if (newHeadY < 0) {
            gameOver = true;
        }
    }
    else {
        newHeadX = headX - cellSize;
        newHeadY = headY;
        if (newHeadX < 0) {
            gameOver = true;
        }
    }
    snakeCells.push([newHeadX, newHeadY]);

    if (newHeadX === foodCells[0] && newHeadY === foodCells[1]) {
        //updating food cells
        foodCells = generateRandomCoords();
        // snakeCells.push([foodCells[0], foodCells[1]]);
        score++;
    }
    else {
        snakeCells.shift();
    }


    //updating snake cells
    //snakeCells.push([newHeadX, newHeadY]);
    // snakeCells.shift();



}

// draw();
function draw() {
    if (gameOver == true) {
        clearInterval(intervalID);
        ctx.fillStyle = 'white';
        ctx.font = '50px sans-serif';
        ctx.fillText(`Game over`, boardWidth / 3, boardHeight / 2);
        ctx.fillText(`Your score : ${score}`, boardWidth / 3, boardHeight / 1.5);
        return;
        // console.log("GameOver")
    }

    //snake draw
    ctx.clearRect(0, 0, boardWidth, boardHeight);
    for (let cell of snakeCells) {

        ctx.fillStyle = 'Yellow';
        ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
    }

    //food draw
    ctx.fillStyle = 'green';
    ctx.fillRect(foodCells[0], foodCells[1], cellSize, cellSize);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(foodCells[0], foodCells[1], cellSize, cellSize);


    //score draw
    ctx.fillStyle = 'white';
    ctx.font = '24px sans-serif';
    ctx.fillText(`Score: ${score}`, 20, 30);

}


function generateRandomCoords() {
    return [
        Math.round((Math.random() * (boardWidth - cellSize)) / cellSize) * cellSize,
        Math.round((Math.random() * (boardHeight - cellSize)) / cellSize) * cellSize
    ]
}





// let intervalID = setInterval(function(){
//     console.log('Hello');
// })

// clearInterval(intervalID);
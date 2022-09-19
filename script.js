/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
//
const N = 10;
const GRASS = 0;
const ROCK = 1;
const BEE = 2;
const FLOWER = 3;
const square = canvas.width / N;
let field = new Array(N);
// ================================================
document.addEventListener("DOMContentLoaded", function () {
  generateMaze();
  drawMap();
  drawGrid();
});
// ===============================================
canvas.addEventListener("mousedown", function (e) {
  let beePosition = findBee();
  let beeMoves = findMoves(beePosition.x, beePosition.y);
  beeMoves.forEach((beeMove) => {
    context.fillStyle = "#ff0000";
    context.fillRect(square * beeMove.x, square * beeMove.y, square, square);
  });

  let flowersPositions = findFlowers();
  flowersPositions.forEach((flowerPosition) => {
    let flowersMoves = findMoves(flowerPosition.x, flowerPosition.y);
    flowersMoves.forEach((flowerMove) => {
      context.fillStyle = "#ffffff";
      context.fillRect(
        square * flowerMove.x,
        square * flowerMove.y,
        square,
        square
      );
    });
  });
});
// ===============================================
function findMoves(x, y) {
  let moves = [];
  if (y > 0 && field[y - 1][x] != ROCK) {
    moves.push({ x, y: y - 1 });
  }
  if (x + 1 < N && field[y][x + 1] != ROCK) {
    moves.push({ x: x + 1, y: y });
  }
  if (y + 1 < N && field[y + 1][x] != ROCK) {
    moves.push({ x, y: y + 1 });
  }
  if (x > 0 && field[y][x - 1] != ROCK) {
    moves.push({ x: x - 1, y });
  }

  return moves;
}
//=================================================
function findBee() {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (field[y][x] === BEE) {
        return { x, y };
      }
    }
  }
}
// ===============================================
function findFlowers() {
  let res = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (field[y][x] === FLOWER) {
        res.push({ x: x, y: y });
      }
    }
  }
  return res;
}
// ================================================
function generateMaze() {
  function placeFlower() {
    while (true) {
      let x = getRandomInt(0, N - 1);
      let y = getRandomInt(0, N - 1);
      if (field[y][x] != BEE) {
        field[y][x] = FLOWER;
        break;
      }
    }
  }
  for (let i = 0; i < N; i++) {
    field[i] = new Array(N);
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      field[i][j] = getRandomInt(0, 99);
      if (field[i][j] < 20) {
        field[i][j] = ROCK;
      } else if (field[i][j] >= 20) {
        field[i][j] = GRASS;
      }
    }
  }
  field[getRandomInt(0, N - 1)][getRandomInt(0, N - 1)] = BEE;
  Array.from({ length: 3 }, (_x, _y) => {
    placeFlower();
  });
}
// ================================================
function drawMap() {
  context.strokeStyle = "#ffffff";
  context.font = "30px serif";
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      switch (field[y][x]) {
        case ROCK:
          context.fillStyle = "#adadad";
          context.fillRect(square * x, square * y, square, square);
          break;
        case GRASS:
          context.fillStyle = "#00ff00";
          context.fillRect(square * x, square * y, square, square);
          break;
        case BEE:
          context.fillStyle = "#00ff00";
          context.fillRect(square * x, square * y, square, square);
          context.fillText("🐝", square * x + 5, square * y + 40);
          break;
        case FLOWER:
          context.fillStyle = "#00ff00";
          context.fillRect(square * x, square * y, square, square);
          context.fillText("🌼", square * x + 5, square * y + 40);
          break;
      }
    }
  }
}
// ================================================
function drawGrid() {
  context.beginPath();
  context.strokeStyle = "#ffffff";
  context.fillStyle = "coral";
  context.lineWidth = 5;
  //
  for (let i = 1; i < N; i++) {
    context.moveTo(square * i, 0);
    context.lineTo(square * i, canvas.width);
  }
  //
  for (let i = 1; i < N; i++) {
    context.moveTo(0, square * i);
    context.lineTo(canvas.width, square * i);
  }
  //
  context.stroke();
}
// ===============================================
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

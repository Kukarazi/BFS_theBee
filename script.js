/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");
//
const N = 7;
const GRASS = 0;
const WALL = 1;
const BEE = 18;
const square = canvas.width / N;
let field = new Array(N);
//
document.addEventListener("DOMContentLoaded", function () {
  generateMaze();
  console.log(field);
  drawSquare();
  drawLines();
});
//
function generateMaze() {
  for (let i = 0; i < N; i++) {
    field[i] = new Array(N);
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      field[i][j] = getRandomInt(0, 1);
    }
  }
  field[getRandomInt(0, N - 1)][getRandomInt(0, N - 1)] = BEE;
}
//
function drawLines() {
  let context = canvas.getContext("2d");
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
//
function drawSquare() {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.fillStyle = "#aaaa00";
  context.strokeStyle = "#ffffff";
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (field[y][x] === WALL) {
        context.fillRect(square * x, square * y, square, square);
      } else if (field[y][x] === BEE) {
        // /
        context.moveTo(square * (x + 1), square * y);
        context.lineTo(square * x, square * (y + 1));
        // \
        context.moveTo(square * x, square * y); //
        context.lineTo(square * (x + 1), square * (y + 1)); //
        //
        context.stroke();
      }
    }
  }
}
//
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//
//
//
let array = [1, 2, 3, 4, 5];
array[0] = [0, 0, 0];
array[1] = [0, 0, 0];
array[2] = [0, 0, 0];
console.log(array);

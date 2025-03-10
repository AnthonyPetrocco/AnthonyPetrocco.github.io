//draft version of a game
let cells = [];
let gCount = 15;
let d;
let margin = 40;
let gameState = 2;
let nAlive;
let player;
let isStable = 0;
let lastP;
let water;
let ice1;
let ice2;
let penguin;
let shiftCount;
let timer;
let percentOcean = 0;
let speed = 0.5;

function preload() {
  penguin = loadImage("https://assets.codepen.io/4559259/peng.png");
  water = loadImage(
    "https://assets.codepen.io/4559259/New+Piskel.gif?format=auto"
  );
  ice1 = loadImage("https://assets.codepen.io/4559259/ice1.png");
  ice2 = loadImage("https://assets.codepen.io/4559259/ice2.png");
}
function setup() {
  timer = 0;
  let c = max(600, min(windowWidth, windowHeight) * 0.8);
  createCanvas(c, c);
  shiftCount = 0;
  initiateCells();
  d = (width - 2 * margin) / gCount;
  player = { i: int(random(1, gCount - 1)), j: int(random(1, gCount - 1)) };
  cells[player.i][player.j].alive = 1;
  lastP = { i: player.i, j: player.j };
  speed = 0.5;
}

function draw() {
  frameRate(60);
  timer += speed;

  if (timer > 200) {
    shiftCount++;
    timer = 0;
    speed += 0.1;
    speed == min(1, speed);
    if (player.i === lastP.i && player.j == lastP.j) {
      gameState = 0;
    }
    runGOL();
    lastP = { i: player.i, j: player.j };
  }
  if (gameState === 2) {
    timer = 0;
    background(ice1);
    background(255, 255, 255, 100);
    textAlign(CENTER);
    textSize(40);
    image(
      penguin,
      margin + player.i * d - d / 2,
      margin + player.j * d - d / 2,
      d * 1.5,
      d * 1.5
    );
    text("Bergs of Life", width / 2, height / 2 - 150);
    textSize(16);
    text(
      "A penguin plays Icebergs that play Conway's Game of Life.",
      width / 2,
      height / 2 - 100
    );
    text(
      "At the end of each countdown, the Icebergs shift, melt, or form. ",
      width / 2,
      height / 2 - 75
    );
    text(
      "The penguin needs to be on a stable iceberg for each shift.",
      width / 2,
      height / 2 - 50
    );
    text("Move using WASD.", width / 2, height / 2 - 25);
    text(
      "The penguin has the magic power of making icebergs. ",
      width / 2,
      height / 2
    );

    text("Do not stay on the same square.", width / 2, height / 2 + 75);
    text(
      "Do not let the ocean take more than 60% of the area.",
      width / 2,
      height / 2 + 50
    );
    textSize(25);
    text("Press space to begin.", width / 2, height / 2 + 150);
  } else if (gameState === 0) {
    background(255);
    frameRate(1);
    runGOL();
    drawCells();

    background(240, 250, 255, 150);
    push();
    fill(10, 0, 100);
    textSize(40);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    textSize(20);
    text(
      "Shifts survived: " + str(int(shiftCount)),
      width / 2,
      height / 2 + 50
    );
    getNAlive();
    text(
      "Ocean Area: " + str(int(percentOcean)) + "%",
      width / 2,
      height / 2 + 150
    );
    text("Press Space to play again.", width / 2, height / 2 + 180);
    pop();
  } else if (gameState === 1) {
    background(240, 250, 255);
    getNAlive();
    fill(0);
    textAlign(CENTER);
    textSize(18);
    text("Ocean: " + str(int(percentOcean)) + "%", width / 2, margin / 2 + 9);
    text(str(10 - int((timer / 20) % 10)), width / 2, height - margin / 2);

    // cells[player.i][player.j].alive = 1;
    drawCells();
    fill(255);
    image(
      penguin,
      margin + player.i * d - d / 2,
      margin + player.j * d - d / 2,
      d * 1.5,
      d * 1.5
    );

    if (cells[player.i][player.j].alive === 0 || percentOcean >= 60) {
      gameState = 0;
    }
  }
}
function initiateCells() {
  cells = [];
  for (let i = 0; i < gCount; i++) {
    cells[i] = [];
    for (let j = 0; j < gCount; j++) {
      alive = random([0, 1]);
      cells[i][j] = {
        alive: alive,
        neigborsAlive: 2,
        nState: alive,
        img: random([ice1, ice2])
      };
    }
  }
}
function drawCells() {
  for (let i = 0; i < gCount; i++) {
    for (let j = 0; j < gCount; j++) {
      if (cells[i][j].alive === 1) {
        fill(100, 200, 100);
        image(cells[i][j].img, margin + i * d, margin + j * d, d, d);
      } else {
        fill(0);
        image(water, margin + i * d, margin + j * d, d, d);
      }
    }
  }
}
function getNAlive() {
  nAlive = 0;
  for (let i = 0; i < gCount; i++) {
    for (let j = 0; j < gCount; j++) {
      nAlive += cells[i][j].alive;
    }
  }
  percentOcean = 100 - (nAlive / (gCount * gCount)) * 100;
}
function keyPressed() {
  if (keyCode === 87 || (keyCode === 38 && player.j > 0)) {
    player.j--;
    cells[player.i][player.j].alive = 1;
  }
  if (keyCode === 83 || (keyCode === 40 && player.j < gCount - 1)) {
    player.j++;
    cells[player.i][player.j].alive = 1;
  }
  if (keyCode === 68 || (keyCode === 39 && player.i < gCount - 1)) {
    player.i++;
    cells[player.i][player.j].alive = 1;
  }
  if (keyCode === 65 || (keyCode === 37 && player.i > 0)) {
    player.i--;
    cells[player.i][player.j].alive = 1;
  }
  if (keyCode === 32 && gameState != 1) {
    gameState = 1;
    loop();
    setup();
    draw();
  }
}

function runGOL() {
  checkNeighbors();
  nChanges = 0;
  for (let i = 0; i < gCount; i++) {
    for (let j = 0; j < gCount; j++) {
      if (
        (cells[i][j].neighborsAlive < 2 || cells[i][j].neighborsAlive > 3) &&
        cells[i][j].alive === 1
      ) {
        cells[i][j].alive = 0;
      } else if (
        cells[i][j].neighborsAlive === 3 ||
        (cells[i][j].neighborsAlive === 2 && cells[i][j].alive === 1)
      ) {
        cells[i][j].alive = 1;
      }
    }
  }
}

function checkNeighbors() {
  for (let i = 0; i < gCount; i++) {
    for (let j = 0; j < gCount; j++) {
      if (j === 0) {
        if (i === 0) {
          cells[i][j].neighborsAlive =
            cells[i][j + 1].alive + cells[i + 1][j].alive;
        } else if (i < gCount - 1) {
          cells[i][j].neighborsAlive =
            cells[i][j + 1].alive +
            cells[i + 1][j].alive +
            cells[i - 1][j].alive;
        } else if (i === gCount - 1) {
          cells[i][j].neighborsAlive =
            cells[i][j + 1].alive + cells[i - 1][j].alive;
        }
      } else if (j < gCount - 1) {
        if (i === 0) {
          cells[i][j].neighborsAlive =
            cells[i][j + 1].alive +
            cells[i][j - 1].alive +
            cells[i + 1][j].alive;
        } else if (i < gCount - 1) {
          cells[i][j].neighborsAlive =
            cells[i][j + 1].alive +
            cells[i][j - 1].alive +
            cells[i + 1][j].alive +
            cells[i - 1][j].alive;
        } else if (i === gCount - 1) {
          cells[i][j].neighborsAlive =
            cells[i][j + 1].alive +
            cells[i][j - 1].alive +
            cells[i - 1][j].alive;
        }
      } else if (j === gCount - 1) {
        if (i === 0) {
          cells[i][j].neighborsAlive =
            cells[i][j - 1].alive + cells[i + 1][j].alive;
        } else if (i < gCount - 1) {
          cells[i][j].neighborsAlive =
            cells[i][j - 1].alive +
            cells[i + 1][j].alive +
            cells[i - 1][j].alive;
        } else if (i === gCount - 1) {
          cells[i][j].neighborsAlive =
            cells[i][j - 1].alive + cells[i - 1][j].alive;
        }
      }
    }
  }
}

let mazeWidth = 12;
let mazeHeight = 8;
let pathSpeed = 50;

let maze = [];
let path = [];
let stopRequested = false;

const resetMaze = () => {
  maze = [];
  path = [];
  const mazeContainer = document.getElementById("maze");
  mazeContainer.innerHTML = "";
};

const showMaze = (maze) => {
  const mazeContainer = document.getElementById("maze");

  mazeContainer.className = "maze";
  mazeContainer.style.gridTemplateColumns = `repeat( ${
    mazeWidth * 2 + 1
  }, 27px)`;
  mazeContainer.style.gridTemplateRows = `repeat(${mazeHeight * 2 + 1}, 27px)`;

  maze.forEach((row, y) => {
    row.forEach((col, x) => {
      const cellType = maze[y][x];

      const cell = document.createElement("div");
      cell.id = `${x};${y}`;
      cell.className = `cell ${
        cellType === 0
          ? "clear"
          : cellType === 1
          ? "wall"
          : cellType === 2
          ? "start"
          : "end"
      }`;
      mazeContainer.appendChild(cell);
    });
  });
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const showPath = async (steps) => {
  for (let i = 0; i < steps.length; i++) {
    if (stopRequested) break;

    const cell = document.getElementById(`${steps[i].x};${steps[i].y}`);
    cell.className = "cell traversed";

    await sleep(pathSpeed);
  }
};

const resetPath = (steps) => {
  for (let i = 0; i < steps.length; i++) {
    const cell = document.getElementById(`${steps[i].x};${steps[i].y}`);
    cell.className = "cell clear";
  }
  findPath;
};

// show initial maze
resetMaze();
stopRequested = true;
maze = initMaze(mazeWidth, mazeHeight);
generateMaze(maze);
maze = mazeToMatrix(maze);
showMaze(maze);

const generateMazeButton = document.getElementById("generateMaze");
const findPathButton = document.getElementById("findPath");
const resetPathButton = document.getElementById("resetPath");

const widthInput = document.getElementById("mWidth");
const heightInput = document.getElementById("mHeight");
const pathSpeedInput = document.getElementById("pathSpeed");

widthInput.addEventListener("change", (e) => {
  console.log(e);
  mazeWidth = e.target.value;
});

heightInput.addEventListener("change", (e) => {
  mazeHeight = e.target.value;
});

pathSpeedInput.addEventListener("change", (e) => {
  pathSpeed = e.target.value;
});

generateMazeButton.addEventListener("click", () => {
  resetMaze();
  stopRequested = true;

  maze = initMaze(mazeWidth, mazeHeight);
  generateMaze(maze);
  maze = mazeToMatrix(maze);

  showMaze(maze);
});

resetPathButton.addEventListener("click", () => {
  resetPath(path);
  stopRequested = true;
});

findPathButton.addEventListener("click", () => {
  path = findPath(maze)
    .slice(0, -1)
    .map((step) => {
      return { x: step.x, y: step.y };
    });

  stopRequested = false;
  showPath(path);
});

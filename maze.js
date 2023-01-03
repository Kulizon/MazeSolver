class Cell {
  visited = false;
  wallT = true;
  wallR = true;
  wallB = true;
  wallL = true;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

 const initMaze = (w, h) => {
  const maze = [];

  for (let y = 0; y < h; y++) {
    maze.push([]);
    for (let x = 0; x < w; x++) {
      maze[y].push(new Cell(x, y));
    }
  }
  return maze;
};

 const hasNaighbours = (cell, maze) => {
  const neighbours = [];

  if (cell.x != maze[cell.y].length - 1 && !maze[cell.y][cell.x + 1].visited) {
    neighbours.push(maze[cell.y][cell.x + 1]);
  }

  if (cell.x != 0 && !maze[cell.y][cell.x - 1].visited) {
    neighbours.push(maze[cell.y][cell.x - 1]);
  }

  if (cell.y != 0 && !maze[cell.y - 1][cell.x].visited) {
    neighbours.push(maze[cell.y - 1][cell.x]);
  }

  if (cell.y != maze.length - 1 && !maze[cell.y + 1][cell.x].visited) {
    neighbours.push(maze[cell.y + 1][cell.x]);
  }

  if (neighbours.length === 0) {
    return false;
  } else {
    return neighbours[Math.floor(Math.random() * neighbours.length)];
  }
};

 const visitCell = (cell, maze) => {
  cell.visited = true;
  let neighbour = hasNaighbours(cell, maze);

  while (neighbour) {
    // delete wall here ?
    const xDif = neighbour.x - cell.x;
    const yDif = neighbour.y - cell.y;

    // from left to right
    if (xDif === 1) {
      cell.wallR = false;
      neighbour.wallL = false;
    }

    // from right to left
    if (xDif === -1) {
      cell.wallL = false;
      neighbour.wallR = false;
    }

    // from top to bottom
    if (yDif === 1) {
      cell.wallB = false;
      neighbour.wallT = false;
    }

    // from bottom to top
    if (yDif === -1) {
      cell.wallT = false;
      neighbour.wallB = false;
    }

    visitCell(neighbour, maze);
    neighbour = hasNaighbours(cell, maze);
  }
};

 const generateMaze = (maze) => {
  // get random cell
  const curCell =
    maze[Math.floor(Math.random() * maze.length)][
      Math.floor(Math.random() * maze[0].length)
    ];
  visitCell(curCell, maze);
};

 const mazeToMatrix = (maze) => {
  const m = [];
  for (let i = 0; i < maze.length * 2 + 1; i++) {
    m.push([]);
    for (let j = 0; j < maze[0].length * 2 + 1; j++) {
      m[i].push(0);
    }
  }

  let i = 0;
  let j = 0;
  for (let y = 1; y < maze.length * 2 + 1; y = y + 2) {
    for (let x = 1; x < maze[0].length * 2 + 1; x = x + 2) {
      const cell = maze[i][j];

      m[y - 1][x + 1] = 1;
      m[y + 1][x + 1] = 1;
      m[y - 1][x - 1] = 1;
      m[y + 1][x - 1] = 1;

      if (cell.wallT) {
        m[y - 1][x] = 1;
      }
      if (cell.wallB) {
        m[y + 1][x] = 1;
      }
      if (cell.wallL) {
        m[y][x - 1] = 1;
      }
      if (cell.wallR) {
        m[y][x + 1] = 1;
      }

      j++;
    }
    i++;
    j = 0;
  }

  setStartEndPoint(m);

  return m;
};

 const setStartEndPoint = (m) => {
  const directions = ["t", "r", "b", "l"];
  const startingWall = directions[Math.floor(Math.random() * 4)];

  if (startingWall === "t" || startingWall === "b") {
    const dirA = startingWall === "t" ? 1 : m.length - 2;
    let pointA = Math.floor(Math.random() * m[0].length);
    while (m[dirA][pointA] == 1)
      pointA = Math.floor(Math.random() * m[0].length);

    const dirB = startingWall === "t" ? m.length - 2 : 1;
    let pointB = Math.floor(Math.random() * m[0].length);
    while (m[dirB][pointB] == 1)
      pointB = Math.floor(Math.random() * m[0].length);

    m[dirA === 1 ? 0 : m.length - 1][pointA] = 2;
    m[dirB === 1 ? 0 : m.length - 1][pointB] = 3;
  }

  if (startingWall === "r" || startingWall === "l") {
    const dirA = startingWall === "l" ? 1 : m[0].length - 2;
    let pointA = Math.floor(Math.random() * m.length);
    while (m[pointA][dirA] == 1) pointA = Math.floor(Math.random() * m.length);

    const dirB = startingWall === "l" ? m[0].length - 2 : 1;
    let pointB = Math.floor(Math.random() * m.length);
    while (m[pointB][dirB] == 1) pointB = Math.floor(Math.random() * m.length);

    m[pointA][dirA === 1 ? 0 : m[0].length - 1] = 2;
    m[pointB][dirB === 1 ? 0 : m[0].length - 1] = 3;
  }
};


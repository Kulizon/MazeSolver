class Node {
  f = 0;
  g = 0;
  h = 0;
  parent = null;
  x = null;
  y = null;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

 const findPath = (maze) => {
  let startNode = 0;
  let endNode = 0;

  const initGrid = () => {
    const grid = [];

    for (let y = 0; y < maze.length; y++) {
      grid.push([]);
      for (let x = 0; x < maze[y].length; x++) {
        const node = new Node(x, y);

        if (maze[y][x] !== 1) {
          grid[y].push(node);

          if (maze[y][x] === 2) startNode = node;
          else if (maze[y][x] === 3) endNode = node;
        } else {
          grid[y].push(null);
        }
      }
    }

    return grid;
  };

  const grid = initGrid();

  // nodes to take into consideration
  let openList = [];
  // traversed nodes
  let closedList = [];
  openList.push(startNode);

  while (openList.length > 0) {
    // grab cheapest node
    let lowInd = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowInd].f) lowInd = i;
    }
    let currentNode = openList[lowInd];

    // end case, return the traced path
    if (currentNode.x == endNode.x && currentNode.y == endNode.y) {
      let curr = currentNode;
      let ret = [];
      while (curr.parent) {
        ret.push(curr);
        curr = curr.parent;
      }
      return ret.reverse();
    }

    const getNeighbours = (grid, node) => {
      let ret = [];
      let x = node.x;
      let y = node.y;

      if (grid[y - 1] && grid[y - 1][x]) {
        ret.push(grid[y - 1][x]);
      }
      if (grid[y + 1] && grid[y + 1][x]) {
        ret.push(grid[y + 1][x]);
      }
      if (grid[y][x - 1] && grid[y][x - 1]) {
        ret.push(grid[y][x - 1]);
      }
      if (grid[y][x + 1] && grid[y][x + 1]) {
        ret.push(grid[y][x + 1]);
      }
      return ret;
    };

    const heuristic = (pos0, pos1) => {
      // This is the Manhattan distance
      var d1 = Math.abs(pos1.x - pos0.x);
      var d2 = Math.abs(pos1.y - pos0.y);
      return d1 + d2;
    };

    // normal case
    openList = openList.filter((el) => {
      return el.x != currentNode.x || el.y != currentNode.y;
    });
    closedList.push(currentNode);
    let neighbours = getNeighbours(grid, currentNode);

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];

      if (
        closedList.find((el) => el.x === neighbour.x && el.y === neighbour.y)
      ) {
        // not a valid node to process, skip to next neighbor
        continue;
      }

      let gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbour
      let gScoreIsBest = false;

      if (
        !openList.find((el) => el.x === neighbour.x && el.y === neighbour.y)
      ) {
        // This the the first time we have arrived at this node, it must be the best
        // Also, we need to take the h (heuristic) score since we haven't done so yet

        gScoreIsBest = true;
        // change pos
        neighbour.h = heuristic(neighbour, endNode);
        openList.push(neighbour);
      } else if (gScore < neighbour.g) {
        // We have already seen the node, but last time it had a worse g (distance from start)
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        // Found an optimal (so far) path to this node.   Store info on how we got here and
        //  just how good it really is...
        if (currentNode.x === neighbour.x && currentNode.y === neighbour.y) {
          continue;
        } else {
          neighbour.parent = currentNode;
          neighbour.g = gScore;
          neighbour.f = neighbour.g + neighbour.h;
        }
      }
    }
  }

  return [];
};


const path = findPath(maze)
//   .slice(0, -1)
//   .map((step) => {
//     return { x: step.x, y: step.y };
//   });

// path.forEach((step) => {
//   console.log(step);
//   maze[step.y][step.x] = "•";
// });

// maze.forEach((row, y) => {
//   row.forEach((col, x) => {
//     if (maze[y][x] === 0) maze[y][x] = " ";
//     else if (maze[y][x] === 1) maze[y][x] = "☐";
//     else if (maze[y][x] === 2) maze[y][x] = "s";
//     else if (maze[y][x] === 3) maze[y][x] = "e";
//   });
// });

// maze.forEach((entry) => {
//   console.log(entry.join(" "));
// });

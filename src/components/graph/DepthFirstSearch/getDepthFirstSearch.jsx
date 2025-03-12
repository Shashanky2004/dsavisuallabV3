const dir = [-1, 0, 1, 0, -1]; // Direction arrays for up, right, down, left

const check = (row, col, grid) => {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length)
    return false;
  if (grid[row][col].isVisited || grid[row][col].isWall) return false;
  return true;
};

const setDistanceAndPreviousNode = (grid, current, next_X, next_Y) => {
  if (grid[next_X][next_Y].distance > current.distance + 1) {
    grid[next_X][next_Y].distance = current.distance + 1;
    grid[next_X][next_Y].previousNode = current;
  }
};

const depthFirstSearchRecursive = (grid, node, finishNode, visitedNodesInOrder) => {
  node.isVisited = true;
  visitedNodesInOrder.push(node);

  if (node === finishNode) {
    return true;
  }

  for (let i = 0; i < 4; i++) {
    const next_X = node.row + dir[i];
    const next_Y = node.col + dir[i + 1];
    
    if (!check(next_X, next_Y, grid)) continue;
    
    const nextNode = grid[next_X][next_Y];
    setDistanceAndPreviousNode(grid, node, next_X, next_Y);
    
    if (depthFirstSearchRecursive(grid, nextNode, finishNode, visitedNodesInOrder)) {
      return true;
    }
  }

  return false;
};

export const depthfirstsearch = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  
  // Reset all nodes
  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.distance = Infinity;
      node.previousNode = null;
    }
  }
  
  startNode.distance = 0;
  depthFirstSearchRecursive(grid, startNode, finishNode, visitedNodesInOrder);
  return visitedNodesInOrder;
};

export const getNodesInShortestPathOrder = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

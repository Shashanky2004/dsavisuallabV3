const dir = [-1, 0, 1, 0, -1]; // Direction arrays for up, right, down, left

const check = (row, col, grid) => {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length)
    return false;
  if (grid[row][col].isVisited || grid[row][col].isWall) return false;
  return true;
};

// Helper function to get the unvisited node with minimum distance
const getMinDistanceNode = (nodes) => {
  return nodes.reduce((minNode, node) => {
    return node.distance < minNode.distance ? node : minNode;
  });
};

const updateNeighbors = (grid, node) => {
  for (let i = 0; i < 4; i++) {
    const next_X = node.row + dir[i];
    const next_Y = node.col + dir[i + 1];
    
    if (!check(next_X, next_Y, grid)) continue;
    
    const neighbor = grid[next_X][next_Y];
    // For minimum cost path, we add the cost of the neighbor node
    const newDistance = node.distance + neighbor.cost;
    
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = node;
    }
  }
};

const dijkstra = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  const unvisitedNodes = getAllNodes(grid);
  
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    
    // If we cannot reach any more nodes, break
    if (closestNode.distance === Infinity) break;
    
    // Skip walls
    if (closestNode.isWall) continue;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    if (closestNode === finishNode) break;
    
    updateNeighbors(grid, closestNode);
  }
  
  return visitedNodesInOrder;
};

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

export const minimumCostPath = (grid, startNode, finishNode) => {
  // Reset all nodes
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      node.isVisited = false;
      node.previousNode = null;
    }
  }
  
  startNode.distance = 0; // Start node has no cost
  const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
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

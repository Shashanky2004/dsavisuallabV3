export const inorderTraversal = (array, animations) => {
  if (!array || array.length === 0) return;

  const traverse = (index) => {
    if (index >= array.length) return;
    
    // Add highlighting animation for current node
    animations.push({ index, type: 'highlight' });
    
    // Traverse left child
    const leftChild = 2 * index + 1;
    if (leftChild < array.length) {
      traverse(leftChild);
    }
    
    // Visit current node
    animations.push({ index, type: 'visit' });
    
    // Traverse right child
    const rightChild = 2 * index + 2;
    if (rightChild < array.length) {
      traverse(rightChild);
    }
  };

  traverse(0);
}; 
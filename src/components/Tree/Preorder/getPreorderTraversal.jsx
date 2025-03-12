export const preorderTraversal = (array, animations) => {
  if (!array || array.length === 0) return;

  const traverse = (index) => {
    if (index >= array.length) return;
    
    // Visit current node
    animations.push(index);
    
    // Traverse left child (2*i + 1)
    const leftChild = 2 * index + 1;
    if (leftChild < array.length) {
      traverse(leftChild);
    }
    
    // Traverse right child (2*i + 2)
    const rightChild = 2 * index + 2;
    if (rightChild < array.length) {
      traverse(rightChild);
    }
  };

  traverse(0);
};

export const getpreordertraversal = (tree) => {
  var animation = [];
  var tree1D = [].concat(...tree);
  tree1D = [];
  for (var i = 0; i < tree.length; i++) {
    for (var j = 0; j < tree[i].length; j++) {
      tree1D.push([i + "", j + ""]);
    }
  }
  preorderTraversal(tree1D, animation);
  return animation;
};

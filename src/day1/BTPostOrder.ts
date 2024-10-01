// Binary Tree InOrder
// In general, what we tend to do is always create a second function whenever we're ' doing recursion
// let's do a function walk() that takes in just a node
// also gonna have our path, which is a number array
// then we can also return it back out just to make it super convenient.  
function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
	// When we doing recursion, we have to consider our base case 
	// the base case if you really think about it is when we are at a node that doesn't exist. 
	// we can no longer keep going down, we are done recursing, we can say, hey, we will stop here at this moment 
	if(!curr) {
		// Even though we're passing in path we're also returning path 
		// cuz then I can just go work turn a walk head array 
		return path;
	}

	// What do we do here?
	// In a post order world, we go left, then we go right, then we visit the node.
	
	//recurse
	// we need to visit the left hand side and then the right hand side 
	// recall walk  
	// if we hit a node in which it doesn't exist, it will just simply return, else we keep on recusing until we get to the bottom. 
	walk(curr.left, path);
	walk(curr.right, path); 
	
	//post
	path.push(curr.value);

	// we've already visited the node by pushing into the path, then we walk, we're done. 
	// So the last thing we need to do is just return out the path 
	return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
	return walk(head, []);
}

// Run and see how the test passed: npx jest Order
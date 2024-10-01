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

	// What do I need to do with this in an in-order traversal?
	// We need to go down our left hand side until we can no longer go left
	// then we visit the node, then we go down our right hand side.
	// Right now we are visiting the node, then going left, then going right. 
	// In in order, we go left, visit the node, go right 
	// We just put it In the two "walks", we split that walk in twain. 
	// It is fantastic, right? 
	
	//recurse
	// we need to visit the left hand side and then the right hand side 
	// recall walk  
	// if we hit a node in which it doesn't exist, it will just simply return, else we keep on recusing until we get to the bottom. 
	walk(curr.left, path);
	path.push(curr.value);
	walk(curr.right, path); 

	//post
	// we've already visited the node by pushing into the path, then we walk, we're done. 
	// So the last thing we need to do is just return out the path 
	return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
	// what I want to return out are the visited nodes in that order. 
	return walk(head, []);
}

// Run and see how the test passed: npx jest Order
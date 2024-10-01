// Binary Tree PreOrder
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

	//pre
	// we will first push into our path the node value
	// we first visit the node
	path.push(curr.value);

	//recurse
	// we need to visit the left hand side and then the right hand side 
	// recall walk  
	// if we hit a node in which it doesn't exist, it will just simply return, else we keep on recusing until we get to the bottom. 
	walk(curr.left, path);
	walk(curr.right, path); 

	// we've already visited the node by pushing into the path, then we walk, we're done. 
	// So the last thing we need to do is just return out the path 
	return path;
}

// what we're given is the head to the tree 
// Usually we call this the head or the root 
// we're gonna do a pre order array of our tree 
export default function pre_order_search(head: BinaryNode<number>): number[] {
	// what I want to return out are the visited nodes in that order. 
	return walk(head, []);
}


// Base case should return path? 
// remember to show that we don't actually need to return the number it was just simply a convenience
// when we return path we're just returning a reference to it, we're just simply returning a reference to something that was already created
// we don't have to create that handle to it within my function. I just like it better, it's not like it's anything fantastic

// Run and see how the test passed: npx jest Order
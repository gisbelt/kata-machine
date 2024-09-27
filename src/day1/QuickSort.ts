// let's just create a function we're gonna call quick_sort "qs"
// what do we need to return out? 
// if we really wanted to we could just rerturn back out the array to make it super simple. :number[], We don't have to do that.
function qs(arr: number[], lo: number, hi: number): void {
	// what's our base case?
	// Well, when we get to the point where low and high meet, all right. 
	// if low equals or is greater than or equal to high, 
	// I always put greater than, even though I don't think that can ever happen.
	if(lo >= hi) {
		// once this happens, we have now officially stopped needing to recurse. 
		// We've ended the line, so let's return, fantastic.
		return;
	}

	// If we don't hit that, we need to do three things 
	// 1. we need our pivot index 
	const pivotIdx = partition(arr, lo, hi); //this thing is gonna do the weak sort

	// 2. Now we need to repeat this again, but we need make sure we don't include the pivotIndex on out repeat
	qs(arr, lo, pivotIdx - 1); //it's inclusive endings, not exclusive endings

	// 3. We need to go to the pivot and beyond one (lo = 5+1)
	// Then we're gonna go up to the high.
	qs(arr, pivotIdx + 1, hi);

	// notice what we've did, 
	// we're gonna repeat the quicksort on one side of the array, 
	// on the other side of the array, but we're not including the pivot.
}


// we need the function partition. Which is gonna take in the array, the low, and the high cuz remember
// this thing needs to be able to run on all these little spots in here.
// example: it needs to be able to run, on one through seven, 
// so we need to be able to give it hey, you're running from low one, high seven, right?
// And it needs to return back out
// what is the pivot index? Where did we end up splitting the array to? 
// Where did we weekly sort this array? 
function partition(arr: number[], lo: number, hi: number): number {
	// arr [8,7,6,4,5] 
	// we'll just do the easy way which is I'm going to create a pivot
	// which is gonna be simply the array at the high position
	const pivot  = arr[hi]; //5

	// then at this point I'm gonna create an index 
	let idx = lo - 1;  

	// we have to walk from the low to the high, 
	// but not including the high because the high is the pivot. 
	// So we just have to now do a weak sort on this subarray
	for (let i = lo; i < hi; ++i) {
		// Now what are we comparing it to? 
		// Remember each element needs to be compared to the pivot, 
		// not like i plus one, not something adjacent to the pivot.
		if(arr[i] <= pivot) {
			// we now need to put that value into the first slot 
			// or the second slot or the third slot or however many slots we need 
			// to put it into to make this into a weakly sorted array.
			// in the most pseudocode you'll find that they first increment the index at this point, 
			// that is now we're now into the zeroeth position.
			// We went from negative one to the zeroeth position
			idx++; 
			const tmp = arr[i]; //4

			// The moment we find something we need to swap, 
			// we move it into the first position, now we do the flop.
			arr[i] = arr[idx]; //[8,7,6,4,5] 5 = pivot, arr[i] = 4 //[4,7,6,8,5]
			arr[idx] = tmp; //4
		} 
	}

	// We've now found everything and moved it over into the beginning 
	// of the array that is less than our pivot 
	// we have one problem left. What is the one problem left? 
	// what's the last thing we have to do? 
	// We have to put our pivot where the pivot index is, right? [4,5,7,6,8]
	idx++ // increment it once more.
	arr[hi] = arr[idx]; // arr[hi] = 5, arr[idx] we increment it [4,5,7,6,8]
	arr[idx] = pivot; //5

	return idx;
}

export default function quick_sort(arr: number[]): void {
	// pass in the array, and then we need to pass in the low and the high
	// the high it's inclusive, a very unusual thing you do. In most algorithms you don't do that
	// [lo, hi]
	qs(arr, 0, arr.length - 1);
}


// try the test: npx jest Quick


// let idx = -1
// This is where so, most books will actually create it at negative one. 
// You'll see why they do it in this specific way. 
// You don't have to do it this way, you'll just see most pseudocode, 
// I'm pretty sure if I went to Wikipedia right now, it would actually say that, start at negative one.
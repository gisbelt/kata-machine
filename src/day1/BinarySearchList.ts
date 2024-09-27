export default function bs_list(haystack: number[], needle: number): boolean {
	let lo = 0;
	let hi = haystack.length;

	do {	
		const m = Math.floor(lo + (hi - lo) / 2); //midpoint or the half it
		const v = haystack[m]; //value

		if ( v === needle ) {
			return true
		} else if ( v > needle ) { 
			// anything to the right hand side, is gonna be greater than me. 
			// So i want to reduce the high side to this point and exclude the midpoint.
			// remember hi as excusive, lo is inclusive.
			hi = m;
		} else {
			// What this means now is that our value is less than our needle 
			// we need search on the higher side. Our needle is greater than our value. 
			// that means if we're gonna exist in this array, we're somewhere in the greater side  region
			lo = m + 1; //drop the midpoint, you don't want to look at the midpoint again.
		}
	} while ( lo < hi );

	return false
}


// Remember that binary search is:
// That means effectively, we’d have an array of size N, right? Then we half it, 
// so now we have a value space that we’re looking at that is really 1/2N, 
// then we half it again so now we have a value space that‘s N/4 
// then we have a value space that’s N/8, 
// and it keeps getting smaller until a specific condition is met.

// So, we’re going to halving it a log on N amount of times.

// try the test: npx jest Binary
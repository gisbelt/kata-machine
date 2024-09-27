export default function two_crystal_balls(breaks: boolean[]): number {
	// let's assume that the array is big enough to have a square root. 
	const jmpAmount = Math.floor(Math.sqrt(breaks.length));

	// Now we use our first crystal ball to see where does it break?
	// We’re gonna start at the first jump cuz it will make sense. 
	let i = jmpAmount; //the amount we want to jump
	for (; i < breaks.length; i += jmpAmount ) {
		// now we just simply try to wait until we break 
		if ( breaks[i] ) {
			break;
		}
	}

	// Now we've just jumped back square root of N
	// we just simply need the walk forward square root of N
	i -= jmpAmount; 
	for ( let j = 0; j < jmpAmount && i < breaks.length; ++j, ++i) {
		// now we gonna make sure we walk maximium a jump amount of steps
		// If we find the breaking point, we can literally just return i
		if ( breaks[i] ) {
			return i;
		}
	}

	// we can return a negative one
	return -1;
}

// Run and see how the test passed: npx jest Two 
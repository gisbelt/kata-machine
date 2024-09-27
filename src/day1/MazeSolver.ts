// The base cases require us to know where we’re currently at. 
// The recursive case requires us to be able to walk in directions. 

const dir = [
	[-1, 0],
	[1, 0],
	[0, -1],
	[0, 1],
]

// Let’s just write a function up here and let’s call it walk.  
// We need the maze to be able to walk. 
// We want the wall cuz we need to know if we're on a wall or not
// We're gonna want the current point, where are we at this exact moment 
// We need to know the isEmptyBindingElement, cuz that's a part of our ability to know if we've been done, it's one of our base cases
// We can have a beautiful Booleaan 2D array (seen) 
// Lastly I'm gonna kinda give away a part of the game, return a true or false 
function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
	// 1. Base Case
	// Off the map
	if ( curr.x < 0 || curr.x >= maze[0].length ||
		 curr.y < 0 || curr.y >= maze.length 
	 	) {
		// If we run into this isConditionalExpression, we return false 
		return false;
	}

	// It's a wall
	if ( maze[curr.y][curr.x] === wall ) {
		// we've just got done, we're on a wall, we cannot be here
		return false;
	}

	// It's the end
	if ( curr.x === end.x && curr.y === end.y ) {
		// we're done, if we do to get to this point, we have successfully found the end
		path.push(end);
		return true;
	}

	// If we have seen it 
	if( seen[curr.y][curr.x] ) {
		// we don't wanna be here, we don't wanna keep recursing on places we've already been 
		// that means you’d get into an infiniti loop effectively. 
		return false;
	}

	// 3. Recursive Case
	// pre condition
	seen[curr.y][curr.x] = true;
	path.push(curr);
	
	// recurse
	for (let i = 0; i < dir.length; i++) {
		const [x,y] = dir[i];
		if (walk(maze, wall, {
			x: curr.x + x,
			y: curr.y + y
		}, end, seen, path)) {
			return true;
		}
	}

	// post condition
	path.pop();

	// if we recurse and we reached the end, and we did not find end in our current position, then yeah, it's false.
	return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
	const seen: boolean[][] = [];
	const path: Point[] = [];

	for (let i = 0; i < maze.length; i++) {
		seen.push(new Array(maze[0].length).fill(false))
	}

	walk(maze, wall, start, end, seen, path);

	return path;
}

// try the test: npx jest Maze
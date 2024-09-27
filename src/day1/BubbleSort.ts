export default function bubble_sort(arr: number[]): void {

	for (let i = 0; i < arr.length; i++) {
		// We gotta go up to not include also the last item
		// at the first iteration cuz we're do a plus 1, so let's minus 1 
		// Then remember: every single time we execute the last element becomes the largest
		// we dont't need redo that so we're also gonna minus i
		for (let j = 0; j < arr.length - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				// whatever your first line is you just repeat arr[j] equals arr[j+1]
				const tmp = arr[j]
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp
			}
		}
	}
}

// Run npx jest Bubble and see how the test passed.
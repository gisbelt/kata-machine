
const a: number[] = [];

function time(fn: () => void): number {
    const now = Date.now();
    fn();
    return Date.now() - now;
}
// adding to a list at the beginning
function unshift(number: number) {
    for (let i = 0; i < number; ++i) {
        a.unshift(Math.random());
    }
}
// removing from the beginning of the list
function shift(number: number) {
    for (let i = 0; i < number; ++i) {
        a.shift();
    }
}
// 
function push(number: number) {
    for (let i = 0; i < number; ++i) {
        a.push(Math.random());
    }
}

function pop(number: number) {
    for (let i = 0; i < number; ++i) {
        a.pop();
    }
}
// get based in index just in case it is a linked list underneath the hood.
function get(idx: number) {
    return function() {
        return a[idx];
    };
}
// call push with the same count every time, I can call it over and over again. 
function push_arr(count: number) {
    return function() {
        push(count);
    };
}

function pop_arr(count: number) {
    return function() {
        pop(count);
    };
}

function unshift_arr(count: number) {
    return function() {
        unshift(count);
    };
}

function shift_arr(count: number) {
    return function() {
        shift(count);
    };
}

// Lastly, we're gonna test with 10 elements, 100 elements, 1000, 10.000, 100.000
// Whenever you're doing performance testing, a little tip is:
// you should always do a stepladder type approach (enfoque tipo escalera)
// that way you can see how it grows, you can really actually run, say, a linear regression 
// and say, hey, this is kind of more what i'm seeing right here.
const tests = [10, 100, 1000, 10000, 100000, 1_000_000, 10_000_000];

// In every test we're gonna push in the value.

// We're going to do a get at the last element
// So if indexing is linear, we should see a slowdown as the array gets bigger.
// It should be 10x slower effectively every single, 10x time some constant.
console.log("Testing get");
tests.forEach(t => {
    a.length = 0;
    push(t);
    console.log(t, time(get(t - 1)));
});

// We're gonna push 1000 items after growing it to a certain length
// First we're gonna grow it to 10, we're gonna grow it to 100, we're gonna grow it to 1000, etc
// The at each one of those points, push in 1000 items .
// If push is based on the amount of items within the array, we should theoretically see a slowdown that happens
// It should be lenearly getting slower in every single step.
console.log("push");
tests.forEach(t => {
    a.length = 0;
    push(t);

    console.log(t, time(push_arr(1000)));
});

// Same thing with pop
console.log("pop");
tests.forEach(t => {
    a.length = 0;
    push(t);

    console.log(t, time(pop_arr(1000)));
});

// Same thing with unshift
console.log("unshift");
tests.forEach(t => {
    a.length = 0;
    push(t);

    console.log(t, time(unshift_arr(1000)));
});

// Same thing with shift
console.log("shift");
tests.forEach(t => {
    a.length = 0;
    push(t);

    console.log(t, time(shift_arr(1000)));
});

// If any of these are linear-based as we increase the size of our array by a factor of 10
// we should see a great slowdown in any of these (unshift and shift). 
// That way we can kinda test all the operations and at that point 
// we should be able to empirically know what type of list are we using

// The const a = [] is not a Array? The answer is it is definitely not, and it is an Array List.   

// Run: npx ts-node src/array-test.ts
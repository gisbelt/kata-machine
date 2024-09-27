
type QNode<T> = {
    value: T,
    next?: QNode<T>, // this may or may not exist. We don’t know how many elements we have.
}

export default class Queue<T> {
    public length: number; // Stores the number of items in the queue.
    public head?: QNode<T> | undefined; // Reference to the first node of the queue (or undefined if empty).
    private tail?: QNode<T> | undefined; // Reference to the last node of the queue (or undefined if empty).
    

    constructor() {
        // Assigns undefined to the head and tail properties of the queue. It means that the queue is initially empty, with no elements.
        this.head = this.tail = undefined; 
        this.length = 0;
    }

    // this is typically the phrase that is used when implementing a queue 
    enqueue(item: T): void {
        // create the node
        const node = { value: item, next: undefined } as QNode<T>;

        this.length++;
       
        // if there is no tail we have an empty array. Created the node. Our next is undefined, our value is the item.
        if( !this.tail ) {
            this.tail = this.head = node;
            return;
        }
        
        this.tail.next = node; // became the last item
        this.tail = node; // node is now the last one, now we are pointing it correctly
    }

    // this one is to remove it from the queue
    deque(): T | undefined {
        // if there is no head, let’s return undefined. 
        if( !this.head ) return undefined
        
        // Reduces the counter of items in the queue by 1, as one item is being removed. 
        this.length--;
        
        const h = this.head; // save your head
        this.head = this.head.next; // update head
        h.next = undefined;
        return h.value; // return value
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}

// Run and see how the test passed: npx jest Queue  
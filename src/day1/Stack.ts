
type Node<T> = {
    value: T,
    prev?: Node<T>,
}

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;
    
    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node = { value: item } as Node<T>
        this.length++;
        if ( !this.head ) {
            this.head = node;
            return
        }

        node.prev = this.head; 
        this.head = node; 
    }

    pop(): T | undefined {
        // that way we always stay at 0 or we count down.
        this.length = Math.max(0, this.length - 1);

        // if there is no head, let’s return undefined. 
        //  if( !this.head ) return undefined //it's better this way because typescript likes more
        if ( this.length === 0 ) {
            const head = this.head; // save your head
            this.head = undefined;
            return head?.value;
        }
        
        const head = this.head;
        this.head = this.head?.prev; // update head
        return head?.value; // return value
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}

// Run and see how the test passed: npx jest Stack 
type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;
    

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    private debug() {
        let curr = this.head;
        let out = "";
        for(let i = 0; curr && i < this.length; ++i) {
            out += `${i} => ${curr.value}`;
            curr = curr.next;
        }
        console.log(out);
    }

    prepend(item: T): void {
        // We’re gonna prepend something, we can start off by first creating the node. 
        const node = { value: item } as Node<T>;
        // we want to be able to know how many items are in this list 
        this.length++;
        // there's always is technically two conditions to a prepend or any of these 
        // if there is no head 
        // There's nothing here, we don't have anything, we can just set this as the head
        if (!this.head) {
            this.head = this.tail = node;
            // this.debug();
            return;
        }
        // if that's not the case let's do those exact steps again 
        // Remember, G points to A, A points the G, head points to G, we'll just do those three ones 
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        // this.debug();
    }
    
    insertAt(item: T, idx: number): void {
        // we're building our own head, we can actually add a better interface 
        // if out index is greater than our length, we kind of have a problem
        // I would probably just throw an error, right? 
        // No, right? You can't really do it at this point 
        // Well, there's actually something else that makes this a little bit interesting. 
        if(idx > this.length) {
            throw new Error("Oh no!");
        } 
        if(idx === this.length) {
            //  we're really just appending to the list, right? 
            //  So I mean, we can technically just call append, right? Yeah, why not?
            this.append(item);
            return;
        } else if(idx === 0) {
            // What if our index is zero? Well, just prepending it, right?
            this.prepend(item);
            return;
        }
        
        //bookkeeping, we increment the lenght as we walk.
        this.length++; 

        const curr = this.getAt(idx) as Node<T>;
            
        // Now we need to insert our new one 
        // The first thing we do, is create a node and attach it to the positions we want it to be at. 
        const node = { value: item } as Node<T>;
        // node.next, now needs to equal the current we're going to be inserting at 
        // Because in our diagram, we actually put F before C. We didn't put it after C, we put it before C 
        node.next = curr;
        node.prev = curr.prev;
        // we now attached our new node, 
        // now we need to break the prev link and point them correctly at our node
        curr.prev = node;

        // if that actually exists, which we do know, but we'll just say if it doesn't
        // we'll now say, hey, that one, we need to make sure also does the correct thing.
        if(node.prev) {
            // node.prev.next needs to point to F instea. You just have to kind of run that triangle there for for a second 
            // that way our two-way linking is correct
            node.prev.next = curr;
        }
    }

    append(item: T): void {
        // I guess did I take care of bookkeeping? We didn't take care of bookkeeping classic 
        this.length++;

        // First, create the node, attach it to the tail. Then tail to the node.
        const node = { value: item } as Node<T>;
        if(!this.tail) {
            this.tail = this.head = node;
            // this.debug();
            return;
        } 

        // We need to take our tail and we need to point to it
        node.prev = this.tail;
        // Now the tail needs to point to the node 
        this.tail.next = node;
        // Now we need to update the tail to point to our newly added node
        this.tail = node;
    }
    
    remove(item: T): T | undefined {
        // We'd need to do the same thing as get, or remove at, or an insert at. 
        let curr = this.head;
        
        // You don't really technically have to do that, but for the case of TypeScript, we have to do it. 
        // Because if "i" is less than length, current better be a real object, or we've completely screwed up our implementation
        for (let i = 0; curr && i < this.length; ++i) {
            // if it does equal the item, we have found it, we can break 
            if( curr.value === item) break;
            // else we're gonna keep on scrolling until we get to the end of the list, or currents does not exist. 
            curr = curr.next;            
        }

        // if there is no current, there is no item to remove
        if (!curr) {
            return undefined;
        }
      
        // Lastly, completly break it all 
        // you don't have to do this in the JavaScript land. JavaScript automatically clean this up for you. 
        
        return this.removeNode(curr);
    }
    
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }
    
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if(!node) {
            // there's no node tobe found, we dont need to return anything 
            return undefined;
        }

        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        //do some bookkeeping
        this.length--; 

        // we already have node, which is the thing we're gonna want to delete. 
        // what we really need to do is think about the three possible conditions 
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out; // Return, nothing left to do, we're good to go
        }
    
        // If we have a previous, let's set our previous to our next
        // we need to hop over (saltar) 
        // nodes previous next needs now jump across to node next. 
        if (node.prev) {
            node.prev.next = node.next;
        }

        // Nodes next previous needs to jump across to node previous. 
        if (node.next) {
            node.next.prev = node.prev;
        }

        // we can do couple extra checks 
        // we can't quite break that. 
        // Just to make sure our tail or head are now pointing at the newest item
        if (node === this.head) {
            // Move it up in the list. 
            this.head = node.next;
        }
        if (node === this.tail) {
            // Walk it back one step
            this.tail = node.prev;
        }

        // Now we're officially remove out node from our linked list. 
        
        // We should theoretically have two separate lists on right here, node, which is all by itself, and the rest of our linked list.
        node.prev = node.next = undefined;
    
        // Lastly, completly break it all 
        // you don't have to do this in the JavaScript land. JavaScript automatically clean this up for you. 
        
        return node.value;
    }

    private getAt(idx: number): Node<T> | undefined{
        // we also need to traverse the list
        let curr = this.head;
        // now we need to simply just walk, until we get to the index.
        // then at that point, we will have the node in which we need to replace 
        // there's things that we know that TypeScript doesn't know, 
        // so we'll have to do a bit of casting
        // of course, we also have to make sure current is actually a thing as we get there
        // or else we're gonna get null exceptions
        for(let i = 0; curr && i < idx; ++i) {
            curr = curr.next;
        }
        return curr;
    }
}

// const test: DoublyLinkedList<undefined> = new DoublyLinkedList<undefined>;
// Run and see how the test passed: npx jest Doubly 
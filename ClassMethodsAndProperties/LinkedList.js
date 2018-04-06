/*jslint devel: true */
/*jslint es6 */
'use strict';

class listNode {
    constructor() {

    }
}
class LinkedList {
    constructor() {
        this._length = 0;
        this._head = null;
    }
    get length() {
        return this._length;
    }
    get first() {
        return this._head.data;
    }
    get last() {

    }
    append(...args) {
        let current;
        args.forEach((value, index, arr) => {
            let node = {
                data: value,
                next: null
            };
            if (this._head === null) {
                this._head = node;
                this._length++;
            } else {
                current = this._head;
                while (current.next !== null) {
                    current = current.next;
                }
                current.next = node; 
                this._length++;
            }
        });
        this[Symbol.iterator] = function* () {
            current = this._head;
                while (current.next !== null) {
                    yield current.data;
                    current = current.next;
                }
            yield current.data;
        };
        return this; 
    }
    prepend(...args) {

    }
    insert(index, ...args) {

    }
}
let myList = new LinkedList()
    .append({ a: 1, b: 2 }, [3, 4], 5.99932, 'Hello 6')
    .append(['Text data']);
for (let el of myList) {
    console.log(el);
}

/*jslint devel: true */
/*jslint es6 */
'use strict';

class listNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
    get first() {

    }
    get last() {

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
                while (current.next) {
                    current = current.next;
                }
                current.next = node;
                this._length++;
            }
        });
    }
    prepend(els) {

    }
    insert(index, els) {

    }
}
let myList = new LinkedList();
myList.append({ a: 1, b: 2 }, [3, 4], 5.99932, 'Hello 6');
console.log(myList);

/*jslint devel: true */
/*jslint es6 */
'use strict';

class listNode {
    constructor(data) {
        this._data = data;
        this._next = null;
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
        if (this._length !== 0) {
            return this._head.data;
        } else {
            return this._head;
        }
    }
    get last() {
        let current;
        if (this._length !== 0) {
            current = this._head;
            while (current.next !== null) {
                current = current.next;
            }
            return current.data;
        } else {
            return this._head;
        }
    }
    append(...args) {
        let node,
            current;
        args.forEach((value, index, arr) => {
            node = new listNode(value);
            if (this._head === null) {
                this._head = node;
                this._length++;
            } else {
                current = this._head;
                while (current._next !== null) {
                    current = current._next;
                }
                current._next = node;
                this._length++;
            }
        });
        if (args.length === 0) {
            return this;
        }
        this.makeIterable();
        return this;
    }
    prepend(...args) {
        const queue = this._head;

        return this;
    }
    insert(index, ...args) {

    }
    makeIterable() {
        let current;
        this[Symbol.iterator] = function* () {
            current = this._head;
            while (current._next !== null) {
                yield current._data;
                current = current._next;
            }
            yield current._data;
        };
    }
}
let myList = new LinkedList()
    .append({ a: 1, b: 2 }, [3, 4], 5.99932, 'Hello 6')
    .append(['Text 7']);
for (let el of myList) {
    console.log(el);
}

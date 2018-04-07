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
        if (args.length === 0) {
            return this;
        }
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
        this.makeIterable();
        return this;
    }
    prepend(...args) {
        if (args.length === 0) {
            return this;
        }
        const queue = this._head;
        this._head = null;
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
        if (args.length === 1) {
            this._head._next = queue;
        } else {
            current._next._next = queue;
        }
        this.makeIterable();
        return this;
    }
    insert(index, ...args) {
        if (args.length === 0) {
            return this;
        }
        if (index === 0) {
            this.prepend(args);
            this.makeIterable();
            return this;
        } else if (index >= this._length) {
            this.append(args);
            this.makeIterable();
            return this;
        }
        let countIndex = 0,
            current = this._head;
        while (current._next !== null && countIndex < index) {
            current = current._next;
            countIndex++;
        }
        const queueLength = this._length - countIndex;
        const queue = current;
        //===========================
        let lengthInsertPart = 0,
            node;
        countIndex = 0;
        current = this._head;
        while (countIndex < index - 1) {
            current = current._next;
            countIndex++;
        }
        args.forEach(value => {
            node = new listNode(value);
            current._next = node;
            while (current._next !== null) {
                current = current._next;
            }
            lengthInsertPart++;
        });
        this._length = lengthInsertPart + countIndex + 1;
        //===========================
        current = this._head;
        while (current._next !== null) {
            current = current._next;
        }
        current._next = queue;
        this._length += queueLength;
        this.makeIterable();
        return this;
    }
    at(index, value) {
        if (index < this._length - 1 && value === undefined) {
            let counter = 0;
            for (let el of this) {
                if (counter === index) {
                    return el;
                }
                counter++;
            }
        } else if (index < this._length - 1 && value !== undefined) {
            let current = this._head,
                counter = 0;
            while (current._next !== null && counter !== index) {
                current = current._next;
                counter++;
            }
            current._data = value;
        }
    }
    removeAt(index) {
        let removed = this.at(index),
            current = this._head,
            counter = 0;
            while (current._next !== null && counter !== index - 1) {
                current = current._next;
                counter++;
            }
            current._next = current._next._next;
            this._length = this._length - 1;
        return removed;
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
    .append(['Text 7'])
    .prepend('Begin')
    .insert(1, { x: 'inserted' }, { y: 'second inserted' })
    .insert(7, 'Hi');
for (let el of myList) {
    console.log(el);
}
myList.at(4, 'changed!');
console.log('=======================/');
for (let el of myList) {
    console.log(el);
}
console.log('=======================/');
myList.removeAt(5);
for (let el of myList) {
    console.log(el);
}

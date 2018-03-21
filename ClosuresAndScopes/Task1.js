/*jslint devel: true */
/*jslint es6 */
'use strict';

class Library {
    constructor() {
        this.library = [];
        this.category = [];
    }
    get list() {
        return this.library;
    }
    addNewBook(title, author, category) {
        let book = {
            title: title,
            author: author,
            ISBN: '978-3-16-148410-0',
            category: category,
            id: this.library.length + 1
        },
            checkCat = true;
        if (category === undefined) {
            book.category = 'Any';
        }
        for (let el in this.category) {
            if (this.category[el].toLowerCase() === book.category.toLowerCase()) {
                checkCat = false;
                break;
            }
        }
        if (book.author === undefined) {
            return console.log(book.title + ' - Must provide book\'s author');
        }
        if (checkCat) {
            this.category.push(book.category);
            this.category.sort();
        }
        this.library.push(book);
        return book;
    }
    sortByTitle() {
        return this.library.concat().sort(function(a, b) {
            if (a.title < b.title) {
                return -1;
            } else if (a.title > b.title) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    sortByAuthor() {
        return this.library.concat().sort(function(a, b) {
            if (a.author < b.author) {
                return -1;
            } else if (a.author > b.author) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    sortByCategory() {
        let sorted = {},
            copyCategory = this.category.concat();
        for (let el in copyCategory) {
            let filteredLibrary = this.library.filter(item => item.category === copyCategory[el]);
            sorted[copyCategory[el]] = filteredLibrary.sort(function(a, b) {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id > b.id) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        return sorted;
    }
}
let myLibrary = new Library();
myLibrary.addNewBook('Genesis', 'Sebastião Salgado', 'Photo-book');
myLibrary.addNewBook('Harry Potter', 'J.K. Rowling', 'Fantasy');
myLibrary.addNewBook('Dali\'s Mustache', 'Salvador Dalí and Philippe Halsman', 'Photo-book');
myLibrary.addNewBook('Fifty Shades of Grey');
console.log(myLibrary.sortByCategory());
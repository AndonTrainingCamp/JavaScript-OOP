/*jslint devel: true */
/*jslint es6 */
'use strict';

const course = (function () {
    let courseName,
        presentationsNames = [],
        students = [],
        homeworks = [],
        results = [];

    return {
        init: function (title, presentations) {
            if (title.length < 1 || title[0] === ' ' || title[title.length - 1] === ' ' || title.search(/\s{2,}/g) !== -1) {
                throw title + ': Invalid course title';
            } else if (presentations.length === 0) {
                throw presentations + ': Missing presentation/s';
            }
            presentations.forEach(element => {
                if (element.length < 1 || element[0] === ' ' || element[element.length - 1] === ' ' || element.search(/\s{2,}/g) !== -1) {
                    throw element + ': Invalid presentation title';
                }
            });
            courseName = title;
            presentations.forEach(element => {
                presentationsNames.push(element);
            });
        },
        addStudent: function (name) {
            let fullname = name.match(/\w+/g),
                id;
            if (fullname[0].search(/[A-Z]/) !== 0 || fullname[1].search(/[A-Z]/) !== 0) {
                throw name + ': Invalid student name';
            }
            
            return id;
        },
        getAllStudents: function () {

        },
        submitHomework: function (studentID, homeworkID) {

        },
        pushExamResults: function (results) {

        },
        getTopStudents: function () {

        }
    };
}());
let presents = ['Lection 1', 'Lection 2', 'Lection 3'];
course.init('Javascript Fundamentals', presents);
course.addStudent('Lili Ivanova');

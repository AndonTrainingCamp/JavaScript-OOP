/*jslint devel: true */
/*jslint es6 */
'use strict';

function solve() {
    let courseName = '',
        presentationsNames = [],
        students = [],
        homeworks = [],
        examResults = [],
        studentID = 0;
    const Course = {
        init: function (title, presentations) {
            if (title.length < 1 || title[0] === ' ' || title[title.length - 1] === ' ' || title.search(/\s{2,}/g) !== -1) {
                throw title + ' : Invalid course title';
            } else if (presentations.length === 0) {
                throw presentations + ' : Missing presentation/s';
            }
            presentations.forEach(element => {
                if (element.length < 1 || element[0] === ' ' || element[element.length - 1] === ' ' || element.search(/\s{2,}/g) !== -1) {
                    throw element + ' : Invalid presentation title';
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
                throw name + ' : Invalid student name';
            }
            studentID++;
            let student = {
                firstname: fullname[0],
                lastname: fullname[1],
                id: studentID
            };
            students.push(student);
            return studentID;
        },
        getAllStudents: function () {
            let arrStudents = [];
            for (let i = 0; i < students.length; i++) {
                arrStudents[i] = {};
                for (let el in students[i]) {
                    arrStudents[i][el] = students[i][el];
                }
            }
            return arrStudents;
        },
        submitHomework: function (studentID, homeworkID) {
            let isPassStudentID = false,
                isPassHomeworkID = false;
            students.forEach(element => {
                if (element.id === studentID) {
                    isPassStudentID = true;
                }
            });
            presentationsNames.forEach((el, index) => {
                if (index + 1 === homeworkID) {
                    isPassHomeworkID = true;
                }
            });
            if (!isPassStudentID || !isPassHomeworkID) {
                throw 'Invalid student or homework ID';
            }
            let homework = {
                studentID: studentID,
                homeworkID: homeworkID
            }
            homeworks.push(homework);
        },
        pushExamResults: function (results) {
            let isValidID = false,
                idInputHistory = [];
            for (let el in results) {
                for (let el2 in students) {
                    if (results[el].StudentID === students[el2].id) {
                        isValidID = true;
                    }
                }
            }
            for (let el in results) {
                idInputHistory.push(results[el].StudentID);
            }
            for (let el in results) {
                examResults.push(results[el]);
            }
        },
        getTopStudents: function () {

        }
    };
    return Course;
}
let course1 = solve(),
    presents = ['Lection 1', 'Lection 2', 'Lection 3'];
course1.init('Javascript Fundamentals', presents);
course1.addStudent('Lili Ivanova');
course1.addStudent('Gosho Patkanov');
console.log(course1.getAllStudents());
course1.submitHomework(1, 1);

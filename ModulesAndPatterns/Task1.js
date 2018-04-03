/*jslint devel: true */
/*jslint es6 */
'use strict';

function solve() {
    let courseName = '',
        presentationsNames = [],
        students = [],
        homeworks = [],
        examResults = {},
        lastStudentID = 0;
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
            lastStudentID++;
            let student = {
                firstname: fullname[0],
                lastname: fullname[1],
                id: lastStudentID
            };
            students.push(student);
            return lastStudentID;
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
        submitHomework: function (StudentID, homeworkID) {
            let isPassStudentID = false,
                isPassHomeworkID = false;
            students.forEach(element => {
                if (element.id === StudentID) {
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
                StudentID: StudentID,
                homeworkID: homeworkID
            }
            homeworks.push(homework);
        },
        pushExamResults: function (results) {
            let isValidID = false,
                idInputHistory = [];
            // If valid
            checkInvalidStudentID();
            checkSameStudentID();
            checkIsNumberScore();
            // Save results
            for (let el in results) {
                examResults[results[el].StudentID] = results[el].score;
            }
            // Validation test functions
            function checkInvalidStudentID () {
                for (let el in results) {
                    for (let el2 in students) {
                        if (results[el].StudentID === students[el2].id) {
                            isValidID = true;
                        }
                    }
                    if (!isValidID) {
                        throw 'Invalid StudentID';
                    } else {
                        isValidID = false;
                    }
                }
            }
            function checkSameStudentID () {
                for (let el in results) {
                    idInputHistory.push(results[el].StudentID);
                }
                idInputHistory.forEach(currID => {
                    if (idInputHistory.filter(id => id === currID).length >= 2) {
                        throw 'Error: Same StudentID exist';
                    }
                });
            }
            function checkIsNumberScore () {
                results.forEach(element => {
                    if (isNaN(element.score)) {
                        throw 'Invalid score'
                    }
                });
            }
        },
        getTopStudents: function () {
            const resultArr = students.map(student => {
                const homeworkCounter = homeworks.filter(el => el.StudentID === student.id).length;
                const examComponent = (examResults[student.id] || 0) * 75 / 100;
                const hwComponent = homeworkCounter/presentationsNames.length * 25 / 100;
                const finalScore = examComponent + hwComponent;
                const copyOfStudent = Object.assign({_finalScore: finalScore}, student);
                return copyOfStudent;
            }).sort((a, b) => b._finalScore - a._finalScore);
            console.log(students);
            if (resultArr.length <= 10) {
                return resultArr.slice(0, 9);
            } else {
                return resultArr;
            }
        }
    };
    return Course;
}
let course1 = solve(),
    presents = ['Lection 1', 'Lection 2', 'Lection 3'];
course1.init('Javascript Fundamentals', presents);
course1.addStudent('Lili Ivanova');
course1.addStudent('Gosho Patkanov');
course1.addStudent('Bat Man');
console.log(course1.getAllStudents());
course1.submitHomework(3, 2);
course1.submitHomework(1, 1);
course1.submitHomework(2, 1);
course1.submitHomework(2, 2);
course1.submitHomework(2, 3);
let studentsExamInput = [ {StudentID: 1, score: 40}, {StudentID: 2, score: 60} ];
course1.pushExamResults(studentsExamInput);
console.log(course1.getTopStudents());

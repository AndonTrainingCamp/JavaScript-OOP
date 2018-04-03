// Designed to replace Task1.js's getTopStudents
// Out of scope variables like students, presentationNames and finalScores should be supplied from Task1.js's higher scope
// DISCLAIMER: this code has not been tested, so errors might occur!

const getTopStudents = function (limit) { // used to limit the amount of students to return can be easily made to default to something say (limit = 10)
    return students.map(student => { // from the first line we know that we'll be returning an array
         // getting homeworks count with reduce OR filter. both will default to 0 if no homeworks
        const homeworksCount = homeworks.filter( hw => hw.studentID === student.id).length;
        // const homeworksCount = homeworks.reduce( (accu, hw) => (hw.studentID === student.id ? 1 : 0), 0);

        const hwComponent = homeworksCount/presentationsNames.length * 25 / 100;
        // important to leave default 0 if examResults[student.id] is undefined since undefined * number = NaN
        const examComponent = (examResults[student.id] || 0) * 75 / 100;

        student._finalScore = hwComponent + examComponent; // '_' hints that finalScore will be internally used

        //This is the place to fill finalScores[student.id] if needed.

        return student; //every student now has internal property _finalScore which we will use to sort the top students
    })
    .sort( (a, b) => b._finalScore - a._finalScore) // sorts descending. Will be easy to implement ascending order if need occurs
    .slice(0, limit); // if limit is undefined will naturally return the entire array of students
}

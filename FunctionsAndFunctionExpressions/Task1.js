/*jslint devel: true */
/*jslint es6 */
'use strict';

let input = [10,20,'30', null, '1.5'];

try {
    sumNumbers(input);
}
catch(msg) {
    console.log(msg);
}

function sumNumbers(numArr) {
    if (numArr === undefined || !(Array.isArray(numArr))) {
        throw 'Array is UNDEFINED or input is NOT AN ARRAY to calculate!';
    }
    if (numArr.length === 0) {
        console.log('There are NO ELEMENTS in the array to calculate!');
        return null;
    }
    for (let el in numArr) {
        if (!(Number.isNaN(+(numArr[el]))) && Number.isFinite(+(numArr[el]))) {
        } else {
            console.log(numArr[el] + ' is not a real number. Can\'t calculate the sum!');
            return NaN;
        }
    }
    let result = 0;
    for (let el in numArr) {
        result += +(numArr[el]);
    }
    console.log(result);
    return result;
}
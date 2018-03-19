/*jslint devel: true */
/*jslint es6 */
'use strict';

try {
    console.log(primeNumbers(    ));  // Throw error
}
catch(msg) {
    console.log(msg);
    try {
        console.log(primeNumbers('hi', 'pesho'));  // Throw error
    } catch(msg) {
        console.log(msg);
    }
    console.log(primeNumbers(8, 10)); // Empty array []
    console.log(primeNumbers(0, 5));  // [2,3,5]
    console.log(primeNumbers(1, 5));  // [2,3,5]
    console.log(primeNumbers('1', '5')); // [2,3,5]
}

function primeNumbers(start, end) {
    let primes = [];
    if (start === undefined || end === undefined) {
        throw 'Missing parameter';
    }
    start = +start;
    end = +end;
    if (isNaN(start) || isNaN(end)) {
        throw 'Some of the parameters are not a numbers';
    } else if (start === end && start === 2) {
        primes.push(start);
        return primes;
    } else if (end < 2) {
        return primes;
    } else if (start <= 2) {
        primes.push(2);
        start = 3;
    }
    let isPrime = true,
        currentNum,
        div;
    for (currentNum = start; currentNum <= end; currentNum++) {
        for (div = 2; div < currentNum; div++) {
            if (currentNum % div) {
                isPrime = true;
            } else {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(currentNum);
        }
    }
    return primes;
}
const fs = require('fs');

function readDataFromFile(filename) {
    return fs.readFileSync(filename, 'utf8').split('\n').map(line => line.split(' ').map(Number));
}

function isSafeReport(report) {
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 0; i < report.length - 1; i++) {
        const diff = report[i + 1] - report[i];

        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
        if (diff <= 0) {
            isIncreasing = false;
        }
        if (diff >= 0) {
            isDecreasing = false;
        }
    }

    return isIncreasing || isDecreasing;
}

function countSafeReports(filename) {
    const reports = readDataFromFile(filename);
    let safeCount = 0;

    for (let report of reports) {
        if (isSafeReport(report)) {
            safeCount++;
        }
    }
    return safeCount;
}

const filename = 'dataDay2.txt'; 
const safeReportsCount = countSafeReports(filename);
console.log(`Number of safe reports: ${safeReportsCount}`);

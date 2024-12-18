const fs = require('fs');

function processFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        const normalizedData = data.replace(/\r\n/g, '\n');
        const lines = normalizedData.split('\n').filter(line => line.trim() !== '');
        let leftList = [];
        let rightList = [];

        lines.forEach(line => {
            const numbers = line.trim().split(/\s+/);

            if (numbers.length === 2) {
                leftList.push(Number(numbers[0]));
                rightList.push(Number(numbers[1]));
            } else {
                console.warn(`Skipping invalid line: "${line}"`);
            }
        });

        const totalDistance = calculateTotalDistance(leftList, rightList);
        console.log("Total Distance:", totalDistance);

        const similarityScore = calculateSimilarityScore(leftList, rightList);
        console.log("Total Similarity Score:", similarityScore);
    });
}

function calculateTotalDistance(leftList, rightList) {
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    let totalDistance = 0;

    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

function calculateSimilarityScore(leftList, rightList) {
    let frequencyMap = {}; 

    for (let i = 0; i < rightList.length; i++) {
        let num = rightList[i]; 
        if (frequencyMap[num]) {
            frequencyMap[num] += 1;
        } else {
            frequencyMap[num] = 1; 
        }
    }
    
    let similarityScore = 0;
    leftList.forEach(num => {
        const frequency = frequencyMap[num] || 0;
        similarityScore += num * frequency;
    });

    return similarityScore;
}

processFile('data.txt');

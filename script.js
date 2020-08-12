// Grabbing the elements from the DOM
const mileInput = document.getElementById("number-of-mile");
const addBtn = document.getElementById('add-btn');
const days = document.querySelectorAll('.days');
const total = document.getElementById('total');
const averageDistance = document.getElementById('average-distance');
const thisWeeksHigh = document.getElementById('this-weeks-high');
const progressDiv = document.getElementById('progress');
const currentProgress = document.getElementById('current-progress');
const weeklyTarget = document.getElementById('weekly-target');
let daysArray = Array.from(days);


//Function for populating total,this weeks High and Average distance
let populateData = () => {
    let numberOfDay = 0, totalDistance = 0, index = 0, length = daysArray.length, avgDistance, largestMile;
    largestMile = Number(daysArray[index].innerText);
    while (index < length && daysArray[index].innerText !== '-') {
        let miles = Number(daysArray[index].innerText)
        if (largestMile < miles) {
            largestMile = miles;
        }
        numberOfDay++;
        totalDistance += miles;
        index++;
    }
    avgDistance = totalDistance / numberOfDay;
    total.innerText = totalDistance;
    averageDistance.innerText = avgDistance.toFixed(2);
    thisWeeksHigh.innerText = largestMile;
}

// Function for populating progress
let populateProgress = () => {
    let totalMile = Number(total.innerText);
    let weeklyTargetValue = totalMile;
    let progressPercentage = (totalMile / 25 * 100);
    if (progressPercentage > 100) {
        progressPercentage = 100;
    }
    if (weeklyTargetValue > 25) {
        weeklyTargetValue = 25;
    }
    progressDiv.style.display = 'block';
    currentProgress.innerText = progressPercentage.toFixed(1);
    weeklyTarget.innerText = weeklyTargetValue;
}

//Validating the input given by the user
let validateUserInput = (userInput) => {
    if (userInput === '' || Number(userInput) < 0) {
        return false;
    } else {
        return true;
    }
}

//Taking input from the user
const dataInput = () => {
    let value = mileInput.value;
    if (validateUserInput(value)) {
        mileInput.value = '';
        let index = 0;
        let length = daysArray.length;
        while (index < length && daysArray[index].innerText !== '-') {
            index++;
        }
        if (index < length) {

            daysArray[index].innerText = value;
            populateData();
            populateProgress();
        } else {
            if (confirm('Do You want to start new Week?')) {
                daysArray.forEach((element) => {
                    element.innerText = '-';
                })
                total.innerText = 0;
                averageDistance.innerText = 0;
                thisWeeksHigh.innerText = 0;
                currentProgress.innerText = 0;
                weeklyTarget.innerText = 0;
            }
        }
    }
    else {
        alert('Please Enter Valid Input.')
    }
}

//Event listening in add btn
addBtn.addEventListener('click', dataInput);

// Event listening in mile input
mileInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        dataInput();
    }
});


//Lets create an object constructor for storing data in local storage
function data(daysData, totalMile, avgDistance, weeksHigh, weekTarget, progressPercent) {
    this.daysData = daysData;
    this.totalMile = totalMile;
    this.avgDistance = avgDistance;
    this.weeksHigh = weeksHigh;
    this.weekTarget = weekTarget;
    this.progressPercent = progressPercent;
}

//Write all the information on localstorage when user close the page 

let writeOnLocalStorage = () => {
    let index = 0;
    let length = daysArray.length;
    let arrayOfElement = [];
    while (index < length && daysArray[index].innerText !== '-') {
        let value = Number(daysArray[index].innerText);
        arrayOfElement.push(value);
        index++;
    }
    let totalMile = total.innerText;
    let avgDistance = averageDistance.innerText;
    let weeksHigh = thisWeeksHigh.innerText;
    let weekTarget = weeklyTarget.innerText;
    let progressPercent = currentProgress.innerText;
    let ourData = new data(arrayOfElement, totalMile, avgDistance, weeksHigh, weekTarget, progressPercent);
    localStorage.setItem('runningTracker', JSON.stringify(ourData));
}
window.addEventListener('unload', writeOnLocalStorage);

//Read all the information from local storage when user again open the page
let readFromLocalStorage = () => {
    let ourData = localStorage.getItem('runningTracker');
    if (ourData) {
        let actualData = JSON.parse(ourData);
        actualData.daysData.forEach((element, index) => {
            daysArray[index].innerText = element;
        });
        total.innerText = actualData.totalMile;
        averageDistance.innerText = actualData.avgDistance;
        thisWeeksHigh.innerText = actualData.weeksHigh;
        weeklyTarget.innerText = actualData.weekTarget;
        currentProgress.innerText = actualData.progressPercent;
        if (actualData.progressPercentage > 0) {

            progressDiv.style.display = 'block';
        }

    }
}
window.addEventListener('load', readFromLocalStorage);


//Pramesh Karki
//Parameswarkarki@gmail.com


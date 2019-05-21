// var task = document.querySelector('.todo-item'); 
var tableBody = document.querySelector('tbody');
var add = document.querySelector('#add');
var currentTime = document.querySelector('#current-time');
var toggleStatusElement = document.querySelector('#status');


function toggleStatus(element) {
    var text = element.innerText;
    var textList = text.split(" ");
    //Getting the vale of the text and toggling hide 
    if(textList[0].toLowerCase() === "show"){
        element.innerText = 'Hide ' + textList[1];
    }else{
        element.innerText = 'Show ' + textList[1];
    }
} 

function toggleCompletion(element) {
    var text = element.innerText;
    console.log(element.parentElement.previousSibling)
    //getting the value of the text and toggling hide
    if(text.trim().toLowerCase() === 'incomplete'){
        element.innerText = 'Complete';    
        element.parentElement.previousSibling.innerText = 'InComplete';
    }else{
        element.innerText = 'Incomplete';
        element.parentElement.previousSibling.innerText = 'Complete';
    }
}

toggleStatusElement.addEventListener('click', (e)=>{
    var clickedElement = e.srcElement;
    toggleStatus(clickedElement);
    tableBody.classList.toggle('visible-all');
});

function toggleTask(e) {
    e.srcElement.parentElement.parentElement.classList.toggle('hide');
    //Toggle complete || incomplete
    toggleCompletion(e.srcElement);
}

function deleteAction(e) {
    e.srcElement.parentElement.parentElement.remove();
    clearTask();
}

function changeStatus(e) {
    var statusButton = document.querySelector('.btn.btn-success');
    statusButton.innerText = 'Incomplete';

    var statusElement = statusButton.parentElement.parentElement.lastChild.previousSibling;
    statusElement.innerText = 'Completed'
}

function enterTask() {
    var response = prompt('Enter the Todo Item');

    generateTodo(1, response, Date(), 'incomplete');
}

function getWeek(week) {
    switch (week) {
        case 0:
            return 'Sunday';
            break;
        case 1:
            return 'Monday';
            break;
        case 2:
            return 'Tuesday';
            break;
        case 3:
            return 'Wednesday';
            break;
        case 4:
            return 'Thrusday';
            break;
        case 5:
            return 'Friday';
            break;
        case 6:
            return 'Saturday';
            break;
    
        default:
            break;
    }
}


function getTime() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();        
        var week = getWeek(date.getDay());
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var amPm;
        var updatedMin;

        if(hour <12){
            amPm = 'AM';
        }else{
            amPm = 'PM';
        }

        if(hour < 12){
            var updatedHour = hour;
        }else{
            var updatedHour = hour - 12; 
        }
        
        if(min<10){
            updatedMin = `0${min}`;
        }else{
            updatedMin = min;
        }

        if(sec<10) {
            var updatedSec = `0${sec}`;
        }else{
            var updatedSec = sec;
        }
        
        var time = `${updatedHour}:${updatedMin}:${updatedSec}`;
        currentTime.innerText = time ;
        
        var fullDate = `${day}/${month+1}/${year} ${week} ${hour}:${updatedMin} ${amPm} ` ;
        return fullDate;
}



function generateTodo(sn, title, date, status) {
    //JS allows the user to pass any number of args so we check if the sn is present
    // if (typeof sn === 'undefined') {
        //     throw Error("There must be a serial number to run this behaviour")
        // }
    var tableRow = document.createElement('tr');
    var snDes = document.createElement('td');
    snDes.innerText = sn;
    var titleRow = document.createElement('td');
    titleRow.innerText = title;
    var dateRow = document.createElement('td');
    dateRow.innerText = date;
    var statusRow = document.createElement('td');
    statusRow.innerText = status;
    var options = document.createElement('td');
    var optionDelete = document.createElement('button');
    optionDelete.innerText = "Delete";
    optionDelete.classList.add("btn","btn-danger");
    
    //Adding event to the button 
    optionDelete.addEventListener('click', deleteAction);
    
    var optionStatus = document.createElement('button'); 
    optionStatus.innerText = "Completed";
    optionStatus.classList.add("btn", "btn-primary");
    optionStatus.addEventListener('click', toggleTask);

    //Appending buttons to the table
    options.append(optionDelete);
    options.append(optionStatus);
    tableRow.append(snDes, titleRow, dateRow, statusRow, options);
    
    return tableRow;
    
}

function addToList(sn, title, date, status) {
    var generatedData = generateTodo(sn, title, date, status)
    tableBody.append(generatedData);
}

function storeTask(initialNumber, response, getTime, status) {
    var obj = {
        SN : initialNumber,
        item: response,
        time: getTime,
        status: status
    }
    
    localStorage.setItem('obj', JSON.stringify(obj));
}

function loadTask() {
    var task = JSON.parse(localStorage.getItem('obj'));
    console.log(task);
    addToList(task.SN,task.item, task.time, task.status);
}

function clearTask(params) {
    localStorage.clear();
}

function askUserAndOutput() {
    var response = prompt("Enter your todo item");   
    var initialNumber = 1;
    
    if(tableBody.lastElementChild){
        //parsing last Serial Number field from the table
        var lastNumber = parseInt(tableBody.lastElementChild.children[0].innerText);
        initialNumber = lastNumber +1;
    }
    
    addToList(initialNumber, response, getTime(), 'Incomplete');
    storeTask(initialNumber, response, getTime(), 'Incomplete');
}

window.addEventListener('DOMContentLoaded', loadTask);
add.addEventListener('click', askUserAndOutput);  
setInterval(getTime, 1000);

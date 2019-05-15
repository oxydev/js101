var task = document.querySelector('.todo-item');
var tableBody = document.querySelector('tbody');
var add = document.querySelector('#add');
var currentTime = document.querySelector('#current-time');

/*
function generateTodo(sn, title, date, status) {
    var row = document.createElement('tr');
    row.innerHTML=`<td>${sn}</td>
                    <td>${title}</td>
                    <td>${date}</td>
                    <td>${status}</td>
                    <td>
                    <button class="delete">Delete<button><button>complete</button>
                    </td>
                    `;
    tableBody.append(row);

    var button = document.querySelector('.button');
    button.addEventListener('click',()=>{
        alert('delete');
    })
}
*/

function deleteAction(e) {
    e.srcElement.parentElement.parentElement.remove();
}

function changeStatus(e) {
    var statusButton = document.querySelector('.btn.btn-success');
    statusButton.innerText = 'Incomplete';

    var statusElement = statusButton.parentElement.parentElement.lastChild.previousSibling
    statusElement.innerText = 'Completed'
}
function enterTask() {
    var response = prompt('Enter the Todo Item');

    generateTodo(1, response, Date(), 'incomplete');
}


function getTime() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        currentTime.innerText = `${hour}:${min}:${sec}`;

        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();

        var fullDate = `${day}/${month}/${year}`;
        return fullDate;

}

setInterval(getTime, 1000);

function generateTodo(sn, title, date, status) {
    //JS allows the user to pass any number of args so we check if the sn is present
    // if (typeof sn === 'undefined') {
    //     throw Error("There must be a serial number to run this behaviour")
    // }
    var tableRow = document.createElement('tr')
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
    optionStatus.innerText = "Complete";
    optionStatus.classList.add("btn", "btn-success");
    optionStatus.addEventListener('click', changeStatus);

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


document.querySelector('#add').addEventListener('click', () => {
    var response = prompt("Enter your todo item");    
    var time = getTime();
        
    addToList(1, response, time, 'Incomplete');
})



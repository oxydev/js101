const addButton = document.querySelector('#add');
const changeButton = document.querySelector('#change');
const clearButton = document.querySelector('#clear');
const tableBody = document.querySelector('tbody');
const filterInput = document.querySelector('input');

//for LS
var savedData = [];

// Load all eventlisteners
loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', loadTask);
    addButton.addEventListener('click', addTask);
    clearButton.addEventListener('click', clearTask);
    tableBody.addEventListener('click',chooseOption);
    changeButton.addEventListener('click', changeView);
    filterInput.addEventListener('keyup', filterTask);
}

function addTask() {
    let input = prompt('Enter The Task...');
    let sn = getSn();
    let date = getDate();
    displayOnTable(sn,input,date);
}

function displayOnTable(sno,input,date) {

    const tableRow = document.createElement('tr');

    const snRow = document.createElement('td');
    snRow.innerText = sno;

    const dateRow = document.createElement('td');
    dateRow.innerText = date;

    const inputRow = document.createElement('td');
    inputRow.innerText = input;

    const statusRow = document.createElement('td');
    statusRow.innerText = 'Incomplete'

    const optionRow = document.createElement('td');

    const toggleBtn = document.createElement('button');
    toggleBtn.innerText = 'Complete';
    toggleBtn.classList = 'toggle';

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList = 'delete';

    optionRow.append(toggleBtn,deleteBtn);

    tableRow.append(snRow,dateRow,inputRow,statusRow,optionRow);

    tableBody.append(tableRow);
    console.log(savedData);
    console.log(Array.isArray(savedData))
    savedData.push(tableBody.innerHTML);

    localStorage.setItem('todo', savedData);
}

function getSn() {
       var initialNumber = 1;
       if (tableBody.lastElementChild) {
           var lastNumber = parseInt(tableBody.lastElementChild.children[0].innerText);
           initialNumber = lastNumber + 1;
       }

       return initialNumber;
}

function getDate() {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

// Clear Task
function clearTask() {
    
    while(tableBody.firstChild){
        tableBody.lastChild.remove();
    }
}

// Option Button Delete/Completed
function chooseOption(e) {

    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();    
    }

    if(e.target.classList.contains('toggle')){
        var statusText= e.target.parentElement.previousSibling.innerText;
        if(statusText === 'Incomplete'){
            e.target.parentElement.previousSibling.innerText = 'Complete';
            e.target.innerText= 'Incomplete'
            e.target.parentElement.parentElement.classList = 'hide complete';
        }else{
            e.target.parentElement.previousSibling.innerText = 'Incomplete';
            e.target.innerText = 'Complete';
            e.target.parentElement.parentElement.classList.remove('hide','complete');
        }
    }
}

// change View

function changeView(e) {
    var children = tableBody.children;  
    if (changeButton.innerText === 'Show Completed'){
        for(var i = 0; i<children.length; i++){
            if(children[i].children[3].innerText === 'Complete'){
                children[i].classList.remove('hide');
            }        // if(children[i].children.)
        }
        changeButton.innerText = 'Hide Completed'    
    }else{
        for (var i = 0; i < children.length; i++) {
            if (children[i].children[3].innerText === 'Complete') {
                children[i].classList.add('hide');
            } // if(children[i].children.)
        }
        changeButton.innerText = 'Show Completed';
    }
}

function filterTask(e) {
    var text = e.target.value.toLowerCase();
    var children = tableBody.children;
    for(var i=0; i < children.length; i++){
        var item = children[i].children[2].innerText;

        if(item.toLowerCase().indexOf(text) === -1){
            children[i].classList.add('hide');
        }else{
            children[i].classList.remove('hide');
        }
    }
    
}

function loadTask() {
    if(localStorage.getItem('todo') === null){
        return;
    }
    savedData = localStorage.getItem('todo');
    if(savedData){
        savedData = savedData.split(",");
        savedData.forEach(task => {
            tableBody.innerHTML += task;
        });
    }
}
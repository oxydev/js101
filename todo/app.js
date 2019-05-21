const addButton = document.querySelector('#add');
const changeButton = document.querySelector('#change');
const clearButton = document.querySelector('#clear');
const tableBody = document.querySelector('tbody');


// Load all eventlisteners
loadEventListeners();

function loadEventListeners() {
    addButton.addEventListener('click', addTask);
    clearButton.addEventListener('click', clearTask);
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

}

function getSn() {
    return 1;
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
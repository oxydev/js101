var numbers = document.querySelectorAll('.key-buttons button');
var output = document.querySelector('.output');
var operators = document.querySelectorAll('.operator');
//to Add digits
var oldNum = null;
var newNum = null;

var operator = null;

var firstNum = null;
var secondNum = null;

function showNumber(e) {
    var value = e.target.innerText;
    var currentClickedNum = Number(value);
     if (!isNaN(oldNum)) {
        if (oldNum) {
            oldNum = parseInt(`${oldNum}${currentClickedNum}`);
        } else{
            oldNum = currentClickedNum
        }
        output.innerText = oldNum;
              // newNum = oldNum;
    }
}

function showOperator(e) {
    var toBeCalcValue = output.innerText;
    firstNum = toBeCalcValue;
    console.log(toBeCalcValue)
    if (toBeCalcValue !== 'Input your data here'){
        // firstNum = toBeCalcValue;
        output.innerText = e.target.innerText;
        operator = output.innerText;
        
        addEventToKeys();
        console.log(e.target.classList);

        secondNum = output.innerText;

        console.log(firstNum , secondNum);
        
        oldNum = null;
        
    }else{

        alert('Value is empty');    
        
    }
}

function addEventToKeys() {
    for (var i = 0; i < numbers.length; i++){
        numbers[i].onclick = showNumber;
    }
}


for (var i = 0; i < operators.length; i++){
    operators[i].onclick = showOperator;
}
// console.log(newNum);
addEventToKeys();
var calculator = document.querySelector('.calculator');
var keys = document.querySelector('.calculator__keys');
var display = document.querySelector('.calculator__display');


keys.onclick = function (e) {
    if (e.target.matches('button')){
    const key = e.target;
    var action = key.dataset.action;
    const keyContent = key.textContent;
    const displayNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    console.log(previousKeyType);
    if(!action){
        // console.log('It is number' );
        if (displayNum === '0' || previousKeyType === 'operator'){
            display.textContent = keyContent;
            calculator.dataset.previousKeyType = null;
        }else {
            display.textContent = displayNum + keyContent;
        }
    }
    if(action === 'add'|| action === 'subtract' || action === 'multiply' || action === 'divide'){
        key.classList.add('is-depressed'); //it wont go
        // console.log('It is operator');
        calculator.dataset.previousKeyType = 'operator';
        console.log(calculator);
        
        calculator.dataset.firstValue = displayNum;
        calculator.dataset.operator = action;
    }
    if(action==='decimal'){
        display.textContent = displayNum + '.';
        // console.log('It is decimal Key');
    }
    if(action==='clear'){
        // console.log('It is Clear Key');
    }
    if(action==='calculate'){
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayNum;
        display.textContent = calculate(firstValue, operator, secondValue);
    }
    
    // calculator.dataset.previousKeyType = null;
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
    
}
}

const calculate= (n1, operator, n2) =>{
    let result = '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
}
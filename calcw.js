        //Fetch all opreators from the dom
        var operators = document.querySelectorAll('.operator');
        //Fetch all the numbers from the dom
        var keys = document.querySelectorAll('.key-buttons button');
        //Fetch all the calculator actions from the dom
        var actions = document.querySelectorAll('.action');
        //We need 3 types of variable to calculate
        // new value is the first number ; after the operator is pressed
        // the new value is then transferred to the old value  
        var oldValue = null;
        var newValue = null;
        var result = null;
        var currentOperator = null;
        //===================================================
        // 1 -> pressed value
        // 2-> previous Value
        //===================================================
        //Show clicked number on output
        // steps:
        // 1) Click on num
        // 2) Click on operator
        // 3) Click on num
        // 4) Result
        function clickedOnOperator(e) {
            if (!newValue) {
                alert("New value not found. Please select a number before carrying out the operation")
                return;
            }
            var clickedElement = e.srcElement;

            //Geting the type of operator from the element
            if (!clickedElement) {

                return
            }
            var value = clickedElement.getAttribute('data-key');

            //Change the new value to old one becaue the operator is pressed
            oldValue = newValue


            //Clearing out the new value to give space for new number
            newValue = null
            //Assigning current operator to the clicked operator
            currentOperator = value;
        }
        ///Operator on the operators
        function actOnOperator(operator) {
            switch (operator) {
                case 'add':
                    return add(oldValue, newValue)
                    break;
                case 'substract':
                    return substract(oldValue, newValue)
                    break;
                case 'multiply':
                    return multiply(oldValue, newValue)
                    break;
                case 'divide':
                    return divide(oldValue, newValue)
                    break;
                case 'equals':
                    alert("helo")
                    console.log('values', oldValue, newValue)
                    return outputData(oldValue);
                    break;
                default:
                    break;
            }
        }
        //When clicked on equals to
        document.querySelector('.equals').onclick = function () {
            newValue = actOnOperator(currentOperator)

            outputData(newValue)
        }
        //Outputs the data to the dom
        function outputData(data) {
            document.querySelector('.output span').innerText = data;
        }

        function outputClickedNumber(e) {
            //e -> event
            var clickedElement = e.srcElement;
            var value = clickedElement.getAttribute('data-key');
            var parsedValue = Number(value);

            //Check if the new value already has some data in it
            if (newValue) {
                //If the new value has data then append the clicked data
                parsedValue = Number(`${newValue}${parsedValue}`);
            }
            if (!isNaN(parsedValue)) {
                //Output the data to the dom
                outputData(parsedValue)
                //Assign the parsed value to new value
                newValue = parsedValue
            }
        }

        function addEventToKeys() {
            //Addding click actions to all the numbered keys
            for (var i = 0; i < keys.length; i++) {
                keys[i].onclick = outputClickedNumber
            }
        }

        function addEventToOperators() {
            //Adding click event to all the operators
            for (var i = 0; i < operators.length; i++) {
                operators[i].onclick = clickedOnOperator
            }
        }
        addEventToKeys();
        addEventToOperators();
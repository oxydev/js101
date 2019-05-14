const inputTask = document.getElementById('input');
const submit = document.querySelector('.submit');


submit.addEventListener('click', function(e){

    if(inputTask.value === ''){
        alert('Task is Empty!!!');
    }else{
        //create new LI element
        const li = document.createElement('li');
        //append the text to the new LI element
        li.appendChild(document.createTextNode(inputTask.value));
        
        //add button to delete the task
        const button = document.createElement('button');
        
        button.appendChild(document.createTextNode('Delete'));
        console.log(button, li);
        
        //append the new LI to the OL 
        document.querySelector('ol').appendChild(li);

        //append button to the last LI through Li:Last-child
        var list = document.querySelector('li:last-child').appendChild(button);
    }
})
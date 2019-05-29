var question = [{
        question: "What is the First Letter of the Alphabet",
        choices: ["a", "y", "p", "g"],
        answer: 1
    },
    {
        question: "What color do you get when you mix yellow and blue?",
        choices: ["Teal", "Purple", "Green", "Red"],
        answer: 2
    },
    {
        question: "What is the most abundant element in the earth's atmosphere?",
        choices: ["Carbon", "Oxygen", "Nitrogen", "Hydrogen"],
        answer: 2
    },
    {
        question: "What does GUI stand for?",
        choices: ["Graphical User Interface", "Golfing Union of Ireland", "Global Unique Identifier", "Graphics Unit Interface"],
        answer: 0
    },
    {
        question: "What does CPU stand for?",
        choices: ["Computer Processing Unit", "Central Peripheral Unit", "Central Processing Unit", "Computer Processing User"],
        answer: 2
    }
];

var position = 0;

class Quiz{

    constructor(){
        this.totalScore = 0;
    }

    displayQuiz(no){
             if(question.length - 1 === no){
                 alert("the quiz is completed")
                 return;
             }
        var quiz = document.querySelector('.quiz');
    
        quiz.innerHTML = `
                        <h5>${question[no].question}</h5>
                        <label for="option" id="option">
                            <input type="radio" name = "option">${question[no].choices[0]}
                            <input type="radio" name = "option">${question[no].choices[1]}<br>
                            <input type="radio" name = "option">${question[no].choices[2]}
                            <input type="radio" name = "option">${question[no].choices[3]}
                        </label>`;
        
    }

    checkAnswers(no){
        var radio = document.getElementsByName('option');
        var status;
        // console.log(question[no].answer);
        for (var i=0; i<4; i++){
            if(!radio[i].checked){
                status = false;
   
            }
            if(i === question[no].answer-1){
                this.totalScore++;
            }
            status = true
        }
        return status;
    }

    finshQuiz(){
        console.log(this.totalScore);
        var score = this.totalScore;
        switch (score) {
            case 0:
                alert("YOU GOT ZERO!!");
                break;
            case 1:
                alert("You got one answer Correct");
                break;
            case 2:
                alert("You got Two answer Correct");
                break;
            case 3:
                alert("You got Three answer Correct");
                break;
            case 4:
                alert("You got all the answer Correct");
            
            default:
                break;
        }        
    }

    finish(){
        var next = document.querySelector('.next');
        next.innerText = 'Finish';
    }
}

var quiz = new Quiz;
quiz.displayQuiz(position);

var next = document.querySelector('.next');
var previous = document.querySelector('.previous');

next.addEventListener('click',changeQuestion);
previous.addEventListener('click', previousQuestion);

function changeQuestion(no){
    var check = quiz.checkAnswers(position);
    if(check === false){
        return;
    }
    
    if(position === question.length-2){
        quiz.finshQuiz();
        return;
    }

        quiz.displayQuiz(++position);
}

function previousQuestion() {
    console.log(radio[i])
    alert('Check any Item');
    if(position > 0){
        quiz.displayQuiz(--position);
        
    }else{
        alert('This is the First Question!!')
    }
}

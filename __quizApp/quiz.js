function createQuestion(question, options, answer) {
    return {
        question,
        options,
        answer
    }
}

class Quiz{
    constructor(){
        this.question = [];
        this.currentPosition = 0;
        this.point = 0;
    }

    addQuestion(question){
        this.question.push(question);
    }

    display(){
        if(this.currentPosition>0){
            this.checkAnswer(this.currentPosition);
        }
        if(this.currentPosition === 5){
            this.result();
            return;
        }
    
        this.createHtml(this.currentPosition++);
    }

    createHtml(obj){
        let container = document.querySelector('.container');
        container.innerHTML = `
            <div class="center">
                <h1>Quiz App</h1>
            </div>
            <div>
                <h3 class="center">Question: <span id="displayQCount">${obj+1}</span> of 5</h3>
            </div>
            <div>
                <h2 id="askQuestion" class="center">${this.question[obj] ?this.question[obj].question : null}</h2>

                <form id="form">
                    <div>
                        <label id="answer0" for="label0">
                        <input id="label0" type="radio" name="option" value="${this.question[obj].options[0]}">${this.question[obj].options[0]}</label>
                    </div>
                    <div>
                        <label id="answer1" for="label1">
                        <input id="label1" type="radio" name="option" value="${this.question[obj].options[1]}">${this.question[obj].options[1]}</label>
                    </div>
                    <div>
                        <label id="answer2" for="label2">
                        <input id="label2" type="radio" name="option" value="${this.question[obj].options[2]}">${this.question[obj].options[2]}</label>
                    </div>
                     <div>
                        <label id="answer3" for="label3">
                        <input id="label3" type="radio" name="option" value="${this.question[obj].options[3]}">${this.question[obj].options[3]}</label>
                    </div>
                </form>

                <button class="submit" onclick="nextQuestion()">Submit</button>
            </div>
        `
    }

    checkAnswer(obj) {
        var radio = document.getElementsByName('option');
        var value = false;
        for(var i=0; i<4; i++){
            var currentQuestion = this.question[obj -1]
            var currentAnswerIndex = currentQuestion.answer;
            var currentSelectedAnswer = currentQuestion.options[currentAnswerIndex];
     
            if (radio[i].checked  && radio[i].value == currentSelectedAnswer) {
            //     ticked ++;
            // }else
            // {
                //i is increased above 
                console.log("Passes")
                value = true;
                this.point ++;
                
            }
            // console.log("point",this.point);
            // debugger;
            return value;
        }       
}
    
    result() {
        let container= document.querySelector('.container');
        container.innerHTML = `
            <div class="center">
                <h1>Quiz App</h1>
            </div>
            <div class="show-score">
                <h2>You Scored ${this.point} out of 5.</h2>
                <button class="playAgain" onclick="reset()">Play Again?</button>
            </div>
        `
    }

    reset() {
        this.currentPosition = 0;
        this.point = 0;
        
    }
}

var quiz = new Quiz();

function loadQuestions(){
    //Add Questions
    quiz.addQuestion(createQuestion("Who is the national hero of Nepal?", ["kp oli", 'Baburam', "Tribhuwan", "Prachnda"], 1))
    quiz.addQuestion(createQuestion("What is the capital city of Nepal?", ["Kathmandu", "Bhaktapur", "Chitwon", "Nepalgunj"], 0))
    quiz.addQuestion(createQuestion("What is the capital city of China?", ["Kathmandu", "Bejing", "Chitwon", "Nepalgunj"], 1))
    quiz.addQuestion(createQuestion("What is the value of x when x=3+2?", [10, 5, 7, 4], 1))
    quiz.addQuestion(createQuestion("Who is the Father of Computer?", ["Charles Babbage", "Micheal Jackson", "Albert Einstien", "Stephan Hawking"], 0))

}    

loadQuestions()
//Add Event Listeners
const startButton = document.querySelector('.start');
const submitButton = document.querySelector('.submit');

//Event Listeners 
startButton.addEventListener('click', startQuiz);

//functions
function startQuiz() {
    quiz.display();
}

function nextQuestion() {
    quiz.display();
}
 
function reset() {
    quiz.reset();
    quiz.display();
}
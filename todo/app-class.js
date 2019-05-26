class Tasks{
    constructor(date, task, status){
        this.date = date;
        this.task = task;
        this.status = status;
    }
}

class TaskLists {
    constructor(){
        //create a list where we push the task
        this.list = [];
    }

    addTask(date, task, status){
        //Take the input value from the class and push them
        var task = new TaskLists(date, task, status);
        this.list.push(task);
    }

    generateBody(){
        //Make table with sn, date, task and Staus
    }

    displayTask(){
        //append the tr to the tableBody
    }

    deleteTask(){
        //delete single Task
    }

    clearAll(){
        //Clear all the list
    }

}
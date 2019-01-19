// Drag & Drop capabilities to be added into goal and note containers
dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);

let apiPage = 1;
let controller, scene;

loadGoals();
addTask();




function loadGoals() {
    console.log("Loading goals...")
    getUserGoals(apiPage);
    apiPage =+ 1;
}

function addTask() {
    console.log('inside addTask')
    let theButton = document.getElementById('the-plus-button');

    if (theButton) {
        theButton.addEventListener('click', function(){
            let newEl = document.createElement('li');
            newEl.innerHTML = newTaskLineHTML();
            let position = document.getElementById('checklist');
            position.prepend(newEl);
        
            let submitTasks = document.getElementById('save-changes');

            if (submitTasks) {
                submitTasks.addEventListener('click', postNewTask)
            }
        });
    }
}

// POST request to API to save tasks and calls loadTasks
function postNewTask(event){
    console.log($('#save-changes').attr('data-goal'))
    // console.log(event);
    let task = {
        author:1,
        goal: $('#save-changes').attr('data-goal'),
        text: $('#new-task-text').val()
    }
    $.ajax({
        url: '/api/tasks/',
        method: 'POST',
        data: JSON.stringify(task), 
        contentType: 'application/json'
    
    }).done(function() {
        // console.log('end of ajax post, should then empty checklist')
        document.getElementById('checklist').innerHTML = "";
        // loadTasks();
        getModalTasks();

    }).fail(function() {
        console.log("There was an issue getting the user's tasks.")
    });

}

// DELETE task
function deleteTask() {
    console.log("Inside deleteTask")
    $( 'div' ).find( "button.delete" ).on('click', function (event) {
        
        console.log($("button.delete").data())
        let taskID = $("button.delete").data('task')
        console.log(taskID)

        $.ajax({
            method: 'DELETE',
            url: `/api/tasks/${taskID}/`,
        
        }).done(function() {
            document.getElementById('checklist').innerHTML = "";
            console.log('cleared checklist')
            // loadTasks();
            getModalTasks();

        }).fail(function() {
            console.log("There was an issue getting the user's tasks.")
        });
    })};




// GET request to API for goals
function getUserGoals(){
    $.ajax({
        method: 'GET',
        url: `/api/goals/`,
        contentType: 'application/json'
    }).done(function(response){
        // console.log(response)
        addGoalsToDashboard(response);

    }).fail(function(response){
        console.log("There was an issue getting the user's goals.");
    })
}


// Iterates over goals received from API, inserts the goalHTML onto page for each
function addGoalsToDashboard(goals){
    for (let goal of goals) {
        document.getElementById('goal-list').insertAdjacentHTML('beforeend', goalHTML(goal));

        // console.log('Goals have loaded...')
        let showTasks = document.getElementById('expand');
        showTasks.addEventListener('click', loadTasks)
    }
    deleteGoal();
}


// loadTasks->getUserTasks->addTaskToList->taskHTML
function loadTasks() {
    getCorrectTasks();
    getUserTasks(apiPage);
    apiPage =+ 1;
}


function getUserTasks(){
    $.ajax({
        method: 'GET',
        url: `/api/tasks/`,
        contentType: 'application/json'
    }).done(function(response){
        console.log(response)
        addTaskToList(response);
        // clickEvent();

    }).fail(function(response){
        console.log("There was an issue getting the user's tasks.");
    })
}


// takes the new task posted to API and also adds the HTML element on the dashboard
function addTaskToList(tasks){
    $(".checklist").empty();

    for (let task of tasks) {
        document.getElementById('checklist').insertAdjacentHTML('beforeend', taskHTML(task))
        console.log('Tasks have loaded!')
    }
    deleteTask();
}


// find save-goal button and listen for click to run functions
var saveGoal = document.getElementById('save-goal');
saveGoal.addEventListener('click', function() {
    postNewGoal();
    closeModal();
})



// POST request to save new Goal to API, then add it to list on dashboard
function postNewGoal() {
    let goal = {
        author: 1,
        title: $('#new-goal-title').val()
    }    
    $.ajax({
        url: '/api/goals/',
        method: 'POST',
        data: JSON.stringify(goal), 
        contentType: 'application/json'

    }).then(function(response) {
        $('.goal-container').empty();
        loadGoals();

    }).fail(function(response){
        console.log("There was an issue getting the user's goals.");
    });
}


// DELETE goal
function deleteGoal() {
    console.log("Inside deleteGoal")
    $( 'div' ).find( "button.deletegoal" ).on('click', function (event) {
        
        console.log($("button.deletegoal").data())
        let goalID = $("button.deletegoal").data('goal')
        console.log(goalID)

        $.ajax({
            method: 'DELETE',
            url: `/api/goals/2/`,
        
        }).done(function() {
            document.getElementById('goal-list').innerHTML = "";
            console.log('cleared goal-list')
            // loadTasks();
            loadGoals()

        }).fail(function() {
            console.log("There was an issue getting the user's goals.")
        });
    })};


function closeModal() {
    let modal = document.getElementById('newGoalModal');
    modal.classList.remove('modal-backdrop', 'fade', 'show');
}

        
function goalHTML(goal) {
    return `
    <div class="goal-card" id="${ goal.id }">
        <div class="card-body" data-author="${ goal.author }">  
            <h5 class="ib card-title"> ${ goal.title }</h5>                               
            <!-- Expand button, connected to goal.id -->                   
            <button type="button" class="btn fr" data-toggle="modal" data-goal="${ goal.id }" data-title="${ goal.title }" data-target="#tasksModal" id='expand'>&#128269</button>
            
            <!-- Edit & Delete buttons, connected to goal id -->
            <button type='button' class='btn fr' data-goal="${ goal.id }" id='editgoal'>&#9997</button>
            <button type='button' id='deletegoal' class='delete btn fr' data-goal="${ goal.id }">&#128465</button>
        </div>
    </div>

    <div class="col-xl-3 col-sm-6 py-2" id="${ goal.id }">
        <div class="card bg-success text-white h-100">
            <div class="card-body bg-success" id="${ goal.author }">
                <div class="rotate">
                    <i class="fa fa-user fa-4x"></i>
                </div>
                <h6 class="text-uppercase">${ goal.title }</h6>
                <h1 class="display-4">${ goal.id } goal id for test</h1>
            </div>
        </div>
    </div>
    `
}


function taskHTML(task) {
    return `
    <div class='input-group mb-3' id='checklist-task'>
        <div class='input-group-prepend'>
            <div class='input-group-text'>
                <input type='checkbox' aria-label='Checkbox for following text  input' class='checkbox'>
            </div>
        </div>
        <p> ${ task.text } </p>
        <button type='button' class='btn fr' data-task="${ task.id }" id='edit'>&#9997</button>
        <button type='button' id='delete' class='delete btn fr' data-task="${ task.id }">&#128465</button>
    </div>
        `
}


function newTaskLineHTML(task) {
    return `
    <div class='input-group mb-3' id='checklist-task'>
        <div class='input-group-prepend'>
            <div class='input-group-text'>
                <input type='checkbox' aria-label='Checkbox for following text input'>
            </div>
            <input type='text' class='form-control' aria-label='Text input withcheckbox' id='new-task-text'></input>
        </div>
    </div>
        `
}


function changeCheck() {
    // find the checkbox input field(s) for the specific goal
    let boxes = $( 'div' ).find( 'checkbox.checkbox' )
    let numOfBoxes = boxes.length
    let listID = $('#checklist').attr('data-list')
        
        console.log(boxes)
        console.log(numOfBoxes)
        console.log(listID)
    // determine if it has attribute 'checked' or not
    // if checked, event will remove attribute checked
    // if not checked, event will add attribute checked
}



// Function to do the math to calculate the user's progress
function calculateProgress() {
    // x = num of tasks total for goal
    // y = number of checked input fields
    // current progress = (y / x) * 100
    // function should return current progress value

}

// Work in progress, needs to be communicating with tasks in checklist
function loadProgressBar() {
    // take result of calculateProgress function and set to current progress value
    // let current_progress = calculateProgress();
    let current_progress = 50;
    // minimum value being 0
    // maximum value being 100
    $("#dynamic")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
        .text(current_progress + "% Complete");

  };

//NOTES SECTION

//checks to see if num is even and assigns html accordingly 
function isEven(num) {
    if (num % 2 === 0) {
        return ` <div class="item item-blue" id="blue"> ${note.text} </div>`;
    } else {
        return `<div class="item item-pink" id="pink"> ${note.text} </div>`;
    }
}

//inserts note.id to alteranate colors 
function noteHtml() {
    return isEven(note.id)
}

//gets the container for the notes and adds the notehtml
function postNoteToJournal(note){
    document.getElementById("journal").insertAdjacentHTML('afterbegin',
    noteHtml(note));
}

var saveNotes = document.getElementById('saveNote')
saveNotes.addEventListener('click', function() {
    postNote();
})


// function postNewNotes()

function postNote(){
    let note = {
        note: 1,
        text: $('#message-text').val()
    }
    $.ajax({
        url: '/api/notes/',
        method: 'POST',
        data: JSON.stringify(note), 
        contentType: 'application/json'
    
    }).then(function() {
        console.log('end of ajax post, should then empty checklist')
        document.getElementById('journal').innerHTML = ""
        $('#message-text').val("");
        console.log("should be empty")
        loadNotes();
    });

}


//loads on page load
function loadNotes(){
    getUserNotes(apiPage);
    apiPage =+ 1;
}

//get request to api 
function getUserNotes(){
    $.ajax({
        method: "GET",
        url: `/api/notes/`,
        contentType: 'application/json'
    }).done(function(response){
        addNotesToJournal(response);


    }).fail(function(response){
        console.log("try again");
    })
}

//inserts them individual form the list of notes 
function addNotesToJournal(notes){
    console.log("notes:", notes)
    document.getElementById('journal').innerHTML = ""
    for (note of notes)
    document.getElementById('journal').insertAdjacentHTML("afterbegin", noteHtml(note))
    console.log(typeof document.getElementById('journal'))
}

// // function clickEvent() {
// //     let checkboxes = document.querySelectorAll('input.checkbox')
// //     console.log(checkboxes)
// //         for (checkbox in checkboxes)
// //         // if (checkbox) {
// //         addEventListener('input', console.log('checked!'))
// // }
// let checklist = document.querySelectorAll('div.checklist')
// let checkboxes = checklist.querySelectorAll('input.checkbox')
// checkboxes.forEach(element => { console.log(element)})
    

// let checkTask = document.getElementById('checkbox')
// checkTask.addEventListener('click', function() {
// console.log('checked!')
// })



// PLEASE DO NOT TOUCH ANYTHING BELOW THIS LINE!

function setupCSRFAjax () {
    let csrftoken = Cookies.get('csrftoken');

    $.ajaxSetup({
      beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader('X-CSRFToken', csrftoken)
        }
      }
    })
    // console.log('do we make it to end of setupCSRFAjax?')
}

function csrfSafeMethod(method){
// these HTTP methods do not require CSRF protection
// console.log('do we make it into csrfSafeMethod?')
return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method))

}
$(document).ready(function () {
    setupCSRFAjax()
    loadNotes()
    loadGoals()
    loadTasks()    
    loadProgressBar()
})


function getCorrectTasks () {
    console.log('Inside getCorrectTasks')
    changeCheck()
    $('#tasksModal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget) // Button that triggered the modal
        let goalId = button.data('goal') // Extract info from data-* attributes
        let modal = $(this)

        $.ajax({
            method: "GET",
            url: `/api/goals/${goalId}/`,
            contentType: 'application/json'

        }).done(function(response){
            modal.find("#tasksModalLabel").text(response.title)
            console.log(response.tasks)
            addTaskToList(response.tasks);  
            modal.find("#save-changes").attr('data-goal', goalId)
        }).fail(function(response){
            console.log("There was an issue getting the user's goals.");
        })
        
    })
}

function getModalTasks () {
        // let button = $(event.relatedTarget) // Button that triggered the modal
        let goalId = $('#save-changes').attr('data-goal') // Extract info from data-* attributes
        let modal = $(this)

        $.ajax({
            method: "GET",
            url: `/api/goals/${goalId}/`,
            contentType: 'application/json'

        }).done(function(response){
            modal.find("#tasksModalLabel").text(response.title)
            console.log(response.tasks)
            addTaskToList(response.tasks);  
            modal.find("#save-changes").attr('data-goal', goalId)

        }).fail(function(response){
            console.log("There was an issue getting the user's goals.");
        })
    }
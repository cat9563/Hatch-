dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);

let apiPage = 1;
let controller, scene;

var saveGoal = document.getElementById('save-goal')
saveGoal.addEventListener('click', function() {
    postNewGoal();
    closeModal();
})

var saveTask = document.getElementById('save-changes')
saveTask.addEventListener('click', function() {
    postNewTask();
})

// var addLine = document.getElementById('the-plus-button')
// addLine.addEventListener('click', function() {
//     addTask()
// })


// let checkTask = document.getElementById('checkbox')
// checkTask.addEventListener('click', function() {
// console.log('checked!')
// })





function addTask() {
    var theButton = document.getElementsByName('the-plus-button')[0];
    if (theButton) {
    theButton.addEventListener('click', function(){
        var newEl = document.createElement('li');
        newEl.innerHTML = newTaskLineHTML()
        var position = document.getElementById('checklist');
        position.prepend(newEl)
    
    let submitTasks = document.getElementById('save-changes')
    if (submitTasks) {
        submitTasks.addEventListener('click', postNewTask)
    }})}}
        
function newTaskLineHTML(task) {
    return `
    <div class='input-group mb-3' id='checklist-task'>
            <div class='input-group-prepend'>
                <div class='input-group-text'>
                <input type='checkbox' aria-label='Checkbox for following text input'>
                </div>
                <input type='text' class='form-control' aria-label='Text input with checkbox' id='new-task-text'></input>
            </div>
        </div>
        `
}


function taskHTML(task) {
    return `
    <div class='input-group mb-3' id='checklist-task'>
            <div class='input-group-prepend'>
                <div class='input-group-text'>
                <input type='checkbox' aria-label='Checkbox for following text input' class='checkbox'>
                </div>
            </div>
            <p> ${ task.text }</p>
        </div>
        `
}


// POST request to API to save tasks and calls loadTasks
function postNewTask(){
    // let et = document.getElementsByClassName('card-body');
    // let pk = et.getAttribute['data-goal'].value;
    let task = {
        author:1,
        goal: 1,
        text: $('#new-task-text').val()
    }
    $.ajax({
        url: '/api/tasks/',
        method: 'POST',
        data: JSON.stringify(task), 
        contentType: 'application/json'
    
    }).then(function() {
        console.log('end of ajax post, should then empty checklist')
        document.getElementById('checklist').innerHTML = ""
        loadTasks();
    });

}


// takes the new task posted to API and also adds the HTML element on the dashboard
function addTaskToList(tasks){
    // let checklist = document.getElementById('checklist')
    $(".checklist").empty();
    for (task of tasks)
        document.getElementById('checklist').insertAdjacentHTML('beforeend', taskHTML(task))
        // checklist.insertAdjacentHTML('beforeend', taskHTML(task))
        console.log('Tasks have loaded!')
        addTask()
        // let addLine = document.getElementById('the-plus-button')
        // addLine.addEventListener('click', addTask)
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
        console.log("There was an issue getting the user's goals.");
    })
}

function loadTasks() {
    getUserTasks(apiPage);
    apiPage =+ 1;


}

    // GET request to API for goals
function getUserGoals(){
    $.ajax({
        method: 'GET',
        url: `/api/goals/`,
        contentType: 'application/json'
    }).done(function(response){
        console.log(response)
        addGoalsToDashboard(response);

    }).fail(function(response){
        console.log("There was an issue getting the user's goals.");
    })
}

// Iterates over goals received from API, inserts the goalHTML onto page for each
function addGoalsToDashboard(goals){
    for (goal of goals)
        document.getElementById('goal-list').insertAdjacentHTML('beforeend', goalHTML(goal))
        console.log('Goals have loaded...')
    var showTasks = document.getElementById('expand')
    showTasks.addEventListener('click', loadTasks)

}

// Called at page load
function loadGoals() {
    console.log("Loading goals...")
    getUserGoals(apiPage);
    apiPage =+ 1;
}

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
    }).then(function() {
        $('.goal-container').empty();
        loadGoals();
        // closeModal();
    });

}

// function closeModal(){
//     document.getElementById('newGoalModal').classList.remove('modal-backdrop fade show')
// }

function closeModal() {
    let modal = document.getElementById('newGoalModal')
    modal.classList.remove('modal-backdrop', 'fade', 'show');
}


function goalHTML(goal) {
    return `
    <div class="goal-card">
                            <div class="card-body" data-goal="${ goal.id }" data-title="${ goal.title }" data-author="${ goal.author }">  
                                <h5 class="ib card-title"> ${ goal.title }</h5>                               
<!-- Expand button, connected to goal.id -->                                
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-goal="${ goal.id }" data-title="${ goal.title }" data-target="#exampleModal" id='expand'>Expand</button>
<!-- Modal with checklist of tasks -->
                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
<!-- Modal header should reflect the goal.title, same as on goal card -->
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">${ goal.title }</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                            </div>
<!-- Checklist within the modal body -->
                                            <div class="modal-body" id='checklist-modal'>
                                                <button name='the-plus-button' id='the-plus-button' type="button" class="btn btn-success" style='margin: 5px; float: right;'>+</button>
                                                <ul id="checklist" style="list-style: none">                                     
                                                </ul>
                                            </div>
<!-- Modal FOOTER -->                                            
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" id='save-changes'>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `
}


function loadProgressBar() {
    var current_progress = 0;
    var interval = setInterval(function() {
        current_progress += 10;
        $("#dynamic")
        .css("width", current_progress + "%")
        .attr("aria-valuenow", current_progress)
        .text(current_progress + "% Complete");
        if (current_progress >= 100)
            clearInterval(interval);
    }, 1000);
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
    document.getElementById("noteList").insertAdjacentHTML('afterbegin',
    noteHtml(note));
}

var saveNotes = document.getElementById('saveNote')
saveNotes.addEventListener('click', function() {
    postNote();
})


// function postNewNotes()

function postNote(){
    // let et = document.getElementsByClassName('card-body');
    // let pk = et.getAttribute['data-goal'].value;
    let task = {
        note: 1,
        text: $('#message-text').val()
    }
    $.ajax({
        url: '/api/notes/',
        method: 'POST',
        data: JSON.stringify(task), 
        contentType: 'application/json'
    
    }).then(function() {
        console.log('end of ajax post, should then empty checklist')
        document.getElementById('noteList').innerHTML = ""
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
        console.log(response)
        addNotesToJournal(response);


    }).fail(function(response){
        console.log("try again");
    })
}

//inserts them individual form the list of notes 
function addNotesToJournal(notes){
    for (note of notes)
    document.getElementById('journal').insertAdjacentHTML("afterbegin", noteHtml(note))
}


// function addNotesToJournal(notes){
//     for (note of notes)
//         document.getElementById('noteList').insertAdjacentHTML('beforeend', noteHTML(note))
//         console.log('Goals have loaded...')
//     var showNotes = document.getElementById('message-text')
//     showNotes.addEventListener('click', loadNotes)

// }



function setupCSRFAjax () {
    var csrftoken = Cookies.get('csrftoken')
    // console.log(csrftoken);
    // console.log('Inside setupCSRFAjax function')
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



$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var goal = button.data('goal') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    // modal.find('#exampleModalLabel').text('goal ' + goal)
    console.log("goal", goal)
  })


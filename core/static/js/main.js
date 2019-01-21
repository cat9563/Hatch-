// Drag & Drop capabilities to be added into goal and note containers
dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);

let apiPage = 1;
let controller, scene;

// loadGoals();
// addTask();




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
        text: $('#new-task-text').val(),
        status: false,
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
        addGoalsToDashboard(response);

    }).fail(function(response){
        console.log("There was an issue getting the user's goals.");
    })
}


// Iterates over goals received from API, inserts the goalHTML onto page for each
function addGoalsToDashboard(goals){
    for (let goal of goals) {
        document.getElementById('goal-list').insertAdjacentHTML('beforeend', goalHTML(goal));

        
    let showTasks = document.getElementById('expand');
    console.log('Listening for expand click...')
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


// Adds tasks to tasklist, loads progress bar and percent complete based on num of tasks total and num of those tasks that are checked
function addTaskToList(tasks){
    $(".checklist").empty();

        for (let task of tasks) {
            toggleStatus(task);
            document.getElementById('checklist').insertAdjacentHTML('beforeend', taskHTML(task))
            toggleStatus(task);
            console.log('Tasks have loaded!')
            
        };
        changeStatus()
        // count how many items are in the list
        function countBoxes() { 
            var count = $("input.checkbox").length;
            return count
        };

        let count = countBoxes()
        // count how many items are checked
        function countChecked() {
            console.log(count)
            let checked = $("input.checkbox:checked").length;
            console.log(checked)
            let percent = Math.round(parseInt((checked / count) * 100), 10)
            console.log(percent)
            $("#dynamic")
                .css("width", percent + "%")
                .attr("aria-valuenow", percent)
                .text(percent + "% Complete")
        };
        countChecked();
        $(":checkbox").click(countChecked);

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
        $('.goal-container').empty(); //
        loadGoals();

    }).fail(function(response){
        console.log("There was an issue getting the user's goals.");
    });
}


// DELETE goal
function deleteGoal() {
    console.log("Inside deleteGoal")
    console.log($( 'div.goal-card' ).find( "button.deletegoal" ))
    $( 'div.goal-card' ).find( "button.deletegoal" ).on('click', function (event) {
        
        console.log($("button.deletegoal").data())
        let goalID = $("button.deletegoal").data('goal')
        console.log(goalID)

        $.ajax({
            method: 'DELETE',
            url: `/api/goals/${goalID}/`,
        
        }).done(function() {
            document.getElementById('goal-list').innerHTML = "";
            console.log('cleared goal-list')
            loadGoals()

        }).fail(function() {
            console.log("There was an issue getting the user's goals.")
        });
    })};


function closeModal() {
    let modal = document.getElementById('newGoalModal');
    modal.classList.remove('modal-backdrop', 'fade', 'show');
}

// old goalHTML kept just in case its needed when we merge and need to fix conflict
function goalHTML(goal) {
    return `
    <div class="goal-card" id="${ goal.id }">
        <div class="card-body" data-author="${ goal.author }">  
            <h5 class="ib card-title"> ${ goal.title }</h5>                               
            <!-- Expand button, connected to goal.id -->                   
            <button type="button" class="btn fr" data-toggle="modal" data-goal="${ goal.id }" data-title="${ goal.title }" data-target="#tasksModal" id='expand'>&#128269</button>
            
            <!-- Edit & Delete buttons, connected to goal id -->
            <button type='button' class='btn fr' data-goal="${ goal.id }" id='editgoal'>&#9997</button>
            <button type='button' id='deletegoal' class='deletegoal btn fr' data-goal="${ goal.id }">&#128465</button>
        </div>
    </div>
    `
}

// function goalHTML(goal){
//     return`
//     <hr>
//     <div class="col-xl-3 col-sm-6 py-2" id="${ goal.id }">
//     <div class="card bg-success text-white h-100">
//         <div class="card-body bg-success" id="${ goal.author }">
//             <h1 class="display-5">${ goal.title}</h1>
//             <hr>
//             <div class="text-center my-3">Normal Button Group</div>
//             <div class="text-center">
//                 <div class="btn-group">
//                 <button type="button" class="btn btn-primary" data-toggle="modal" data-goal="${ goal.id }" data-title="${ goal.title }" data-target="#tasksModal" id='expand'>Tasks</button>
//                 <button type='button' class='btn btn-primary' data-goal="${ goal.id }" id='editgoal'>Edit</button>
//                 <button type='button' id='deletegoal' class='delete btn btn-primary' data-goal="${ goal.id }">Delete</button>
//                 </div>
//             </div>
//                 <!-- Expand button, connected to goal.id -->                   
               
                
//                 <!-- Edit & Delete buttons, connected to goal id -->
//         </div>
//     </div>
//     </div>
//     `
// }


function taskHTML(task) {
    if (task.status === false) {
        return `
        <div class='input-group mb-3' id='checklist-task'>
            <div class='input-group-prepend'>
                <div class='input-group-text'>
                    <input type='checkbox' aria-label='Checkbox for following text input' data-task="${ task.id }" id="${ task.status }" class='checkbox'>
                    <label id='task-text'> ${ task.text } </label>
                </div>
            </div>

            <button type='button' class='btn fr' data-task="${ task.id }" id='edit'>&#9997</button>
            <button type='button' id='delete' class='delete btn fr' data-task="${ task.id }">&#128465</button>
        </div>
            `
    }
    else {
        return `
        <div class='input-group mb-3' id='checklist-task'>
            <div class='input-group-prepend'>
                <div class='input-group-text'>
                    <input type='checkbox' aria-label='Checkbox for following text input' data-task="${ task.id }" id="${ task.status }" class='checkbox check' checked>
                    <label id='task-text'> ${ task.text } </label>
                </div>
            </div>

            <button type='button' class='btn fr' data-task="${ task.id }" id='edit'>&#9997</button>
            <button type='button' id='delete' class='delete btn fr' data-task="${ task.id }">&#128465</button>
        </div>
            `
    };
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


function toggleStatus(task) {
    $(".checkbox").on('change', function() {
        $(this).toggleClass('check')
        let taskID = $("button.delete").data('task')

        if ($("input.checkbox:checked")) {
            let task = {
                author:1,
                goal: $('#save-changes').attr('data-goal'),
                text: 'check testing',
                status: true,
            }
            $.ajax({
                url: `/api/tasks/${taskID}/`,
                method: 'put',
                data: JSON.stringify(task),
                contentType: 'application/json'
            }).done(function() {
                console.log('Should be updated on API...')
                document.getElementById('checklist').innerHTML = "";
                getModalTasks();
            })
        }
        if (!$("input.checkbox:checked")) {
            let task = {
                author:1,
                goal: $('#save-changes').attr('data-goal'),
                text: 'testing',
                status: false,
            }
            $.ajax({
                url: `/api/tasks/${taskID}/`,
                method: 'put',
                data: JSON.stringify(task),
                contentType: 'application/json'
            }).done(function() {
                console.log('Should be updated on API...')
                document.getElementById('checklist').innerHTML = "";
                getModalTasks();
            })
        }
    })
}
    

function changeStatus() {
    let tasks = $("input.checkbox")
        for (let task of tasks) {
            if ($("#checkbox").hasClass("check")){
                // $(this).attr("id", "true")
                console.log($(this))
            }
            // else {
            //     $(this).attr("id", "false")
            // }
            
        }
        // updateTask()
    }
    

// sends PUT request for any task status changes
function updateTask(task) {
    // $("#save-changes").addEventListener('click', function() {
    let task = {
        author:1,
        goal: $('#save-changes').attr('data-goal'),
        text: $('#new-task-text').val(),
        status: $('#id').val()
    }   
    $.ajax({
        url: `api/tasks/${task.id}/`,
        method: 'PUT',
        data: JSON.stringify(task),
        contentType: 'application/json'
    }).then(function() {
        loadTasks()
    })
}
    

//NOTES SECTION

//inserts note.id to alteranate colors 
function noteHtml(note) {
    if (note.id % 2 === 0) {
        return ` <div class="item item-blue" id="blue"> 
                    ${note.text} 
                    <button type='button' id='deletenote' class='deletenote btn fr' data-note="${ note.id }">&#128465</button>
                </div>`;
    } 
    else {
        return `<div class="item item-pink" id="pink"> 
                    ${note.text} 
                    <button type='button' id='deletenote' class='deletenote btn fr' data-note="${ note.id }">&#128465</button>
                    </div>`;
    // return isEven(note.id)
    };
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

// DELETE note
function deleteNote() {
    console.log("Inside deleteNote")
    $( 'div' ).find( "button.deletenote" ).on('click', function (event) {
        
        console.log($("button.deletenote").data())
        let noteID = $("button.deletenote").data('note')
        console.log(noteID)

        $.ajax({
            method: 'DELETE',
            url: `/api/notes/${noteID}/`,
        
        }).done(function() {
            document.getElementById('journal').innerHTML = "";
            console.log('cleared journal')
            loadNotes();

        }).fail(function() {
            console.log("There was an issue getting the user's notes.")
        });
    });
};


function postNote(){
    let note = {
        // note: 1,
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
    console.log("Loading notes...")
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
    for (let note of notes) {
        document.getElementById('journal').insertAdjacentHTML("afterbegin", noteHtml(note));
        console.log('Notes have loaded!')
    }
    deleteNote();
}


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



function getCorrectTasks () {
    console.log('Inside getCorrectTasks')
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

$(document).ready(function () {
    setupCSRFAjax();
    loadNotes();
    deleteNote();
    loadGoals();
    deleteGoal();
    loadTasks();
    addTask(); 
    deleteTask();  
    // loadProgressBar();

})
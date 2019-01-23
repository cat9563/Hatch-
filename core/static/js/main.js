// Drag & Drop capabilities to be added into goal and note containers
dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);

let apiPage = 1;
let controller, scene;


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
        })
    }

    let newTask = document.getElementById('new-task-text');
    if (newTask) {
      newTask.addEventListener('blur', function() {
        console.log('blurred')
        postNewTask();
      })
    }

    // let updateGoal = document.getElementById('update-goal');
    // if (updateGoal) {
    //     updateGoal.addEventListener('click', function() {
    //         getModalTasks();
    //         toggleStatus();
    //         console.log('here here')
    //     })
    // }

    let submitTasks = document.getElementById('save-changes');
    if (submitTasks) {
        submitTasks.addEventListener('click', postNewTask);
        closeModal();
    }
}

// var saveTasks = document.getElementById('save-changes')
// saveTasks.addEventListener('click', function() {
//   postNewTask();
// })


// POST request to API to save tasks and calls loadTasks
function postNewTask(){
    // console.log($('#save-changes').attr('data-goal'))
    // things = $( "ul.checklist" ).find('li')
    // for (let thing of things) {
        console.log($('#new-task-text').val())

    // console.log(event);
        let task = {
            author:1,
            goal: $('#the-plus-button').attr('data-plus'),
            text: $('#new-task-text').val(),
            status: false,
        }
        $.ajax({
            url: '/api/tasks/',
            method: 'POST',
            data: JSON.stringify(task), 
            contentType: 'application/json'
        
        }).done(function() {
            document.getElementById('checklist').innerHTML = "";
            // loadTasks();
            getModalTasks();

        }).fail(function() {
            console.log("There was an issue getting the user's tasks.")
        })
    };
// }


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
    }

    console.log('Goals have loaded!')
    // deleteGoal();
   

    let goalDelete = document.getElementById('deletegoal')
    goalDelete.addEventListener('click', deleteGoal($(this)))
    console.log('listening for DELETE CLICK....')
}


// DELETE goal
function deleteGoal() {
  console.log('Inside deleteGoal')
  $("#deletegoal")
  .on('click', function() {
    console.log($(this))
    console.log($(this).data())
    let goalID = $(this).data('goal')
    console.log(goalID)

    $.ajax({
        method: 'DELETE',
        url: `/api/goals/${goalID}/`,
    
    }).done(function() {
        $(`#goal-card-${goalID}`).remove()
        console.log('removed one goal')

    }).fail(function() {
        console.log("There was an issue getting the user's goals.")
    });
  })
}


// loadTasks->getUserTasks->addTaskToList->taskHTML
function loadTasks() {
    getCorrectTasks(apiPage);
    // getUserTasks(apiPage);
    apiPage =+ 1;
}


// Adds tasks to tasklist, loads progress bar and percent complete based on num of tasks total and num of those tasks that are checked
function addTaskToList(tasks){
    $(".checklist").empty();

        for (let task of tasks) {
            document.getElementById('checklist').insertAdjacentHTML('beforeend', taskHTML(task))
            
        // };
        console.log('Tasks have been added to the list')
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
            console.log('task', task)        

            $(`#dynamic, #dynamic-${ task.goal }`)
                .css("width", percent + "%")
                .attr("aria-valuenow", percent)
                .text(percent + "%")
        }
      if (count > 0) {
        console.log('all good here')
        countChecked();
        // $(".checkbox").click(countChecked);
        deleteTask();
        // toggleStatus();
      }
      if (count == 0) {
        console.log( "No boxes.")
      }
    // countChecked();
    $(".checkbox").click(countChecked);
    // deleteTask();
    toggleStatus();
}};
    

function completeGoal() {
    var progressCount = document.getElementsByClassName('goal-card')
    console.log(progressCount)
}


// find save-goal button and listen for click to run functions
var saveGoal = document.getElementById('save-goal');
console.log('Listening for save...')
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
        $('#goal-list').empty();
        console.log('cleared goals?')
        loadGoals();

    }).fail(function(response){
        console.log("There was an issue getting the user's goals.");
    });
}



function closeModal() {
    let modal = document.getElementById('newGoalModal');
    modal.classList.remove('modal-backdrop', 'fade', 'show');
}

// old goalHTML kept just in case its needed when we merge and need to fix conflict
function goalHTML(goal) {
    return `
    <div class="goal-card" id="goal-card-${ goal.id }">
        <div class="card-body" data-author="${ goal.author }"> 
            <div class="progress" style="height: 30px;">
                <div id="dynamic-${ goal.id }" class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="${goal.percent_complete || 0}" aria-valuemin="0" aria-valuemax="100" style="width: ${goal.percent_complete || 0}%" data-bar="${ goal.id }">
                ${goal.percent_complete !== null ? `<span>${goal.percent_complete}% </span>` : ''}                
                </div>
            </div> 
            <hr>
            <!-- Expand button, connected to goal.id -->   
            
            <div class="text-center my-3" id="goal-title">${ goal.title }</div>
                <div class="row">
                    <div class="btn-group" style="padding: 10px;">
                    <button type="button" class="btn-outline-primary btn-lg" data-toggle="modal" data-goal="${ goal.id }" data-title="${ goal.title }" data-target="#tasksModal" id='expand'>Tasks</button>
                    <!-- Delete buttons, connected to goal id -->
                    <button type='button' class="deletegoal btn-outline-primary btn-lg" id='deletegoal' data-goal="${ goal.id }">Delete</button>
                    </div>
                </div>  
            </div>               
        </div>
    </div>
    `
}

function taskHTML(task) {
    if (task.status === false) {
        return `
        <section class="row">
            <div class="col-md-8" id='checklist-task-${ task.id }'>
                <input type='checkbox' aria-label='Checkbox for following text input' data-task="${ task.id }" id="${ task.status }" class='checkbox'>
                <label id='task-text-${ task.id }'> ${ task.text } </label>
            </div>
            <div class="col-md-4">
                <div class="btn-group float-right mt-2" role="group">
                    <button type='button' id='delete' class='delete btn fr' data-task="${ task.id }">Delete</button>
                </div>
            </div>
        </section>
            `
    }
    else {
        return `
        <section class="row">
            <div class="col-md-8" id='checklist-task-${ task.id }'>
                <div>
                    <div>
                        <input type='checkbox' aria-label='Checkbox for following text input' data-task="${ task.id }" id="${ task.status }" class='checkbox check' checked>
                        <label id='task-text-${ task.id }'> ${ task.text } </label>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="btn-group float-right mt-2" role="group">
                    <button type='button' id='delete' class='delete btn fr' data-task="${ task.id }">Delete</button>
                </div>
            </div>
        </section>

       
            `
    };
}


function newTaskLineHTML(task) {
    return `
    <div class='input-group mb-3' id='checklist-task'>
        <div>
            <div>
                <input type='checkbox' aria-label='Checkbox for following text input'>
            </div>
            <input type='text' class='form-control' onblur='createNewTask()' aria-label='Text input with checkbox' id='new-task-text' (blur)="postNewTask()">
            </input>
        </div>
    </div>
        `
}




function createNewTask(){
    console.log('Creating a new task...')
    let task = {
        author:1,
        goal: $('#the-plus-button').attr('data-plus'),
        text: $('#new-task-text').val(),
        status: false,
    }
    $.ajax({
        url: '/api/tasks/',
        method: 'POST',
        data: JSON.stringify(task), 
        contentType: 'application/json'
    
    }).done(function() {
        document.getElementById('checklist').innerHTML = "";
        // loadTasks();
        getModalTasks();

    }).fail(function() {
        console.log("That didn't work out.")
    });
}

// DELETE task
function deleteTask() {
  console.log("Inside deleteTask")
  $(".delete").on('click', function() {
      console.log($(this))
      console.log($(this).data())
      let taskID = $(this).data('task')
      console.log(taskID)

      $.ajax({
          method: 'DELETE',
          url: `/api/tasks/${taskID}/`,
      
      }).done(function() {
          $(`#checklist-task-${taskID}`).remove();


      }).fail(function() {
          console.log("There was an issue getting the user's tasks.")
      });
  })};


function toggleStatus(task) {
    $(".checkbox").on('change', function(event) {
        console.log($(this))
        checkStatus = $(this).prop( 'checked' )
        console.log(checkStatus)
        let taskID = $(this).data('task')
        console.log(taskID)
        // let tasks = $(".checkbox")
        // console.log(tasks)
        // $("#update-goal").on('click', function() {
            // currently not accepting the value of text below - Error: "This field is required"
         
        let task = {
            author:1,
            goal: $('#the-plus-button').attr('data-plus'),
            text: $(`#task-text-${taskID}`).text(),
            status: checkStatus,
        }
        $.ajax({
            url: `/api/tasks/${taskID}/`,
            method: 'PUT',
            data: JSON.stringify(task),
            contentType: 'application/json'
        }).done(function() {
            console.log('Should be updated on API...')
            document.getElementById('checklist').innerHTML = "";
            getModalTasks();
        })
      })
    }
  

//NOTES SECTION

//inserts note.id to alteranate colors 
function noteHtml(note) {
    if (note.id % 2 === 0) {
        return ` <div class="item item-blue" id="journal-note-${note.id}"> 
                    <p>${note.text}</p>
                    <small>${moment(note.created_at).format("MMM. D, YYYY, hh:mm a")}</small>
                    <button type='button' id='deletenote' class='deletenote btn fr' data-note="${ note.id }">Delete</button>
                </div>`;
    } 
    else {
        return `<div class="item item-pink" id="journal-note-${note.id}"> 
                  <p>${note.text}</p>
                  <small>${moment(note.created_at).format("MMM. D, YYYY, hh:mm a")}</small>
                    <button type='button' id='deletenote' class='deletenote btn fr' data-note="${ note.id }">Delete</button>
                    </div>`;
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
    $('.deletenote').on('click', function () {
        console.log($(this))
        console.log($(this).data())
        let noteID = $(this).data('note')
        console.log(noteID)

        $.ajax({
            method: 'DELETE',
            url: `/api/notes/${noteID}/`,
        
        }).done(function() {
            $(`#journal-note-${noteID}`).remove()
            console.log('cleared journal entry')
            // loadNotes();

        }).fail(function() {
            console.log("There was an issue getting the user's notes.")
        });
    });
};


function postNote(){
    let note = {
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
    }

    console.log('Notes have loaded!')
    deleteNote();
}


function setupCSRFAjax () {
    let csrftoken = Cookies.get('csrftoken');

    $.ajaxSetup({
      beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader('X-CSRFToken', csrftoken)
        }
      }
    })
}

function csrfSafeMethod(method){
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
            console.log('getcorrecttasks '+ response.tasks)
            addTaskToList(response.tasks);  
            modal.find("#the-plus-button").attr('data-plus', goalId)

        }).fail(function(){
            console.log("There was an issue getting the user's goals.");
        })
      $('#the-plus-button').attr("data-plus", goalId)
    })
    deleteTask();
}

function getModalTasks () {
        let goalId = $('#the-plus-button').attr('data-plus')
        console.log(goalId)
        let modal = $(this)

        $.ajax({
            method: "GET",
            url: `/api/goals/${goalId}/`,
            contentType: 'application/json'

        }).done(function(response){
            console.log('getmodaltasks ' + response.tasks)
            addTaskToList(response.tasks);  

        }).fail(function(){
            console.log("There was an issue getting the user's goals.");
        })
    }

function updatePercentComplete() {
  $.ajax({
    url: '/api/percent_complete/',
    success: function (result) {
      console.log("result", result)
      if (result.percent_complete) {
        updateChart(result.complete, result.incomplete)
      }
    },
    dataType: 'json'
  });
}



$(document).ready(function () {
    setupCSRFAjax();
    loadNotes();
    loadGoals();
    loadTasks();
    addTask();
    toggleStatus();
    completeGoal();
    updatePercentComplete()
})

$('#tasksModal').on('hide.bs.modal', function (event) {
  updatePercentComplete()
})



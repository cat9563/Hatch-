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

    let updateGoal = document.getElementById('update-goal');
    if (updateGoal) {
        updateGoal.addEventListener('click', function() {
            getModalTasks();
            toggleStatus();
            console.log('here here')
        })
    }

    let submitTasks = document.getElementById('save-changes');
    if (submitTasks) {
        submitTasks.addEventListener('click', postNewTask);
        closeModal();
    }
}


// POST request to API to save tasks and calls loadTasks
function postNewTask(event){
    console.log($('#save-changes').attr('data-goal'))
    things = $( "ul.checklist" ).find('li')
    for (let thing of things) {
        console.log($('#new-task-text').val())
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
            document.getElementById('checklist').innerHTML = "";
            // loadTasks();
            getModalTasks();

        }).fail(function() {
            console.log("There was an issue getting the user's tasks.")
        })
    };
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
    let showTasks = document.getElementById('expand');
    showTasks.addEventListener('click', loadTasks)
    console.log('Listening for expand click...');
    deleteGoal();
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
                .text(percent + "% Complete")
        }}
        
    countChecked();
    $(".checkbox").click(countChecked);
    deleteTask();
    toggleStatus();
};
    

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
        $('.goal-container').empty(); //
        loadGoals();

    }).fail(function(response){
        console.log("There was an issue getting the user's goals.");
    });
}


// DELETE goal
function deleteGoal() {
    console.log("Inside deleteGoal")
    $('.deletegoal').on('click', function() {
        console.log($(this).data())
        let goalID = $(this).data('goal')
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
    <div class="goal-card" id="${ goal.id }>
        <div class="card-body" data-author="${ goal.author }"> 
            <div class="progress">
            <p>progress meter</p>
                <div id="dynamic-${ goal.id }" class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%" data-bar="${ goal.id }">
                <span id="current-progress"></span>
                </div>
            </div> 
            <hr>
            <!-- Expand button, connected to goal.id -->   
            <div class="text-center my-3">${ goal.title }</div>
           
                <div class="text-center">
                    <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-goal="${ goal.id }" data-title="${ goal.title }" data-target="#tasksModal" id='expand'>Tasks</button>
                    <!-- Delete buttons, connected to goal id -->
                    <button type='button' class="btn btn-primary" id='deletegoal' class='deletegoal btn fr' data-goal="${ goal.id }">Delete</button>
                    </div>
                </div>   
                             
        </div>
    </div>
    `
}

function taskHTML(task) {
    if (task.status === false) {
        return `
        <div class='input-group mb-3' id='checklist-task-${ task.id }'>
            <div class='input-group-prepend'>
                <div class='input-group-text'>
                    <input type='checkbox' aria-label='Checkbox for following text input' data-task="${ task.id }" id="${ task.status }" class='checkbox'>
                    <label id='task-text'> ${ task.text } </label>
                </div>
            </div>

            <button type='button' id='delete' class='delete btn fr' data-task="${ task.id }">Delete</button>
        </div>
            `
    }
    else {
        return `
        <div class='input-group mb-3' id='checklist-task-${ task.id }'>
            <div class='input-group-prepend'>
                <div class='input-group-text'>
                    <input type='checkbox' aria-label='Checkbox for following text input' data-task="${ task.id }" id="${ task.status }" class='checkbox check' checked>
                    <label id='task-text'> ${ task.text } </label>
                </div>
            </div>

            <button type='button' class='btn fr' data-task="${ task.id }" id='edit'>Edit</button>
            <button type='button' id='delete' class='delete btn fr' data-task="${ task.id }">Delete</button>
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
            <input type='text' class='form-control' aria-label='Text input with checkbox' id='new-task-text'>
            </input>
        </div>
    </div>
        `
}


function createNewTask(){
    console.log('Creating a new task...')
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
        document.getElementById('checklist').innerHTML = "";
        // loadTasks();
        getModalTasks();

    }).fail(function() {
        console.log("That didn't work out.")
    });
}


function toggleStatus(task) {
    $(".checkbox").on('change', function() {
        console.log($(this))
        checkStatus = $(this).prop( 'checked' )
        console.log(checkStatus)
        let taskID = $(this).data('task')
        console.log(taskID)
        // let tasks = $(".checkbox")
        // console.log(tasks)
        $("#update-goal").on('click', function() {
            // currently not accepting the value of text below - Error: "This field is required"
            let task = {
                author:1,
                goal: $('#save-changes').attr('data-goal'),
                text: $('#task-text').text(),
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
            modal.find("#save-changes").attr('data-goal', goalId)

        }).fail(function(){
            console.log("There was an issue getting the user's goals.");
        })
        
    })
    deleteTask();
}

function getModalTasks () {
        let goalId = $('#save-changes').attr('data-goal')
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



$(document).ready(function () {
    setupCSRFAjax();
    loadNotes();
    loadGoals();
    loadTasks();
    addTask();
    toggleStatus();
    // bigAssDonutThing();
    completeGoal();
})



// MyChart JAVASCRIPT BELOW


// function bigAssDonutThing() {
//     var boxTotal = $("input.checkbox").length
//     console.log('boxTotal', boxTotal)

//     var completegoals = 7;    //completed_goals.length will count the number of completed bars
//     var incompletegoals = 3;  //incomplete_goals.length will count the number of incomplete bars

//     var ctx = document.getElementById("myChart");
//     var myChart = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: ["Goals I Have Accomplished", "Goals I Have Left"],
//             datasets: [{
//                 label: '',
//                 data: [completegoals, incompletegoals],
//                 backgroundColor: [
//                     '#011326',
//                     '#87c5dd'
//                 ],
//                 borderWidth: 0
//             }]
//         },
//         options: {
//             cutoutPercentage: 80,
//             // rotation: 1 * Math.PI,
//             // circumference: 1 * Math.PI,
//         }
//     });


//     //Crystal Dashboard testing this
//     // donut 3
//     var chDonutData3 = {
//         labels: ['Angular', 'React', 'Other'],
//         datasets: [
//         {
//             backgroundColor: colors.slice(0,3),
//             borderWidth: 0,
//             data: [21, 45, 55, 33]
//         }
//         ]
//     };
//     var chDonut3 = document.getElementById("chDonut3");
//     if (chDonut3) {
//     new Chart(chDonut3, {
//         type: 'pie',
//         data: chDonutData3,
//         options: donutOptions
//     });
// }
// }
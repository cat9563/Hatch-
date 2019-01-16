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
    var theButton = document.getElementById('the-plus-button');

    if (theButton) {
        theButton.addEventListener('click', function(){
            var newEl = document.createElement('li');
            newEl.innerHTML = newTaskLineHTML();
            var position = document.getElementById('checklist');
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
    console.log(event);
    let task = {
        author:1,
        goal: 5,
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
    for (let goal of goals) {
        document.getElementById('goal-list').insertAdjacentHTML('beforeend', goalHTML(goal));

        console.log('Goals have loaded...')
        var showTasks = document.getElementById('expand')
        showTasks.addEventListener('click', loadTasks)
    }
}


function loadTasks() {
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
        console.log("There was an issue getting the user's goals.");
    })
}

// takes the new task posted to API and also adds the HTML element on the dashboard
function addTaskToList(tasks){
    $(".checklist").empty();

    for (let task of tasks) {
        document.getElementById('checklist').insertAdjacentHTML('beforeend', taskHTML(task))
        console.log('Tasks have loaded!')
        // addTask()
    }
}




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
    }).then(function() {
        $('.goal-container').empty();
        loadGoals();
        // closeModal();
    });
}


function closeModal() {
    let modal = document.getElementById('newGoalModal')
    modal.classList.remove('modal-backdrop', 'fade', 'show');
}



// var saveTask = document.getElementById('save-changes')
// saveTask.addEventListener('click', function() {
//     postNewTask();
// })


// let checkTask = document.getElementById('checkbox')
// checkTask.addEventListener('click', function() {
// console.log('checked!')
// })






        
function goalHTML(goal) {
    return `
    <div class="goal-card" id="${ goal.id }">
        <div class="card-body" data-author="${ goal.author }">  
            <h5 class="ib card-title"> ${ goal.title }</h5>                               
            <!-- Expand button, connected to goal.id -->                                
            <button type="button" class="btn btn-primary" data-toggle="modal" data-goal="${ goal.id }" data-title="${ goal.title }" data-target="#tasksModal" id='expand'>Expand</button>
        </div>
    </div>
    `
}


function taskHTML(task) {
    return `
    <div class='input-group mb-3' id='checklist-task'>
        <div class='input-group-prepend'>
            <div class='input-group-text'>
                <input type='checkbox' aria-label='Checkbox for following text  input'class='checkbox'>
            </div>
        </div>
        <p> ${ task.text }</p>
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

loadProgressBar()



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
    



// DO NOT TOUCH ANYTHING BELOW THIS LINE!

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

setupCSRFAjax()


$('#tasksModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var goalId = button.data('goal') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    $.ajax({
        method: "GET",
        url: `/api/goals/${goalId}/`,
        contentType: 'application/json'
    }).done(function(response){
        modal.find("#tasksModalLabel").text(response.title)
        addTaskToList(response.tasks);        
    }).fail(function(response){
        console.log("There was an issue getting the user's goals.");
    })
})


dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);

let apiPage = 1;
let controller, scene;

var addLine = document.getElementById('plus-button')
addLine.addEventListener('click', addTask)

var submitTasks = document.getElementById('save-changes')
submitTasks.addEventListener('click', postNewTask)

var saveGoal = document.getElementById('save-goal')
saveGoal.addEventListener('click', function() {
    postNewGoal();
    closeModal();
})


// var showTasks = document.getElementById('expand')
// showTasks.addEventListener('click', loadTasks)


function addTask() {
    if (addLine) {
            var newEl = document.createElement('li');
            newEl.innerHTML = newTaskLineHTML()
            var position = document.getElementById('checklist');
        position.prepend(newEl)
        }
    // loadTasks()
}
        
function newTaskLineHTML(task) {
    return `
    <div class='input-group mb-3' id='checklist-task'>
            <div class='input-group-prepend'>
                <div class='input-group-text'>
                <input type='checkbox' aria-label='Checkbox for following text input'>
                </div>
                <input type='text' class='form-control' aria-label='Text input with checkbox'></input>
            </div>
        </div>
        `
}


function taskHTML(task) {
    return `
    <div class='input-group mb-3' id='checklist-task'>
            <div class='input-group-prepend'>
                <div class='input-group-text'>
                <input type='checkbox' aria-label='Checkbox for following text input'>
                </div>
            </div>
            <p> ${ task.text }</p>
        </div>
        `
}


// POST request to API to save tasks and calls loadTasks
function postNewTask(){
    let task = {
        author: 1,
        goal: 1,
        text: $('#new-task-text').val()
    }
    $.ajax({
        url: '/api/tasks/',
        method: 'POST',
        data: JSON.stringify(task), 
        contentType: 'application/json'
    }).then(function() {
        $(".checklist").empty();
        loadTasks();
    });

}


// takes the new task posted to API and also adds the HTML element on the dashboard
function addTaskToList(tasks){
    for (task of tasks)
    document.getElementById('checklist').insertAdjacentHTML('beforeend', taskHTML(task));
}


function getUserTasks(){
    $.ajax({
        method: 'GET',
        url: `/api/tasks/`,
        contentType: 'application/json'
    }).done(function(response){
        console.log(response)
        addTaskToList(response);

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
}


// Called at page load
function loadGoals() {
    getUserGoals(apiPage);
    apiPage =+ 1;
}

loadGoals()
loadTasks()

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
                            <div class="card-body" data-id="${ goal.id }" data-title="${ goal.title }" data-author="${ goal.author }">
<!-- Goal title as button to open modal -->                            
                                <h5 class="ib card-title"> ${ goal.title }</h5>
<!-- Modal text on front of card, not associated with checklist -->                                
                                
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" id='expand'>Expand</button>

<!-- Modal -->
                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">${ goal.title }</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                            </div>
<!-- Checklist within the modal body -->
                                            <div class="modal-body">
                                                <button id='plus-button' type="button" class="btn btn-success" style='margin: 5px; float: right;'>+</button>
                                                <ul id="checklist" style="list-style: none">                                     
                                                <li><div class="input-group mb-3" id='checklist-task'>
                                                    <div class="input-group-prepend">
                                        
                                                        <div class="input-group-text">
                                                        <input type="checkbox" aria-label="Checkbox for following text input">
                                                        </div>
                                                    </div>
                                                        <input type="text" class="form-control" aria-label="Text input with checkbox"
                                                        id='new-task-text'>
                                                </div>
                                                </li>
                                                </ul>
                                            </div>
<!-- END of checklist within modal body -->                                            
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

loadProgressBar()



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

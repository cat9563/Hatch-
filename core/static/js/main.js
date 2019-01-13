dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);

let apiPage = 1;
let controller, scene;

var addLine = document.getElementById('plus-button')
addLine.addEventListener('click', addTask)

var submitTasks = document.getElementById('save-changes')
submitTasks.addEventListener('click', postNewTask)

var saveGoal = document.getElementById('save-goal')
saveGoal.addEventListener('click', postNewGoal)


function addTask() {
    if (addLine) {
            var newEl = document.createElement('li');
            newEl.innerHTML = taskHTML()
            var position = document.getElementById('checklist');
        position.appendChild(newEl)
        }}
        

function taskHTML() {
return `
    <div class='input-group mb-3' id='checklist-task'>
            <div class='input-group-prepend'>
                <div class='input-group-text'>
                <input type='checkbox' aria-label='Checkbox for following text input'>
                </div>
            </div>
            <input type='text' class='form-control' aria-label='Text input with checkbox'>
        </div>
        `
}


// POST request to API to save tasks and calls addTaskToList
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
    }).then(function (task) {
        addTaskToList(task);
    });

}


// takes the new task posted to API and also adds the HTML element on the dashboard
function addTaskToList(task){
    document.getElementById('checklist').insertAdjacentHTML('beforeend', taskHTML(task));
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
    }).then(function (goal) {
        loadGoals();
    });

}

// function addGoalToList(){
//     if (addCard) {
//         var newEl = document.createElement('div');
//         newEl.innerHTML = newGoalHTML()
//         var position = document.getElementById('goal-list');
//     position.appendChild(newEl)
//     }}


function goalHTML(goal) {
    return `
    <div class="goal-card">
                            <div class="card-body">
<!-- Goal title as button to open modal -->                            
                                <h5 class="ib card-title"> ${ goal.title }</h5>
<!-- Modal text on front of card, not associated with checklist -->                                
                                
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Expand</button>

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
                                                <button type="button" class="btn btn-primary" id='save-canges'>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `
}

function setupCSRFAjax () {
    var csrftoken = Cookies.get('csrftoken')
    console.log(csrftoken);
    console.log('Inside setupCSRFAjax function')
    $.ajaxSetup({
      beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader('X-CSRFToken', csrftoken)
        }
      }
    })
    console.log('do we make it to end of setupCSRFAjax?')
}

function csrfSafeMethod(method){
// these HTTP methods do not require CSRF protection
console.log('do we make it into csrfSafeMethod?')
return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method))

}

setupCSRFAjax()
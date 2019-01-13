let apiPage = 1;
let controller, scene;
dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);


var addLine = document.getElementById('plus-button')
addLine.addEventListener('click', addTask)

var submitTasks = document.getElementById('save-changes')
submitTasks.addEventListener('click', postNewTask)


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


function addTaskToList(task){
    document.getElementById('checklist').insertAdjacentHTML('afterbegin', taskHTML(task));
    
}


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

function loadGoals() {
    getUserGoals(apiPage);
    apiPage =+ 1;
}

function getUserGoals(){
    $.ajax({
        method: 'GET',
        url: `/api/goals/`,
        contentType: 'application/json'
    }).done(function(response){
        console.log(response)
        addGoalsToDashboard(response);

        // scene.update();
    }).fail(function(response){
        console.log("There was an issue getting the user's goals.");
    })
}

loadGoals()

function addGoalsToDashboard(goals){
for (goal of goals)
    document.getElementById('goal-list').insertAdjacentHTML('afterbegin', goalHTML(goal))
}

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

// let isNoteIdEven = function(note){
    //     let note = ${note.id}
    //     return (note%2 === 0 ) ? true : false;
    // }
    
    // alert(isNoteIdEven(note[0]))
    
    // psuedo code if note.id % 1 
    // return   <div class="item item-blue" id="blue"> ${note.text} </div>
    // else 
    //return   <div class="item item-blue" id="pink"> ${note.text} </div>


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

// function postNewNotes(){

//     let note = {
//         text: $()
//     }
// }

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

loadNotes()

// var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

// function csrfSafeMethod(method) {
//     // these HTTP methods do not require CSRF protection
//     return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
// }
// $.ajaxSetup({
//     beforeSend: function(xhr, settings) {
//         if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
//         }
//     }
// });
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

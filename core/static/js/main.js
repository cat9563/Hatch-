dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);



var addLine = document.getElementById('plus-button')
addLine.addEventListener('click', addTask2)

function addTask() {
    if (addLine) {
            var newEl = document.createElement('li');
            newEl.innerText = 'HALP'
            var position = document.getElementById('checklist');
        position.appendChild(newEl)
        }}

function addTask2() {
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

function postNewTask(){
    let task = {
        text: $('#new-task-text').val()
    }
    $.ajax({
        url: '/api/tasks/',
        method: 'POST',
        data: JSON.stringify(task), 
        contentType: 'application/json'
    }).then(function (task) {

        addTaskToList(task)
        toggleModal();
    });
}


function addTaskToList(task){
    document.getElementById('checklist').insertAdjacentHTML('afterbegin', taskHTML(task));
    
}
function saveTask(){
    let taskSubmit = document.getElementById('save-changes');
    if (taskSubmit) {
        taskSubmit.addEventListener('click', postNewTask);
    }}
function addTask() {
    var checklist = []
    var taskLine = document.getElementById('checklist-task')

    let addTask = document.getElementById('plus-button')
    if (addTask) {
        addTask.addEventListener('click', function() {
            checklist.push(taskLine)
        })
    }
}


function addTask() {
    var checklist = []
    var taskLine = document.getElementById('checklist-task')

    let addTask = document.getElementById('plus-button')
    if (addTask) {
        addTask.addEventListener('click', function() {
            checklist.push(taskLine)
            console.log('plus button clicked')
        })
    }
}

addTask()



// function getUserNotes(){
//     console.log(Yay);
//     $.ajax({
//         type: "GET",
//         url: "/api/notes/",
//         dataType: "json",
//         data: {
//             text: '${note.text}'
//         }
//     })
// }

// getUserNotes.text 

$('.myapi').click( function() {
    console.log('dude')
    $.ajax({
        url: "/api/notes/",
        dataType: "json",
        success :  function (data) {
            $('#b1').text( data[0].text);
        }
    });
});










dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);
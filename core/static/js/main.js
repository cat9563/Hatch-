// create a new line item
var newEl = document.createElement('li');
console.log(newEl)
// create a text node that says 'testing'
var newText = document.createTextNode('testing');
// console.log(newText)
// grab the element 'checklist'
var position = document.getElementById('checklist');
// console.log(position)
// new line item containing the text node that says 'testing'
var newTask = newEl.appendChild(newText);
// add new line containing text node that says 'testing' onto element 'checklist'
position.appendChild(newTask)





// function addTask() {
//     // var checklist = [];
//     // var taskLine = document.getElementById('checklist-task');
//     var newEl = document.createElement('li');
//     var newText = document.createTextNode('second test');
//     var position = document.getElementById('checklist')[0];

//     let addTask = document.getElementById('plus-button')
//     if (addTask) {
//         addTask.addEventListener('click', function() {
//             newEl.appendChild(newText)
//             position.appendChild(newEl)
//             console.log('plus button clicked')
//         })
//     }
// }

// addTask()
// MO: dont forget to call the function once it's done being written

dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);


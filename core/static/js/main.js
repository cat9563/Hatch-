// // create a new line item
// var newEl = document.createElement('li');
// console.log(newEl)
// // create a text node that says 'testing'
// var newText = document.createTextNode('testing');
// // console.log(newText)
// // grab the element 'checklist'
// var position = document.getElementById('checklist');
// // console.log(position)
// // new line item containing the text node that says 'testing'
// var newTask = newEl.appendChild(newText);
// // add new line containing text node that says 'testing' onto element 'checklist'
// position.appendChild(newTask)


var addLine = document.getElementById('plus-button')
addLine.addEventListener('click', addTask)



function addTask() {
    console.log('Beginning of Function')
    if (addLine) {
        // addLine.addEventListener('click', function() {
            var newEl = document.createElement('li');
            newEl.innerText = 'HALP'
            // console.log(newEl)
            // var newText = document.createTextNode('test');
            // console.log(newText)
            // var newTask = newEl.appendChild(newText);
            var position = document.getElementById('checklist');
        position.appendChild(newEl)
        
        
        // console.log(newTask)
        console.log('end of function')
        }}
        

    // var addLine = document.getElementById('plus-button')



function addChecklistTask() {
return`
    <li>
        <div class="input-group mb-3" id='checklist-task'>
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input">
                </div>
            </div>
            <input type="text" class="form-control" aria-label="Text input with checkbox">
        </div>
    </li>
`
}
dragula([document.getElementById("left-defaults"), document.getElementById("right-defaults")]);


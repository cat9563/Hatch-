function setupNewSnippetModal() {
    $("#addNote").on('click', function () {
        $("#add-snippet-modal").addClass('is-active')
    })
    $(".modal-background,.modal-close, #cancel-button").on('click', function (event) {
        event.preventDefault()
        $("#add-snippet-modal").removeClass('is-active')
    })
    $('#new-snippet-form').on('submit', function (event) {
        event.preventDefault()
        console.log("hi")
        let snippet = {
            content: $('#new-snippet-content').val(),
        }
        $.ajax({
            url: '/api/notes/',
            method: 'POST',
            data: JSON.stringify(snippet),
            contentType: 'application/json',
            "is_copy": false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', csrftoken)
            },
        }).then(function (snippet) {
            $("#my-snippets").append(snippetHtml(snippet))
            $("#add-snippet-modal").removeClass('is-active')
        }

        )
    })
}
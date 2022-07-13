const update = document.querySelector('#update-button')
const remove = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', changeYodaQuote)
remove.addEventListener('click', removeDarthQuote)



function changeYodaQuote() {
   
    fetch('/quotes', {
        method: 'put',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({
            name : 'Darth Vader',
            quote : 'I find your lack of faith disturbing.'
        })

    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => window.location.reload(true))
}

function removeDarthQuote() {
    fetch('/quotes', {
        method: 'delete',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({
                name: 'Darth Vader'
            })
    })
    .then(res => {
            if(res.ok) return res.json()
        })
    .then(response => {
        
            if (response === 'No quote to delete') {
                messageDiv.textContent = 'No Darth Vader quote to delete'
            }
            else {
                window.location.reload(true)
            }
            
        })
}
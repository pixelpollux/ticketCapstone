const ticketTitle = document.getElementById("ticketTitle");
// function textToInput(){
// 	var txt = "Nick";
// 	document.getElementById("my_field").value = txt;
// }

function deleteTicket(id) {
    fetch('/tickets', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: id
            })
        })
       /* .then(res => {
            if (res.ok)
                return res.json()
        }) */
        .then(response => {
            window.location.reload();
        })
        .catch(error => console.error(error))
}

function createTicket() {
    fetch('/tickets', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ticketTitle: ticketTitle.value
        })
    })
    .then(response => {
        window.open("/tickets");
    })
    .catch(error => console.error(error))    
}

function upd() {
    fetch('/tickets', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: idInputUpdate.value,
                title: titleInputUpdate.value,
                desc: descInputUpdate.value
            })
        })
        .then(res => {
            if (res.ok) {
                //return res.json()
            }
        })
        .then(response => {
            window.location.reload();
        })
}

/*
function updateTicket() {
    fetch('/tickets', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ticketTitle: ticketTitle.value
        })
    })
    .then(response => {
        window.open("/tickets");
    })
    .catch(error => console.error(error))    
}
*/
// function textToInput(){
// 	var txt = "Nick";
// 	document.getElementById("my_field").value = txt;
// }

function deleteTicket(id) {
    console.log("Main js working");
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
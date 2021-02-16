const express = require('express');
const app = express();


// ========================
// get
// ========================

app.get('/', (req, res) => {
    res.sendFile('/Users/student/Documents/Documents - STUSD1040/dev/ticketCapstone/index.html')
    // res.sendFile('/Users/student/Documents/Documents-STUSD1040/dev/selfEXPRESSion/index.html')
})



// ========================
// Listen
// ========================
const port = 9999
app.listen(port, function(){
    console.log(`listening on port ${port}`)
})
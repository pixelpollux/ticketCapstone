const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


// ========================================================================
// index
// ========================================================================

app.get('/', (req, res) => {
    res.sendFile('/Users/student/Documents/Documents - STUSD1040/dev/ticketCapstone/index.html')
})

// ========================================================================
// create form page
// ========================================================================

app.get('/createForm', function (req, res,html) {
    res.sendFile(path.join(
        '/Users/student/Documents/Documents - STUSD1040/dev/ticketCapstone/createForm.html'
    ));
});





// ========================
// Listen
// ========================
const port = 9999
app.use('/', router);
app.listen(port, function(){
    console.log(`listening on port ${port}`)
})

// app.listen(process.env.port || 9999);
// console.log("Running at Port 9999");

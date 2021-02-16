const express = require('express');
const app = express();

// ========================
// Listen
// ========================
const port = 3000
app.listen(port, function(){
    console.log(`listening on port ${port}`)
})
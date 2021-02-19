const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const path = require('path');
const router = express.Router();

//not sure if need
const { response } = require('express');





// ========================================================================
//mongo
// ========================================================================
MongoClient.connect('mongodb+srv://capstonebuddies:capstonegroup@cluster0.jmk06.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('ticket-tracker-db')
    const ticketsCollection = db.collection('tickets')

    // ========================================================================
    //body parser
    // ========================================================================
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.set('view engine', 'ejs')



    // ========================================================================
    // index
    // ========================================================================

    app.get('/', (req, res) => {
        res.sendFile('/Users/student/Documents/Documents - STUSD1040/dev/ticketCapstone/index.html')
    })

    // ========================================================================
    // ticket dash page
    // ========================================================================

    app.get('/tickets', (req, res) => {
        res.sendFile('/Users/student/Documents/Documents - STUSD1040/dev/ticketCapstone/tickets.html');

        db.collection('tickets').find().toArray()
        .then(results => {
        console.log(results)
        })
        .catch(error => console.error(error))
    })


    // ========================================================================
    // create form page
    // ========================================================================

    app.get('/createForm', function (req, res,html) {
        res.sendFile(path.join(
            '/Users/student/Documents/Documents - STUSD1040/dev/ticketCapstone/createForm.html'
        ));
    });

    // app.get('/tickets', (req, res) => {
    //     const cursor = db.collection('tickets').find()
    //     console.log(cursor)
        
    // })

    // app.get('/tickets', (req, res) => {
    //     db.collection('tickets').find().toArray()
    //     .then(results => {
    //       console.log(results)
    //     })
    //     .catch(error => console.error(error))
    // })


    //creates tickets and sends to database
    app.post('/tickets', (req, res) => {
        // console.log(req.body)
        // console.log("did this work?")
        ticketsCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            res.redirect('/tickets');
        })
        .catch(error => console.error(error))
    })

  })






// ========================
// Listen
// ========================
const port = 9990
app.use('/', router);
app.listen(port, function(){
    console.log(`listening on port ${port}`)
})

// app.listen(process.env.port || 9999);
// console.log("Running at Port 9999");

const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const ObjectID = require('mongodb').ObjectID;
const path = require('path');
const router = express.Router();

//not sure if need
const { response } = require('express');


// ========================================================================
//auth0
// ========================================================================

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:9990',
  clientID: 'VqX5PxoT4S6pBQg2ehZGtrjcMrxTDOuY',
  issuerBaseURL: 'https://dev-kk-ig869.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//creates profile after login
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

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
    app.use(bodyParser.json());

    //adds public folder for static files
    app.use(express.static('public'));
    app.set('view engine', 'ejs')


    // ========================================================================
    // index
    // ========================================================================

    //auth0 authentication
    app.get('/', (req, res) => {
        if (req.oidc.isAuthenticated()){
            //if logged in, redirects to ticket dashboard
            console.log('logged in')
            res.redirect('/tickets');
        } else {
            //redirects logout to login screen
            console.log('Logged out');
            res.redirect('/login');
        };
    })

    // ========================================================================
    // ticket dash page
    // ========================================================================

    //renders tickets to ticket page
    app.get('/tickets', (req, res) => {
        db.collection('tickets').find().toArray()
        .then(results => {
            res.render('tickets.ejs', { tickets: results })
        })
        .catch(error => console.error(error))
    })

    //creates tickets and sends to database
    app.post('/tickets', (req, res) => {
        // console.log(ticketsCollection);
        console.log(req.body);
        ticketsCollection.insertOne(req.body)
        .then(result => {
            // console.log(result)
            //sends back to ticket page
            res.redirect('/tickets');
        })
        .catch(error => console.error(error))
    })


    // ========================================================================
    // create form page
    // ========================================================================

    app.get('/createForm', (req, res,html) => {
        res.sendFile(path.join(__dirname + '/public/html/createForm.html'));
    });

    // ========================================================================
    // ticket details page
    // ========================================================================

    app.get('/tickets/:id', (req, res,html) => {
        // console.log(req.params.id);
        db.collection('tickets').find({ _id: ObjectID(req.params.id) }).toArray()
        .then(results => {
            console.log(results);
            res.render('ticketDetails.ejs', { tickets: results })
        })
        .catch(error => console.error(error))
    });    

    //edit ticket
    app.put('/tickets', (req, res) => {
        // create a filter for a movie to update
        const filter= { _id: ObjectID(req.body.id)};
        // this option instructs the method to create a document if no documents match the filter
        const options= { upsert: false };
        // create a document that sets the plot of the movie
        const updateDoc= {
        $set: {
            ticketTitle: req.body.ticketTitle,
        },
        };
         ticketsCollection.updateOne(filter, updateDoc, options)
         .then(results=> {
        res.redirect('/tickets');
         })
         .catch(error=>console.error(error))
        });

    //delete ticket
    app.delete('/tickets', (req,res) => {
        console.log("delete works");
        db.collection('tickets').deleteOne({_id: ObjectID(req.body.id)})
        .then(results => {
            console.log("ticket deleted");
            res.redirect('/tickets');
        })
        .catch(error=>console.error(error))
    });





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

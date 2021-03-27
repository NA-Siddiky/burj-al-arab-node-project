const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');


const port = 5000

const app = express()
app.use(cors());
app.use(bodyParser.json());

var serviceAccount = require("./burj-al-arab-ccb7a-firebase-adminsdk-0xygq-140640b860.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const pass = "pust@2020";

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alarab:pust@2020@cluster0.ylija.mongodb.net/BurjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookings = client.db("BurjAlArab").collection("bookings");
    console.log("DB connected successfully");

    app.post('/addBooking', (req, res) => {
        const newBooking = req.body;
        bookings.insertOne(newBooking)
            .then(result => {
                // console.log(result);
                res.send(result.insertedCount > 0);
            })
        console.log(newBooking);
    })

    app.get('/bookings', (req, res) => {
        const bearer = req.headers.authorization
        if (bearer && bearer.startsWith('Bearer ')) {
            const idToken = bearer.split(' ')[1];
            console.log({ idToken });

            // idToken comes from the client app
            admin
                .auth()
                .verifyIdToken(idToken)
                .then((decodedToken) => {
                    const tokenEmail = decodedToken.email;
                    const queryEmail = req.query.email;
                    console.log(tokenEmail, queryEmail);
                    if (tokenEmail == req.query.email) {
                        bookings.find({ email: req.query.email })
                            .toArray((err, documents) => {
                                res.send(documents);
                            })
                    }

                })
                .catch((error) => {
                    // Handle error
                });

        }

        // bookings.find({ email: req.query.email })
        //     .toArray((err, documents) => {
        //         res.send(documents)
        //     })
    })

});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)
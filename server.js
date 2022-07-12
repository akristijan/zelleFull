const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


//middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

let db,
    dbUrl = process.env.DB_STRING,
    collection

//Connect to DB
MongoClient.connect(dbUrl)
    .then(client => {
        console.log("Connected to DB")
        db = client.db("star-wars-quotes")
        collection = db.collection("quotes")
    })
    .catch(err => console.log(err))


//ROUTES
app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
        .then(results =>res.render('index.ejs', {quote : results}))
        .catch(error => console.log(error))

})

app.post('/quotes', (req,res) => {
    collection.insertOne(req.body)
        .then(result => res.redirect('/'))
        .catch(error => console.log(error))
})

//Listen on PORT
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT} port`)
}) 




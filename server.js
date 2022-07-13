const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
//middleware
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
        .then(results =>res.render('index.ejs', {quotes : results}))
        .catch(error => console.log(error))

})

app.post('/quotes', (req,res) => {
    collection.insertOne(req.body)
        .then(result => res.redirect('/'))
        .catch(error => console.log(error))
})

app.put('/quotes', (req, res) => {
    collection.findOneAndUpdate(
        { name : 'Yoda' },
        {
            $set: {
                name : req.body.name,
                quote: req.body.quote
            }
        },
        {
            upsert: true
        }

        )
        .then(result => res.json('Success!'))
        .catch(error => console.log(error))
})

app.delete('/quotes', (req, res) => {
    
    collection.deleteOne(
        
        { name : req.body.name}
    )
    .then(result=> {
        if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
        res.json(`Deleted Darth Vader's quote`)
    } )
    .catch(error => console.error(error))
})

//Listen on PORT
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT} port`)
}) 




const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router');
const cors = require('cors');

app.use(cors())
app.use(express.json())

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if(err){
        console.log(err);
    }

    const db = client.db('risk_project');
    const playerCollection = db.collection('players');
    const playerRouter = createRouter(playerCollection)
    app.use('/api/players', playerRouter);

    app.listen(5000, function(){
        console.log(`app listening on port ${this.address().port}`);
    })
})
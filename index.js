const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send("Hello world!!!");
});

app.get('/bucketlist', (req, res) =>{
    res.send([1,5,6,7])
});

app.get('/bucketlist/:id', (req, res) =>{
    res.send(req.params.id)
});

app.get('/bucketlist/:year/:month', (req, res) =>{
    res.send(req.params) //example of url => http://localhost:3000/bucketlist/2018/2
});

app.get('/posts/:year/:month', (req, res) =>{
    res.send(req.query)
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
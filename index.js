const express = require('express');
const app = express();

const bucketlist =[
    {id:1, name: "Get a degree"},
    {id:2, name: "Get a good job"},
    {id:3, name: "Improve my technical and managerial skills"},
    {id:4, name: "Start a company"},
]

app.get('/', (req, res) =>{
    res.send("Hello world!!!");
});

app.get('/bucketlist', (req, res) =>{
    res.send(bucketlist)
});

// app.get('/bucketlist/:id', (req, res) =>{
//     res.send(req.params.id)
// });

app.get('/bucketlist/:id', (req, res) =>{
    const list = bucketlist.find(b => b.id === parseInt(req.params.id));
    if(!list) res.status(404).send('The list with the given ID was not found.');
    res.send(list);
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
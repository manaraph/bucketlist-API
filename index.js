const Joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json());

const bucketlist =[
    {id:1, name: "Get a degree"},
    {id:2, name: "Get a good job"},
    {id:3, name: "Improve my technical and managerial skills"},
]

//Get Requests
app.get('/', (req, res) =>{
    res.send("Hello world!!!");
});

app.get('/api/bucketlist', (req, res) =>{
    res.send(bucketlist)
});

app.post('/api/bucketlist', (req, res) =>{
    
    //Manual Validation
    // if(!req.body.name || req.body.name.length < 3){
    //     // 400 Bad Request
    //     res.status(400).send('Name is requires and should be minimum of 3 characters');
    //     return;
    // }

    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    console.log(result);
    
    
    if(result.error){
        // 400 Bad Request
        // res.status(400).send(result.error);
        res.status(400).send(result.error.details[0].message);
        return;
    }
    

    const list = {
        id: bucketlist.length + 1,
        name: req.body.name
    }

    bucketlist.push(list);
    // res.send(req.body.name);
    res.send(list);
});

// app.get('/bucketlist/:id', (req, res) =>{
//     res.send(req.params.id)
// });

app.get('/api/bucketlist/:id', (req, res) =>{
    const list = bucketlist.find(b => b.id === parseInt(req.params.id));
    if(!list) res.status(404).send('The list with the given ID was not found.');
    res.send(list);
});

app.post('/api/bucketlist/:id', (req, res) =>{
    const list = bucketlist.find(b => b.id === parseInt(req.params.id));
    if(!list) res.status(404).send('The list with the given ID was not found.');
    res.send(list);
});

app.get('/api/bucketlist/:year/:month', (req, res) =>{
    res.send(req.params) //example of url => http://localhost:3000/api/bucketlist/2018/2
});

app.get('/api/posts/:year/:month', (req, res) =>{
    res.send(req.query)
});

//POST Requests
// app.post('/posts/:year/:month', (req, res) =>{
//     res.send(req.query)
// });

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
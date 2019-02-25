const Joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json());

const bucketlist =[
    {id:1, name: "Get a degree"},
    {id:2, name: "Get a good job"},
    {id:3, name: "Improve my technical and managerial skills"},
];

const bucketlist2 = [
    {
        id: 1,
        name: "bucketlist1",
        items: [
            {
                id: 1,
                name: "I need to do X",
                date_created: "2015-08-12 11:57:23",
                date_modified: "2015-08-12 11:57:23",
                done: false
            },
            {
                id: 2,
                name: "I need to do Y",
                date_created: "2015-08-25 11:57:23",
                date_modified: "2015-08-25 11:47:23",
                done: false
            }
        ],
        date_created: "2015-08-12 11:57:23",
        date_modified: "2015-08-12 11:57:23",
        created_by: "1113456"
    },
    {
        id: 2,
        name: "bucketlist2",
        items: [
            {
                id: 1,
                name: "I need to do A",
                date_created: "2015-08-12 11:57:23",
                date_modified: "2015-08-12 11:57:23",
                done: false
            },
            {
                id: 2,
                name: "I need to do B",
                date_created: "2015-08-25 11:57:23",
                date_modified: "2015-08-25 11:47:23",
                done: false
            }
        ],
        date_created: "2015-08-12 11:57:23",
        date_modified: "2015-08-12 11:57:23",
        created_by: "1234567"
    }
]


app.get('/', (req, res) =>{
    res.send("Hello world!!!");
});

app.get('/api/bucketlist', (req, res) =>{
    res.send(bucketlist)
});

app.post('/api/bucketlist', (req, res) =>{
    
    //Custom Validation
    // if(!req.body.name || req.body.name.length < 3){
    //     // 400 Bad Request
    //     res.status(400).send('Name is requires and should be minimum of 3 characters');
    //     return;
    // }

    //Validation with joi
    const result = validateBucketlist(req.body);
    
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

app.get('/api/bucketlist/:id', (req, res) =>{
    const list = bucketlist.find(b => b.id === parseInt(req.params.id));
    if(!list) return res.status(404).send('The list with the given ID was not found.');
    res.send(list);
});

app.put('/api/bucketlist/:id', (req, res) => {
    //Look up the bucketlist
    const list = bucketlist.find(b => b.id === parseInt(req.params.id));
    if(!list) return res.status(404).send('The list with the given ID was not found.');    //If not existing, return 404

    //Validate
    const { error } = validateBucketlist(req.body);       //object destructuring

    //If invalid, return 400 - Bad Request
    if(error) return res.status(400).send(error.details[0].message);    // 400 Bad Request
    
    //Update bucketlist
    list.name = req.body.name;
    res.send(list);   //Return the updated bucketlist 
});


app.delete('/api/bucketlist/:id', (req, res) => {
    //Look up the bucketlist
    const list = bucketlist.find(b => b.id === parseInt(req.params.id));
    if(!list) return res.status(404).send('The list with the given ID was not found.');    //If not existing, return 404

    //Delete
    const index = bucketlist.indexOf(list);
    bucketlist.splice(index, 1);
    
    res.send(list);   //Return the deleted bucketlist 
});


/**********************************************
          bucketlist version 2
***********************************************/
app.get('/api/v2/bucketlist', (req, res) =>{
    res.send(bucketlist2)
});

app.post('/api/v2/bucketlist', (req, res) =>{
    
    //Validation with joi
    const {error} = validateBucketlist2(req.body);
    const date = getDateTime();    
    
    if(error) return res.status(400).send(error.details[0].message);
    
    bucklistItems = req.body.items;

    // const {error} = validateBucketlist2(req.body);
    let myItems = [];
    for(let i=1; i<=bucklistItems.length; i++){
        let isdone = false
        // console.log(bucklistItems[i-1]);

        const {itemError} = validateBucketlist(bucklistItems[i-1]);
        if(itemError) return res.status(400).send(itemError.details[0].message);

        if(bucklistItems[i-1].done){
            isdone = bucklistItems[i-1].done
        }
        
        myItems.push(
            {
                id: i,
                name: bucklistItems[i-1].name,
                date_created: date,
                date_modified: date,
                done: isdone
            }
        )
    }

    const list = {
        id: bucketlist2.length + 1,
        name: req.body.name,
        date_created: date,
        date_modified: date, 
        created_by: 'This user',
        items:  myItems
    }

    bucketlist2.push(list);
    // res.send(req.body.name);
    res.send(list);
});

app.get('/api/v2/bucketlist/:id', (req, res) =>{
    const list = bucketlist2.find(b => b.id === parseInt(req.params.id));
    if(!list) return res.status(404).send('The list with the given ID was not found.');
    res.send(list);
});

app.put('/api/v2/bucketlist/:id', (req, res) => {
    //Look up the bucketlist
    const list = bucketlist2.find(b => b.id === parseInt(req.params.id));
    if(!list) return res.status(404).send('The list with the given ID was not found.');    //If not existing, return 404

    //Validate
    const { error } = validateBucketlist2(req.body);       //object destructuring
    //If invalid, return 400 - Bad Request
    if(error) return res.status(400).send(error.details[0].message);    // 400 Bad Request
    
    bucklistItems = req.body.items;
    const date = getDateTime();    

    let myItems = [];
    for(let i=1; i<=bucklistItems.length; i++){
        let isdone = false
        // console.log(bucklistItems[i-1]);

        const {itemError} = validateBucketlist(bucklistItems[i-1]);
        if(itemError) return res.status(400).send(itemError.details[0].message);

        if(bucklistItems[i-1].done){
            isdone = bucklistItems[i-1].done
        }
        
        myItems.push(
            {
                id: i,
                name: bucklistItems[i-1].name,
                date_created: date,
                date_modified: date,
                done: isdone
            }
        )
    }

    //Update bucketlist
    list.name = req.body.name;
    list.date_modified = date,
    list.items = myItems
    res.send(list);   //Return the updated bucketlist 
});


app.delete('/api/v2/bucketlist/:id', (req, res) => {
    //Look up the bucketlist
    const list = bucketlist2.find(b => b.id === parseInt(req.params.id));
    if(!list) return res.status(404).send('The list with the given ID was not found.');    //If not existing, return 404

    //Delete
    const index = bucketlist2.indexOf(list);
    bucketlist2.splice(index, 1);
    
    res.send(list);   //Return the deleted bucketlist 
});

//Some tests
app.get('/api/bucketlist/:year/:month', (req, res) =>{
    res.send(req.params) //example of url => http://localhost:3000/api/bucketlist/2018/2
});

app.get('/api/posts/:year/:month', (req, res) =>{
    res.send(req.query)
});

// app.get('/bucketlist/:id', (req, res) =>{
//     res.send(req.params.id)
// });

function validateBucketlist(list){
    //Validate
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(list, schema);

}

function validateBucketlist2(list){
    //Validate
    const schema = {
        name: Joi.string().min(3).required(),
        items: Joi.array().required(),
        done: Joi.boolean()
    }
    return Joi.validate(list, schema);

}

function getDateTime(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    
    return dateTime;
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
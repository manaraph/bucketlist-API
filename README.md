# Bucketlist-API
> An API with Node and Express 

## Cloning Repository
> git clone git@github.com:manaraph/bucketlist-API.git

## Installation and running app with npm
``` bash

cd API-with-nodejs

# install dependencies
npm install 

# serve app at localhost:3000
npm start

```
## Installation and running app with yarn
``` bash

cd bucketlist-API

# install dependencies
yarn 

# serve app at localhost:3000
yarn start

```


## API Endpoints
You can use postman or even curl to reach out to the following api endpoints:

URL Endpoint	|               HTTP Request   | Resource Accessed |
----------------|-----------------|-------------|------------------
/auth/login	  |     POST	| Logs a user in
/auth/logout	  |     POST	| Logout
/api/bucketlists	              |      POST	|Create a new Bucketlist
/api/bucketlists	              |      GET	|     Retrieve all bucketlists
/api/bucketlists/<id>            |  	GET	    | Retrieve a bucketlist by ID
/api/bucketlists/<id>	          |      PUT	|     Update a bucketlist
/api/bucketlists/<id>	          |      DELETE	| Delete a bucketlist
/api/v2/bucketlists/<id>/items/  |           GET    |Retrive items in a given bucket list
/api/v2/bucketlists/<id>/items/     |     POST	| Create items in a bucketlist 
/api/v2/bucketlists/<id>/items/<item_id>|	GET	| Get a single item in a bucket list
/api/v2/bucketlists/<id>/items/<item_id>|	DELETE	| Delete an item in a bucketlist 
/api/v2/bucketlists/<id>/items/<item_id>|	PUT   	| Update a bucketlist item details 

<!-- ## Credits
- [How to set-up a powerful API with Nodejs, GraphQL, MongoDB, Hapi, and Swagger](https://medium.freecodecamp.org/how-to-setup-a-powerful-api-with-nodejs-graphql-mongodb-hapi-and-swagger-e251ac189649) - Indrek Lasn -->
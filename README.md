# Bucketlist-API
> An API with Node and Express 

## Cloning Repository
> git clone https://github.com/manaraph/bucketlist-API.git

## Installation and running app with npm
``` bash

cd bucketlist-API

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

URL Endpoint	|               HTTP Request   | Resource Accessed | Access Type|
----------------|-----------------|-------------|------------------
/api/bucketlists/auth/register   |      POST	| Register a new user|publc
/api/bucketlists/auth/login	  |     POST	| Login and retrieve token|public
/api/bucketlists/auth/logout	  |     POST	| Logout and thus deactivate token|public
/api/bucketlists/auth/reset-password	  |     PUT	| Reset your password when logged in|private
/api/bucketlists	              |      POST	|Create a new Bucketlist|private
/api/bucketlists	              |      GET	|     Retrieve all bucketlists for user|private
/api/bucketlists/<buckelist_id>            |  	GET	    | Retrieve a bucketlist by ID | private
/api/bucketlists/<bucketlist_id>	          |      PUT	|     Update a bucketlist |private
/api/bucketlists/<bucketlist_id>	          |      DELETE	| Delete a bucketlist |private
/api/bucketlists/<bucketlist_id>/items/  |           GET    |Retrive items in a given bucket list|private
/api/bucketlists/<bucketlist_id>/items/     |     POST	| Create items in a bucketlist |private
/api/bucketlists/<bucketlist_id>/items/<item_id>|	DELETE	| Delete an item in a bucketlist |prvate
/api/bucketlists/<bucketlist_id>/items/<item_id>|	PUT   	|update a bucketlist item details |private

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

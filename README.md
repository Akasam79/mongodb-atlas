# mongodb-atlas

## Routes
## Expected payloads(Json)

* GET Route : https://mongodb-task.herokuapp.com/client

* POST route : https://mongodb-task.herokuapp.com/
# code block 
{
    "name": "client's_name",
    "email": "client's_email",
    "country": "client's_country"
}

* The POST route takes in name, email and country as parameter to be sent in the format as given above

* PUT route : https://mongodb-task.herokuapp.com/client
# code block 
{
    "id": "client's_id",
    "name": "client's_name",
    "email": "client's_email",
    "country": "client's_country"
}

* The put route takes in the client's id, and any other parameter that needs to be updated as parameters

* DELETE route : https://mongodb-task.herokuapp.com/client
# code block 
{
    "id": "client's_id"
}

* DELETE route takes the client id as parameter to delete.

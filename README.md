# mongodb-atlas

* P.S : All expected payloads are in JSON format


## Routes

* GET Route : https://mongodb-task.herokuapp.com/clients

* POST route : https://mongodb-task.herokuapp.com/

* PUT route : https://mongodb-task.herokuapp.com/client/:id

* DELETE route : https://mongodb-task.herokuapp.com/client/:id




### The POST route takes in name, email and country as parameter to be sent in the format as given below
* format for POST request
# code block 
{
    "name": "client's_name",
    "email": "client's_email",
    "country": "client's_country"
}




### The PUT route takes in the client's id as part of request params i.e :id = user_id and any other parameter that needs to be updated should be passed in the request body
* format for PUT request
# code block 

{
    "name": "client's_name",
    "email": "client's_email",
    "country": "client's_country"
}




### the DELETE route takes the client id as part of request params as in the PUT request but doesnt take any other parameter

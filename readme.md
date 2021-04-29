# INTRO
This is the poor-mans recreation of twitter from a Mysql database to a Express js API to a react front end from a man who spent four days coding is straight. 
Its bare-bones okay and doesn't support EVERYTHING twitter supports due to only putting a whole four days into it (which definitely wasn't enough) and its a bit all over the place **BUT IT WORKS.**

# SET UP
This will be done in four parts 

### 1. assumptions 
1a.you have a localhost mysql server running on port 3306 
1b.you have node.js installed ( [if you don't have it installed heres the link](https://nodejs.org/en/) )

### 2. Downloading files
If you don't have the files locally downloaded already you can always use git or just download the zip from above

### 3. Configure and building database
1.Inside the './database' folder there are two SQL scripts. 
You will need to run both of these scripts in your sql server. 
1.'./database/Generate_Database.sql' simply generates a schema called 'twitter'
2.'./database/insert.sql' creates fake uses and interactions between those use such as tweeting, liking, reposting and following.

2.Once these files are created you just need to give express.js your login info so it can access the server.
This can be done by modifying './api/connector.js' lines 4 and 5 

# Starting the project
1.open a command prompt (as admin to be safe)
2.cd into the project directory (where this file resides on your computer)
3.Open another command prompt with the command 
> start cmd.exe
4.in one terminal run the commands 
> cd api 
> 
> npm install
> 
> npm start
5.in the other terminal run the other commands
> cd website 
> npm install
> 
> npm start
6.doing this and waiting about 2-3 minuets (hyperbole for precaution) will then start the website in your default browser. If this dose not happen the website can be reached at : http://localhost:3000


# Whats going on?
Going from the back to the front
### Database (Mysql)
We created a mySQl database under the schema 'twitter' this is where we host and store all of our data the then gets used on the front end
### API (express.js)
To communicate your front end with our back end database we need a way for them to communicate. This is where express.js comes into play. There are two main files I toyed with and that would be './api/routes/api.js' and './api/connector.js'. api.js holds all of the endpoints that our front end will be sending messages to. It then takes these messages and sends them './api/connector.js'. from there './api/connector.js' makes the correct queries to the database using SQL code and send the results of the database back to the './api/routes/api.js'. './api/routes/api.js' takes those responses and puts them into a json and send them back to the front end.

note: you can make get request in your browser directly to the API by going to eg. 'http://localhost7536/get/post/all'
### Website (React.js)
The Front end of our program was built in react.js. If you are unfamiliar with react.js, think of it as an object oriented way of building websites in almost complete javascript. All relevant files are contained in the './website/src/' folder. The program starts at index.js and builds out from there. If you are looking for the communication from the front end to the API, it can all be found in './website/DBclient.js'. This is where all gets and puts request are made to the API by passing in variables to this global objects methods. 

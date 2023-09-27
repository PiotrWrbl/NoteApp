# NoteApp

--DESCRIPTION--

Application uses Mongo database and was build using Express.js and Javascript with HTLM.  The app allows user to create account (with password encoded using bcrypt), log in and create notes assigned to the account. The notes can be deleted and edited. 

--HOW_TO_RUN--

To run app locally you have to:

- install node modules by: npm install
- run mongo database, and add appropriate url in the index.js file
- start the app by npm start

App is available at: localhost:3000

To run app using docker you have to:

-update the url to database in index.js to:

line 29: mongoose.connect('mongodb://mongodb:27017/')

-turn on docker deamon

-to run the app use: docker-compose up

-to shut down the app use: docker-compose down

App is available at: localhost:3000

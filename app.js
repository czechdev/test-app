const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use('/static', express.static('./static'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('Server is running on port 3000.');
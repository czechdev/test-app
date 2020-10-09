const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://test:test@todo.qur1k.mongodb.net/todo?retryWrites=true&w=majority');

//Create a schema - this is like a blueprint
const todoSchema = new mongoose.Schema({
    item: String
});

const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({extended: false});
//let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];

module.exports = (app)=>{
    app.get('/todo', (req,res)=>{
        //get data from mongodb and pass it to view
        Todo.find({}, (err, data)=>{
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, (req,res)=>{
        //get data from the view and add it to mongodb
        Todo(req.body).save((err, data)=>{
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', (req,res)=>{
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err,data)=>{
            if (err) throw err;
            res.json(data);
        });
    });
};
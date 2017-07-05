//require('./config/config.js');
const env = process.env.NODE_ENV || 'development';

if(env === 'development'){
    process.env.MONGO_DB = 'mongodb://localhost:27017/TodoApp';
}
const port = process.env.PORT || 3000;
const spdy = require('spdy');
const express = require('express');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');


var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/users');
const options = {
    key: fs.readFileSync(__dirname + '/http2-express/server.key'),
    cert:  fs.readFileSync(__dirname + '/http2-express/server.crt')
};

try{
    var app = express();

    app.use(bodyParser.json());
    /*Create new todos */
    app.post('/todo',(req,res)=>{
        var newTodo = new Todo({
            text: req.body.text
        });
        newTodo.save().then(
            (doc)=>{
                res.send(doc);
        },(err)=>{
                res.status(400).send(err);
        })
    });

    /*Create list of all todos*/
    app.get('/todo',(req,res)=>{
        Todo.find().then(
            (todos)=>{
                res.send({
                    todos
                });
            },(err)=>{
                res.status(400).send(err);
            })
    });

    /*Receive specific todos by id*/
    app.get('/todo/:id',(req,res)=>{
        let _id = req.param('id'); //Receive id
        try{
            _id = new ObjectID(_id);
        }catch (e){
            return res.status(400).send({message: "Invalid id for todo"});
        }

            console.log('New request to search by id ' + _id);
            Todo.findOne(_id).then(
                (todo)=>{
                    if(todo !== null){
                    res.send({
                        todo
                    });
                    }else{
                        return res.send({todo,message: "todo not found in system"});
                    }
                },(err)=>{
                    res.status(400).send(err);
                }).catch((err)=>{
                return res.status(400).send({message:"No todos found"});
            })

    });

    /*Delete specific todos by id*/
    app.delete('/todo/:id',(req,res)=>{
        let _id = req.param('id'); //Receive id
        try{
            _id = new ObjectID(_id);
        }catch (e){
            return res.status(400).send({message: "Invalid id for todo"});
        }

        console.log('New request to delete by id ' + _id);
        Todo.findOneAndRemove(_id).then(
            (todo)=>{
                if(todo !== null){
                    console.log(`todo with id ${_id} has been successfully deleted`);
                    res.send({
                        todo
                    });
                }else{
                    return res.send({todo,message: "todo not found in system"});
                }
            },(err)=>{
                res.status(400).send(err);
            }).catch((err)=>{
            return res.status(400).send({message:"No todos found"});
        })

    });

    /*Patch specific todos by id*/
    app.patch('/todo/:id',(req,res)=>{
        let _id = req.param('id'); //Receive id
        try{
            _id = new ObjectID(_id);
        }catch (e){
            return res.status(400).send({message: "Invalid id for todo"});
        }
        let body = _.pick(req.body,['text','completed']); //select only specific keys

        console.log('New request to patch by id ' + _id);

        /*Check if completed is boolean*/
        if(_.isBoolean(body.completed) && body.completed){
            //completed set as true
            body.completedAt = new Date().getTime();
        }else{
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findOneAndUpdate(_id,{$set: body},{new: true}).then(
            (todo)=>{
                if(todo !== null){
                    console.log(`todo with id ${_id} has been successfully updated`);
                    res.send({
                        todo
                    });
                }else{
                    return res.send({todo,message: "todo not found in system"});
                }
            },(err)=>{
                res.status(400).send(err);
            }).catch((err)=>{
            return res.status(400).send({message:"No todos found"});
        })

    });


    /*Http2 server setup*/
    /*spdy
        .createServer(options, app)
        .listen(port, (error) => {
            if (error) {
                throw new Error(error);
            } else {
                console.log('Http2 server started');

            }
        });*/
    /*Regualr http setup*/

    app.listen(port, () => {
        console.log(`Http server started at ${port} with ${env} environment`);
    });

    module.exports = {app};
}catch(err){
    console.log('Error in app: ' + err)
    return process.exit(1)
}


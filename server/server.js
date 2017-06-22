const port = 3000;
const spdy = require('spdy');
const express = require('express');
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/users');

const options = {
    key: fs.readFileSync(__dirname + '/http2-express/server.key'),
    cert:  fs.readFileSync(__dirname + '/http2-express/server.crt')
}

try{
    const app = express();

    app.use(bodyParser.json());
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

    /*Http2 server setup*/
    spdy
        .createServer(options, app)
        .listen(port, (error) => {
            if (error) {
                throw new Error(error);
            } else {
                console.log('Http2 server started')
            }
        });
}catch(err){
    console.log('Error in app: ' + err)
    return process.exit(1)
}

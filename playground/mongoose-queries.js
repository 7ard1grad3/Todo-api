/**
 * Created by Ilya on 6/25/2017.
 */
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const _id = '594bef45c10468f550c92987';

Todo.find({
    _id
}).then((todos)=>{
    if(!todos){
        console.log('ID not found');
    }
    console.log(todos);
});

Todo.findOne({text:'Test todo text'}).then((Todos)=>{
    console.log('Todo:',Todos);
});

Todo.findById(_id).then((Todos)=>{
    if(!Todos){
        console.log('ID not found');
    }
    console.log('Todo by id:',Todos);
});
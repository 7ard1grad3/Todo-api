//const MongoClient = require('mongodb').MongoClient;
var testObj = {
    name: 'Iluha',
    age: 26
};

var {name} = testObj; //in ES6 {} allows to export variable from object
const {MongoClient, ObjectID} = require('mongodb');

/*Example of ObjectID*/
var id = new ObjectID();
console.log(id.getTimestamp());
/*Example of ObjectID*/


try{
    MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
        if(err){
            throw new Error(err);
        }
        console.log('Connected to Mongo DB');
        /*App setups*/

        /*Examples of how to add document to collection*/
/*        db.collection('Todos').insertOne({
            text: 'somthing to do',
            completed: false
        },(err,result) => {
            if(err){
                throw new Error(err);
            }
            console.log(JSON.stringify(result.ops,undefined,2));
        });*/

/*        db.collection('Users').insertOne({
            name: 'Ilya Sheidin',
            age: 26,
            location: 'Airpoty city'
        },(err,result) => {
            if(err){
                throw new Error(err);
            }
            console.log(result.ops[0]._id.getTimestamp());
        });*/
        /*Examples of how to add document to collection*/



        db.close();
    });
}catch (err){
    console.log('MongoDB error: '+err);
}
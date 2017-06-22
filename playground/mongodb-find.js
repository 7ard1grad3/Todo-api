
const {MongoClient,ObjectID} = require('mongodb');

try{
    MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
        if(err){
            throw new Error(err);
        }
        console.log('Connected to Mongo DB');
        /*App setups*/

        /*Examples of how to receive document from collection*/


        /*
        //Search by id
        db.collection('Todos').find({
            _id: new ObjectID("594a85444fc45df5000b08fd")
        }).toArray()
            .then((docs)=>{
                console.log('Todos');
                console.log(JSON.stringify(docs,undefined,2));
            },
            (err)=>{
                throw new Error(err);
        });
        */


        //Count number of Todos
            /* db.collection('Todos').find().count()
            .then((counts)=>{
                    console.log('We have '+counts+' Todos');
                },
                (err)=>{
                    throw new Error(err);
                });*/

            db.collection('Users').find({name:"Ilya Sheidin"}).toArray().then((docs)=>{
                console.log(docs);
            },(err)=>{
                throw new Error(err);
            });


        /*Examples of how to receive document from collection*/
        // db.close();
    });
}catch (err){
    console.log('MongoDB error: '+err);
}
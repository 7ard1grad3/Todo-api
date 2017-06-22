const {MongoClient, ObjectID} = require('mongodb');

try{
    MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
        if(err){
            throw new Error(err);
        }
        console.log('Connected to Mongo DB');
        //findOneAndUpdate
        db.collection('Todos').findOneAndUpdate({
            _id: new ObjectID("594a8fb2eb033670de250c59")
        },{
            //MongoDB update Operators
            $set: {
                completed: true
            }
        },{
            /*
                Options: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
             returnOriginal	boolean	true	optional
             When false, returns the updated document rather than the original. The default is true.
            */
            returnOriginal: false
        }).then((result)=>{
            console.log(result);
        },(err)=>{
            throw new Error(err);
        });


        db.collection('Users').findOneAndUpdate({
            _id: new ObjectID("594a8bcecca7e01e691d580d")
        },{
            //MongoDB update Operators
            $set: {
                name: 'Iluha Sheidin'
            },
            $inc: {
                age:+2
            }
        },{
            returnOriginal: false
        }).then((result)=>{
            console.log(result);
        },(err)=>{
            throw new Error(err);
        })

        //db.close();
    });
}catch (err){
    console.log('MongoDB error: '+err);
}
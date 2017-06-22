const {MongoClient, ObjectID} = require('mongodb');

try{
    MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
        if(err){
            throw new Error(err);
        }
        console.log('Connected to Mongo DB');

        // deleteMany
        /*
        db.collection('Todos').deleteMany({text: 'Eat lanch'}).then(
            (resp)=>{
                console.log(resp);
            },(err)=>{
                throw new Error(err);
            });
            */

        // deleteOne

        /*
        db.collection('Todos').deleteOne({text: 'Eat lanch'}).then(
            (resp)=>{
                var {result} = resp
                console.log(result);
            },(err)=>{
                throw new Error(err);
            });*/
        //FindOneAndDelete

        /*
            db.collection('Todos').findOneAndDelete({completed: false}).then(
            (resp)=>{
            var {value} = resp;
                console.log(value);
            },(err)=>{
                throw new Error(err);
            });
            */

        db.collection('Users').findOneAndDelete({name: 'Ilya Sheidin'}).then(
            (resp)=>{
                var {value} = resp;
                console.log(value.name + ' that was created on ' + value._id.getTimestamp() + ' has been deleted');
            },(err)=>{
                throw new Error(err);
            });

        //db.close();
    });
}catch (err){
    console.log('MongoDB error: '+err);
}
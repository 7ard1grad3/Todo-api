/**
 * Created by Ilya on 6/25/2017.
 */
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
/*Models*/
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/todo');

/*Remove all data in model*/
Todo.remove({}).then((result)=> {
    console.log(`Total of ${result.result.n} removed from Todo`);
});

/*Remove all data in model*/
Todo.findOneAndRemove({_id: '594bb2d579530aa84c71dc54'}).then((todo)=> {
    console.log(`Total of ${todo} removed from Todo`);
});


/*Remove all data in model*/
Todo.findByIdAndRemove('594bb2d579530aa84c71dc54').then((todo)=> {
    console.log(todo);
});
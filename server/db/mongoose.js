const mongoose = require('mongoose');
const uri = process.env.MONGO_DB;

mongoose.Promise = global.Promise;
const options = {
    db: { native_parser: true },
    user: 'sheidin',
    pass: 'testpassword'
};


try {
    mongoose.createConnection(uri);
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.once('open', function callback () {
        console.log("DB connected successfully");
});
} catch (err) {
    console.log(`Failed to connect to DB. Error: {err}`);
}

module.exports = {mongoose};
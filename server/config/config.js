const env = process.env.NODE_ENV || 'development';

if(env === 'development'){
    process.env.MONGO_DB = 'mongodb://localhost:27017/TodoApp';
}

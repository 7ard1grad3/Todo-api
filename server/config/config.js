

if(env === 'development'){
    process.env.MONGO_DB = 'mongodb://localhost:27017/TodoApp';
}

const port = process.env.PORT || 3000;
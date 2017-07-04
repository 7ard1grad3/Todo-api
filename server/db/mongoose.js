var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sheidin:testpassword@ds149132.mlab.com:49132/sheidin');

module.exports = {mongoose};
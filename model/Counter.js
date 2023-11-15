const mongoose = require('mongoose') 
const Schema = mongoose.Schema 

const CounterSchema = Schema({
    _id: String,
    seq: { type: Number, default: 0 }
});
const counter = mongoose.model('counter', CounterSchema);

module.exports = counter

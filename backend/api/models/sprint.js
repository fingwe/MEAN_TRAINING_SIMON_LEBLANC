const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SprintSchema = new Schema({
    
    name        : { type : String, required: true, trim: true},
    duration    : { type : Number },
    status      : { type : Boolean }
});

module.exports = mongoose.model('Sprint', SprintSchema, 'sprints');
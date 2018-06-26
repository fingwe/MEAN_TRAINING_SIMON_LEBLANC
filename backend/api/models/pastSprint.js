const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PastSprintSchema = new Schema({
    
    name        : { type : String, required: true, trim: true},
    duration    : { type : Number, required: true },
    status      : { type : String, required: true, trim: true },
    progress    : { type : Number, required: true},
    description : { type : String, required: true, trim: true},
    notify      : { type : Boolean, required: true},
    user        : { type : Number, required: true},
    createdAt   : { type : Date, required: true},
    startedAt   : { type : Date, required: true},
    finishedAt   : { type : Date, required: true},

});

module.exports = mongoose.model('PastSprint', PastSprintSchema, 'pastSprints');
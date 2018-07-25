const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PastSprintSchema = new Schema({
    
    name        : { type : String, required: true, trim: true},
    duration    : { type : Number },
    status      : { type : String },
    progress    : { type : Number },
    description : { type : String },
    notify      : { type : Boolean },
    user        : { type : String },
    createdAt   : { type : Date },
    startedAt   : { type : Date },
    finishedAt   : { type : Date },
});

module.exports = mongoose.model('PastSprint', PastSprintSchema, 'pastSprints');
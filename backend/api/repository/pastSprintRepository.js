const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    PastSprint = require('../models/pastSprint');


function sprintRepository() {

    const url = 'mongodb://localhost:27017/sprintApp';
    
    function getTimers(callback) {
        initiatetDatabase();
        PastSprint.find({}, (err, sprints) => {
            if (err) {
                console.log(`SprintRepository.getTimers error: ${err}`);
                return callback(err);
            }
            callback(null, {
                sprints: sprints,
            });
        });
    }

    function setTimer(body, callback) {
        initiatetDatabase();
        let pasSprint = new PastSprint();
        
        pasSprint.name = body.name;
        pasSprint.duration = body.duration;
        pasSprint.status = body.status;
        pasSprint.progress = body.progress;
        pasSprint.description = body.description;
        pasSprint.notify = body.notify;
        pasSprint.user = body.user;
        pasSprint.createdAt = body.createdAt;
        pasSprint.startedAt = body.startedAt;
        pasSprint.finishedAt = body.finishedAt;

        pasSprint.save((err, sprint) => {
            if (err) {
                console.log(`pastSprintRepository.setTimer error: ${err}`);
            }

            console.log(sprint);
            
            callback(null, sprint);
        });
    }

    function getTimer(body, callback) {

    }

    // procedure to start mongoose database connection
    function initiatetDatabase() {
        mongoose.connect(url);

        mongoose.Promise = global.Promise;

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error'));

    }
    

    return {getTimers,
            setTimer,
            getTimer};
}

module.exports = sprintRepository;

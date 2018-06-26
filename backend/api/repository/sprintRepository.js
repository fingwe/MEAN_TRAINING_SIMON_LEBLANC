const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Sprint = require('../models/sprint');


function sprintRepository() {

    const url = 'mongodb://localhost:27017/sprintApp';
    
    function getTimers(callback) {

        initiatetDatabase();
        Sprint.find({}, (err, sprints) => {
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
        let sprint = new Sprint();
        
        sprint.name = body.name;
        sprint.duration = body.duration;
        sprint.status = body.status;

        sprint.save((err, sprint) => {
            if (err) {
                console.log(`sprintRepository.setTimer error: ${err}`);
            }
            
            callback(null, sprint);
        });
    }

    function getTimer(_id) {

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

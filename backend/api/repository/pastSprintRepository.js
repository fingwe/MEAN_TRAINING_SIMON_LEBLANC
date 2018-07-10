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
            
            callback(null, sprint);
        });
    }

    function getTimer(params, callback) {
        initiatetDatabase();
        PastSprint.findById(params._id, (err, sprint) => {
            if (err) {
                console.log(`pastSprintRepository.getTimer error: ${err}`);
            }

            callback(null, sprint);
        });

    }

    function updateTimer(request, callback) {
        initiatetDatabase();
        PastSprint.findById(request.params._id,(err,pastSprint) => {
            if (err) {
                console.log(err.stack);
            }

            const body = request.body;

            pastSprint.name = body.name || pastSprint.name;
            pastSprint.duration = body.duration || pastSprint.duration;
            pastSprint.status = body.status || pastSprint.status;
            pastSprint.progress = body.progress || pastSprint.progress;
            pastSprint.description = body.description || pastSprint.description;
            pastSprint.notify = body.notify || pastSprint.notify;
            pastSprint.user = body.user || pastSprint.user;
            pastSprint.createdAt = body.createdAt || pastSprint.createdAt;
            pastSprint.startedAt = body.startedAt || pastSprint.startedAt;
            pastSprint.finishedAt = body.finishedAt || pastSprint.finishedAt;

            pastSprint.save((err, sprint) => {
                if (err) {
                    console.log(err.stack);
                }

                callback(null, sprint);
            });
            
        });
    }

    function deleteTimer(_id, callback) {
        initiatetDatabase();

        PastSprint.findByIdAndRemove(_id,(err,data) => {
            if (err) {
                console.log(`pastSprintRepository.deleteTimer error: ${err}`);
            }

            callback(null, data);
        });
    }

    function deleteTimers(callback) {
        initiatetDatabase();

        PastSprint.remove({},(err, data) => {
            if (err) {
                console.log(`pastSprintRepository.deleteTimers error: ${err}`);
            }

            callback(null, null);
        }).exec();
    }

    function searchTimers(sterm, callback) {
        initiatetDatabase();

        let query = {};

        if (sterm !== null) {

            let date = Date.parse(sterm);

            let formattedDate = new Date(date);

            console.log(formattedDate);

            if (!isNaN(date)) {
                query = {$or:[
                    {startedAt:{$gte: formattedDate}},
                    {createdAt:{$gte: formattedDate}},
                    {finishedAt:{$gte: formattedDate}}
                ]}
            } else {
                query = {$or:[
                    {name:{$regex: sterm, $options: 'i'}},
                    {status:{$regex: sterm, $options: 'i'}},
                    {description:{$regex: sterm, $options: 'i'}}
                ]}
            }

            
        }

        PastSprint.find(query, (err, data ) => {
            if (err) {
                console.log(`pastSprintRepository.searchTimers error: ${err}`);
            }
            
            callback(null,data);
        });
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
            getTimer,
            updateTimer,
            deleteTimer,
            deleteTimers,
            searchTimers};
}

module.exports = sprintRepository;

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    PastSprint = require('../models/pastSprint');


function sprintRepository() {

    const url = 'mongodb://localhost:27017/sprintApp';

    function getTimersQuantity(callback) {
        initiatetDatabase();

        PastSprint.count({},(err,data) => {
            if ( err ) {
                callback(err,null);
            }
            callback(null,data);
        });
    }

    function getPagedSortedTimers(query,callback) {
        initiatetDatabase();
        if (validateQuery(query)) {
            let order;
            if ( query.order === 'ascending') {
                order = 1;
            } else if ( query.order === 'descending' ) {
                order = -1;
            }
            PastSprint.find({}).skip(parseInt(query.skip)).limit(parseInt(query.top)).sort([[query.field,order]]).exec((err, data) => {
                if (err) {
                    console.log(err);
                }
                callback(null,data);
            });
        } else {
            return callback('error',null);
        }
        
    }

    /**
     * fonction that validate the query string
     * @param {the expressjs req.query object} query 
     */
    function validateQuery(query) {
        if ( query !== null ) {
            if ( query.field !== null && query.order !== null && query.skip !== null && query.top != null ) {
                if ( (query.field === 'name' || 
                 query.field === 'status' || 
                 query.field === 'description' || 
                 query.field === 'startedAt' || 
                 query.field === 'createdAt' || 
                 query.field === 'finishedAt') && 
                 ( query.order === 'ascending' || 
                   query.order === 'descending') && 
                 ( !isNaN(parseInt(query.skip)) ) && 
                 ( !isNaN(parseInt(query.top)))) {
                     return true
                 } else {
                     return false;
                 }
            } else {
                return false;
            }
        } else {
            return false;
        }      
    }
    
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

    // function to return the timers sorted by field and ascending or descending
    function sortTimers(query, callback) {
        initiatetDatabase();

        const field = query.field;

        let order = 0;

        if ( query !== null ) {
            if ( (query.field === 'name' || 
                  query.field === 'status' || 
                  query.field === 'description' || 
                  query.field === 'startedAt' || 
                  query.field === 'createdAt' || 
                  query.field === 'finishedAt') && 
                  query.order !== null ) {

                if ( query.order === 'ascending' ) {
                    order = 1;
                } else if ( query.order === 'descending') {
                    order = -1;
                } else {
                    return callback('Invalid Parameter',null)
                }
                
                PastSprint.find({}).sort([[field,order]]).exec((err, data) => {
                    if ( err ) {
                        console.log(`pastSprintRepository.sortTimers error: ${err}`);
                    }
        
                    callback(null,data);
                });
            } else {
               return callback('Invalid parameters',null)
            }
        } else {
           return callback('Required parameters are missing',null);
        }
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
            sortTimers,
            getPagedSortedTimers,
            getTimersQuantity
        };
}

module.exports = sprintRepository;

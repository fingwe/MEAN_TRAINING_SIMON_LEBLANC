const pastSprintRepository = require('../repository/pastSprintRepository');

function pastSprintController() {

    const { getTimers, setTimer, getTimer, updateTimer , deleteTimer, deleteTimers, sortTimers, getPagedSortedTimers, getTimersQuantity } = pastSprintRepository();

    function getPastSprints(req, res) {
        
        console.log('getSprints');
        getTimers((err, data) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(`sprintController.getSprints ok ${new Date()}`);
                res.json(data.sprints);
            }
        });
    }

    function setPastSprint(req, res) {
        
        console.log('setPastSprint');
        setTimer(req.body,(err, data) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(`pastSprintController.setSprint ok ${new Date()}`);
                res.redirect('/api/pastsprints');
            }
        });
    }

    function getPastSprint(req,res) {
        console.log('getPastSprint');
        getTimer(req.params,(err, sprint) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log('pastSprintController.getPastSprint ok');
                res.json(sprint);
            }
        });
    }

    function putPastSprint(req, res) {
        console.log('putPastSprint');
        updateTimer(req,(err,sprint) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log('pastSprintController.putPastSprint ok');
                res.json(sprint);
            }
        });
    }

    function deletePastSprint(req, res) {
        console.log('deletePastSprint');
        deleteTimer(req.params._id, (err, data) => {
            res.json(data);
        });
    }

    function deletePastSprints(req, res) {
        console.log('deletePastSprints');
        deleteTimers((err, data) => {
            res.send("Delete Successful");
        });
    }

    function getSortedPastSprints(req, res) {
        console.log('getSortedPastSprints');
        sortTimers(req.query,(err, data) => {
            res.json(data);
        })
    }

    function getPagedSortedPastSprints(req, res) {
        console.log('getPagedSortedPastSprints');
        getPagedSortedTimers(req.query,(err, data) => {
            res.json(data);
        });
    }

    function getPastSprintsNumber(req, res ) {
        console.log('getPastSprintsNumber');
        getTimersQuantity((err, data) => {
            console.log(data);
            res.json(data);
        });
    }

    return {
        getPastSprints,
        setPastSprint,
        getPastSprint,
        putPastSprint,
        deletePastSprint,
        deletePastSprints,
        getSortedPastSprints,
        getPagedSortedPastSprints,
        getPastSprintsNumber
    };

}

module.exports = pastSprintController;

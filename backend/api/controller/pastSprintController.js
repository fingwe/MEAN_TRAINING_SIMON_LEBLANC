const pastSprintRepository = require('../repository/pastSprintRepository');

function pastSprintController() {

    const { getTimers, setTimer, getTimer, updateTimer , deleteTimer, deleteTimers } = pastSprintRepository();

    function getPastSprints(req, res) {
        
        console.log('getSprints');
        getTimers((err, data) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log('sprintController.getSprints ok');
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
                console.log('psatSprintController.setSprint ok');
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

    return {
        getPastSprints,
        setPastSprint,
        getPastSprint,
        putPastSprint,
        deletePastSprint,
        deletePastSprints
    };

}

module.exports = pastSprintController;

const sprintRepository = require('../repository/sprintRepository');

function sprintController() {

    function getSprints(req, res) {

        const { getTimers } = sprintRepository();
        console.log('controller gets info from repo')
        const sprints = getTimers();
        res.send(sprints);
    }

    function setSprints(req, res) {
        const { setTimer } = sprintRepository();
        console.log('controller saves a timer with the repo');
        const timer = {
            name: req.body.name,
            duration: req.body.durations,
            status: req.body.status
        };
        const sprint = setTimer(timer);
    }

    return {
        getSprints
    };

}

module.exports = sprintController;
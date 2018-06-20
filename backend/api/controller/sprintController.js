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
            name: req.params.name,
            duration: req.params.durations,
            status: req.params.status
        };
        const sprint = setTimer(timer);
    }

    return {
        getSprints
    };

}

module.exports = sprintController;
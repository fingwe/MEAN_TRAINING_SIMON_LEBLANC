const pastSprintRepository = require('../repository/pastSprintRepository');

function pastSprintController() {

    const { getTimers, setTimer } = pastSprintRepository();

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
        
        console.log('setSprints');
        setTimer(req.body,(err, data) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log('psatSprintController.setSprint ok');
                res.redirect('/api/pastsprints');
            }
        });
    }

    return {
        getPastSprints,
        setPastSprint
    };

}

module.exports = pastSprintController;

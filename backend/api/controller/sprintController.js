const sprintRepository = require('../repository/sprintRepository');

function sprintController() {

    const { getTimers, setTimer } = sprintRepository();

    function getSprints(req, res) {
        
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

    function setSprint(req, res) {
        
        console.log('setSprints');
        setTimer(req.body,(err, data) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log('sprintController.setSprint ok');
                res.redirect('/api/sprints');
            }
        });
    }
    
    return {
        getSprints,
        setSprint
    };

}

module.exports = sprintController;
const express = require('express');
const sprintContoller = require('../controller/sprintController');
const pastSprintContoller = require('../controller/pastSprintController');

const apiRouter = express.Router();

const { getSprints, setSprint } = sprintContoller();
const { getPastSprints, setPastSprint, getPastSprint, putPastSprint, deletePastSprint } = pastSprintContoller();

apiRouter.get('/sprints', getSprints);

apiRouter.post('/sprints', setSprint);

apiRouter.get('/pastsprints', getPastSprints);

apiRouter.post('/pastsprints', setPastSprint);

apiRouter.get('/pastsprints/:_id', getPastSprint);

apiRouter.put('/pastsprints/:_id', putPastSprint);

apiRouter.delete('/pastsprints/:_id', deletePastSprint);

module.exports = apiRouter;
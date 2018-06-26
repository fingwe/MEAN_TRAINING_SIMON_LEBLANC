const express = require('express');
const sprintContoller = require('../controller/sprintController');
const pastSprintContoller = require('../controller/pastSprintController');

const apiRouter = express.Router();

const { getSprints, setSprint } = sprintContoller();
const { getPastSprints, setPastSprint } = pastSprintContoller();

apiRouter.get('/sprints', getSprints);

apiRouter.post('/sprints', setSprint);

apiRouter.get('/pastsprints', getPastSprints);

apiRouter.post('/pastsprints', setPastSprint);

module.exports = apiRouter;
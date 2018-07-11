const express = require('express');
const pastSprintContoller = require('../controller/pastSprintController');

const apiRouter = express.Router();

const { getPastSprints, setPastSprint, getPastSprint, putPastSprint, deletePastSprint, deletePastSprints, searchPastSprints } = pastSprintContoller();

apiRouter.get('/pastsprints', getPastSprints);

apiRouter.post('/pastsprints', setPastSprint);

apiRouter.delete('/pastsprints', deletePastSprints);

apiRouter.get('/pastsprints/:_id', getPastSprint);

apiRouter.put('/pastsprints/:_id', putPastSprint);

apiRouter.delete('/pastsprints/:_id', deletePastSprint);

module.exports = apiRouter;
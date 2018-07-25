const express = require('express');
const pastSprintContoller = require('../controller/pastSprintController');

const apiRouter = express.Router();

const { getPastSprints, setPastSprint, getPastSprint, putPastSprint, deletePastSprint, deletePastSprints, getSortedPastSprints, getPagedSortedPastSprints, getPastSprintsNumber } = pastSprintContoller();

apiRouter.get('/pastsprints/:user', getPastSprints);

apiRouter.get('/pastsprints/paged/:user', getPagedSortedPastSprints);

apiRouter.get('/pastsprints/sort/:user', getSortedPastSprints);

apiRouter.post('/pastsprints', setPastSprint);

apiRouter.delete('/pastsprints/:user', deletePastSprints);

//apiRouter.get('/pastsprints/:_id', getPastSprint);

apiRouter.put('/pastsprints/:_id', putPastSprint);

apiRouter.delete('/pastsprints/:_id', deletePastSprint);

apiRouter.get('/pastsprints/count/:user', getPastSprintsNumber);

module.exports = apiRouter;
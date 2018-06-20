const express = require('express');
const sprintContoller = require('../controller/sprintController');

const apiRouter = express.Router();

const { getSprints } = sprintContoller();

apiRouter.get('/sprints', getSprints);

module.exports = apiRouter;
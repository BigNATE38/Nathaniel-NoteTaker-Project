const router = require('express').Router();

const theNoteRouter = require('../API_Route/notesRoute');

router.use(theNoteRouter);

module.exports = router;

const fs = require('fs');
const {locateID, makeNote, confirmNote} = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/api/notes/:id', (req, res) => {
    const result = locateID(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!confirmNote(req.body)) {
        res.status(400).send('This is not the proper note format.');
    } else {
        const note = makeNote(req.body, notes);
        res.json(notes);
    }
});

router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    notes.forEach((array, index) => {
        if (id == array.id) {
            notes.splice(index, 1);
            const noteNew = notes.slice();
            const jsonNotes = JSON.stringify({ notes: noteNew }, null, 2)
            fs.writeFile("./db/db.json", jsonNotes, function(err) {
                if (err) {
                    return console.log(err)
                }
            });
        }
    });
    res.json(true);
});

module.exports = router;

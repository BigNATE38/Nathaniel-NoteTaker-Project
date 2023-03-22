const fs = require("fs");
const path = require("path");

function locateID (id, arrayNote) {
    const results = arrayNote.filter(note => note.id === id) [0];
    return results;
};

function makeNote(body, arrayNote) {
    const note = body;
    arrayNote.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: arrayNote }, null, 2)
    );
    return note;
};

function confirmNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

module.exports = {
    locateID,
    makeNote,
    confirmNote,
};
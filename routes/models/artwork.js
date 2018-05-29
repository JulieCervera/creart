const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const artworkSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    ville: String,
    path: String
});

module.exports = mongoose.model('Art', artworkSchema, 'artworks');

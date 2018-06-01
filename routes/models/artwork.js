const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const artworkSchema = new Schema({
    userId: String,
    name: String,
    description: String,
    // date: Date,
    ville: String,
    picture_path: String,
});

module.exports = mongoose.model('Art', artworkSchema, 'artworks');

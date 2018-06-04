const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const artworkSchema = new Schema({
    userId: String,
    name: String,
    author: String,
    tags: String,
    address: String,
    ville: String,
    picture_path: String,
});

module.exports = mongoose.model('Art', artworkSchema, 'artworks');

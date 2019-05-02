const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

GenreSchema.plugin(timestamp);
const Genre = mongoose.model('Genre', GenreSchema);
module.exports = Genre;
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

ArtistSchema.plugin(timestamp);
const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;
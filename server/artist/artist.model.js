const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    slug: "name",
    unique: true
  }
});

ArtistSchema.plugin(timestamp);
const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;
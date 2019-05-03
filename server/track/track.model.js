const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const artist = require('../artist/artist.model');
const genre = require('../genre/genre.model');

const TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    
  },
  artistId: {
    ref: 'Artist',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  featureArtistId: [{
    ref: 'Artist',
    type: mongoose.Schema.Types.ObjectId
  }],
  released: {
    type: String
  },
  genreId: [{
    ref: 'Genre',
    type: mongoose.Schema.Types.ObjectId
  }],
  album: {
    type: String,
    trim: true
  },
  mediaImage: {
    type: String,
    trim: true
  },
  mediaVideo: {
    type: String,
    trim: true
  },
  mediaITunes: {
    type: String,
    trim: true
  },
  mediaGooglePlay: {
    type: String,
    trim: true
  },
  mediaSpotify: {
    type: String,
    trim: true
  }
});

TrackSchema.plugin(timestamp);
const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;
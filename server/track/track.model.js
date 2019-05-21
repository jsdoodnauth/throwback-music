const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,    
  },
  artist: {
    ref: 'Artist',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  group: {
    ref: 'Artist',
    type: mongoose.Schema.Types.ObjectId,
  },
  featureArtist: [{
    ref: 'Artist',
    type: mongoose.Schema.Types.ObjectId
  }],
  released: {
    type: Date
  },
  genre: [{
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
  },
  tags: {
    type: [String]
  }
});

TrackSchema.plugin(timestamp);
const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;
const router = require('express').Router();
const Track = require('../../track/track.model');

/**
 * @route POST api/track/
 * @desc Create Track
 * @access TO BE Private
 * Ref: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
 */

router.post('/', (req, res) => {
  Track.findOne({ name: req.body.name }).then( name => {
    if (name) {
      return res.status(400).json({ name: "Track name already exists"});
    }
    const newTrack = new Track({
      name: req.body.name,
      artist: req.body.artist,
      released: req.body.released,
      genre: req.body.genre,
      featureArtist: req.body.featureArtist,
      album: req.body.album,
      mediaImage: req.body.mediaImage,
      mediaVideo: req.body.mediaVideo,
      mediaITunes: req.body.mediaITunes,
      mediaGooglePlay: req.body.mediaGooglePlay,
      mediaSpotify: req.body.mediaSpotify,
      tags: req.body.tags ? req.body.tags.replace(/\s/g,'').split(',') : req.body.tags
    });
    newTrack.save()
      .then(name => res.json(name))
      .catch(err => console.log(`err: ${err}`));
  });
});

/**
 * @route GET api/track/
 * @desc Get Track
 * @access Public
 */

router.get('/:id', (req, res) => {
  try {
    Track.findOne({ _id: req.params.id }).then( name => {
      if (name) {
        res.json(name);
      } else {
        res.status(404).json({ track: "Track not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @route GET api/track/detail/:id
 * @desc Get Track Details
 * @access Public
 */

router.get('/detail/:id', (req, res) => {
  try {
    Track.findOne({ _id: req.params.id })
      .populate('artist')
      .populate('featureArtist')
      .populate('genre').then( name => {
      if (name) {
        res.json(name);
      } else {
        res.status(404).json({ track: "Track not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});
/**
 * @route GET api/track/artist
 * @desc Get Tracks by Artist
 * @access Public
 * One-to-Many 
 * https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1
 * https://wanago.io/2018/12/31/mongodb-relationships-documents-typescript-express-tutorial-5/
 */

router.get('/artist/:id', (req, res) => {
  try {
    Track.find({ artist: req.params.id }).then( name => {
      if (name) {
        res.json(name);
      } else {
        res.status(404).json({ track: "Tracks not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @route GET api/track/featuredartist
 * @desc Get Tracks by Featured Artist
 * @access Public
 */

router.get('/featuredartist/:id', (req, res) => {
  try {
    Track.find({ featureArtist: req.params.id }).then( name => {
      if (name) {
        res.json(name);
      } else {
        res.status(404).json({ track: "Tracks not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});


/**
 * @route GET api/track/genre
 * @desc Get Tracks by Genre
 * @access Public
 */

router.get('/genre/:id', (req, res) => {
  try {
    Track.find({ genre: req.params.id }).then( name => {
      if (name) {
        res.json(name);
      } else {
        res.status(404).json({ track: "Tracks not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;

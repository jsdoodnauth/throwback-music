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

    console.log(req.body.featureArtistId);

    const newTrack = new Track({
      name: req.body.name,
      artistId: req.body.artistId,
      genreId: req.body.genreId,
      featureArtistId: req.body.featureArtistId
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
 * @route GET api/track/artist
 * @desc Get Tracks by Artist
 * @access Public
 * One-to-Many 
 * https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1
 * https://wanago.io/2018/12/31/mongodb-relationships-documents-typescript-express-tutorial-5/
 */

router.get('/artist/:id', (req, res) => {
  try {
    Track.find({ artistId: req.params.id }).then( name => {
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
 * @route GET api/track/featuredartist
 * @desc Get Tracks by Featured Artist
 * @access Public
 */

router.get('/featuredartist/:id', (req, res) => {
  try {
    Track.find({ featureArtistId: req.params.id }).then( name => {
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


module.exports = router;

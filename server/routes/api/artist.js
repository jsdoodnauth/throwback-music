const router = require('express').Router();
const Artist = require('../../artist/artist.model');

/**
 * @route POST api/artist/
 * @desc Create Artist
 * @access TO BE Private
 * Ref: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
 */

router.post('/', (req, res) => {
  Artist.findOne({ name: req.body.name }).then( name => {
    if (name) {
      return res.status(400).json({ name: "Artist name already exists"});
    }

    const newArtist = new Artist({
      name: req.body.name
    });
    newArtist.save()
      .then(name => res.json(name))
      .catch(err => console.log(`err: ${err}`));
  });
});

/**
 * @route GET api/artist/
 * @desc Get Artist
 * @access Public
 */


router.get('/', (req, res) => {
  try {
    Artist.find().then( names => {
      if (names) {
        res.json(names);
      } else {
        res.status(404).json({ names: "Artists not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/id/:id', (req, res) => {
  try {
    Artist.findOne({ _id: req.params.id }).then( name => {
      if (name) {
        res.json(name);
      } else {
        res.status(404).json({ name: "Artist not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:slug', (req, res) => {
  try {
    Artist.findOne({ slug: req.params.slug }).then( name => {
      if (name) {
        res.json(name);
      } else {
        res.status(404).json({ name: "Artist not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;

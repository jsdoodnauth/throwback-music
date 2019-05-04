const router = require('express').Router();
const Genre = require('../../genre/genre.model');

/**
 * @route POST api/genre/
 * @desc Create Genre
 * @access TO BE Private
 * Ref: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
 */

router.post('/', (req, res) => {
  Genre.findOne({ name: req.body.name }).then( name => {
    if (name) {
      return res.status(400).json({ name: "Genre name already exists"});
    }

    const newGenre = new Genre({
      name: req.body.name
    });
    newGenre.save()
      .then(name => res.json(name))
      .catch(err => console.log(`err: ${err}`));
  });
});

/**
 * @route GET api/genre/
 * @desc Get All Genre
 * @access Public
 */

router.get('/', (req, res) => {
  try {
    Genre.find().then( names => {
      if (names) {
        res.json(names);
      } else {
        res.status(404).json({ names: "Genre name not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @route GET api/genre/
 * @desc Get Genre
 * @access Public
 */

router.get('/:id', (req, res) => {
  try {
    Genre.findOne({ _id: req.params.id }).then( name => {
      if (name) {
        res.json(name);
      } else {
        res.status(404).json({ name: "Genre name not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

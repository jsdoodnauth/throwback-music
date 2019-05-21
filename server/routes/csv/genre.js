const router = require('express').Router();
const Genre = require('../../genre/genre.model');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/**
 * @route GET csv/genre/
 * @desc Get CSV Genre
 * @access Public
 */
router.get('/', (req, res) => {
  console.log('Create CSV Genres...');
  try {
    Genre.find().then( names => {
      if (names) {
        const csvWriter = createCsvWriter({
          path: 'server/data/genres.csv',
          header: [
            { id: '_id', title: '_id' },
            { id: 'name', title: 'name' },
            { id: 'slug', title: 'slug' }
          ]
        });
        csvWriter.writeRecords(names).then(() => {
          console.log('Genre CSV has been created');
          res.status(200).json({status: 'ok'});
        })
      } else {
        res.status(404).json({ status: "No Genres not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;

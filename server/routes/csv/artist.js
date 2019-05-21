const router = require('express').Router();
const Artist = require('../../artist/artist.model');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/**
 * @route GET csv/artist/
 * @desc Get CSV Artist
 * @access Public
 */
router.get('/', (req, res) => {
  console.log('Create CSV Artists...');
  try {
    Artist.find().then( names => {
      if (names) {
        const csvWriter = createCsvWriter({
          path: 'server/data/artists.csv',
          header: [
            { id: '_id', title: '_id' },
            { id: 'name', title: 'name' },
            { id: 'slug', title: 'slug' }
          ]
        });
        csvWriter.writeRecords(names).then(() => {
          console.log('Artist CSV has been created');
          res.status(200).json({status: 'ok'});
        })
      } else {
        res.status(404).json({ status: "No Artists not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;

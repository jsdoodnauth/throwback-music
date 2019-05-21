const router = require('express').Router();
const Track = require('../../track/track.model');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/**
 * @route GET csv/track/
 * @desc Get CSV Track
 * @access Public
 */
router.get('/', (req, res) => {
  console.log('Create CSV Tracks...');
  try {
    Track.find().then( names => {
      if (names) {
        const csvWriter = createCsvWriter({
          path: 'server/data/tracks.csv',
          header: [
            { id: '_id', title: '_id' },
            { id: 'name', title: 'name' }
          ]
        });
        csvWriter.writeRecords(names).then(() => {
          console.log('Track CSV has been created');
          res.status(200).json({status: 'ok'});
        })
      } else {
        res.status(404).json({ status: "No Tracks not found" });
      }
    })
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;

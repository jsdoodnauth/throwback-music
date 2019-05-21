const router = require('express').Router();
const Artist = require('../../artist/artist.model');
const csvParser = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/**
 * @route GET csv/artist/
 * @desc Get CSV Artist
 * @access Public
 * REF: https://code.tutsplus.com/articles/bulk-import-a-csv-file-into-mongodb-using-mongoose-with-nodejs--cms-29574
 */
router.get('/', (req, res) => {
  console.log('Exporting CSV Artists...');
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

/**
 * @route GET csv/artist/import
 * @desc Set CSV Artist
 * @access Public
 * REF: https://code.tutsplus.com/articles/bulk-import-a-csv-file-into-mongodb-using-mongoose-with-nodejs--cms-29574
 */
router.get('/import', (req, res) => {
  console.log('Importing CSV Artists...');
  try {
    fs.createReadStream('server/data/artists.csv')
      .pipe(csvParser())
      .on('data', (row) => {
        console.log(row);
      })
      .on('end', () => {
        console.log('CSV Artists successfully processed');
        res.status(200).json({status: 'created'});
      })
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;

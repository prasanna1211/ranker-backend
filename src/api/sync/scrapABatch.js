const bluebird = require('bluebird');
let cron = require('node-cron');

const map = require('lodash/map');
const random = require('lodash/random');

const googleResult = require('../../helpers/getGoogleResult.js');

const scrapABatch = (batch, currentBatchNumber) => {
  console.log('--------------------', batch);
  if (!batch.length) {
    return [];
  }
  for (var k = 0; k < batch.length; k++) {

    const { keyword, keywordId, isImportant, domain, domainId } = batch[k];
    console.log('keyword', keyword);
    // const keywordScrapStartTime = `${5 + (k * 10) + parseInt(random(0, 2))}`;
    // const cronString = `0 ${keywordScrapStartTime} ${currentBatchNumber} * * *`;
    const cronString = `30 ${(25+(k*5))%60} 10 * * *`;
    console.log(cronString);
    cron.schedule(cronString, () => {
      try {
        const results = googleResult
        .scrapeGoogleResult(keyword, 'https://www.google.co.in', 3)
        .then((scrap) => {
          if (scrap.success) {
            // IF successs write it to db.

            console.log('result ', scrap.result);
          } else if (scrap.error) {
            console.log('error', scrap.error);
            // Some internal error write to status db
          }
        });
      } catch (e) {
        // Some other error for this particular keyword.
        // still write on error db
      }


    })
  }
}

module.exports = {
  scrap: scrapABatch,
}

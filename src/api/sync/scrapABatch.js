const bluebird = require('bluebird');
let cron = require('node-cron');

const map = require('lodash/map');
const random = require('lodash/random');
const filter = require('lodash/filter');
const findIndex = require('lodash/findIndex');
const moment = require('moment');

const googleResult = require('../../helpers/getGoogleResult.js');

const rankWriteDbQuery = (rank, logDate, companyId, keywordId, searchEngineId) => `INSERT INTO ranks (rank, logDate, companyId, keywordId, searchEngineId) VALUES (${rank}, "${logDate}", ${companyId}, ${keywordId}, ${searchEngineId})`;

const scrapABatch = (db, taskList, batch, currentBatchNumber, urls) => {
  // console.log('batch started');
  if (!batch.length) {
    return [];
  }

  const currentDate = moment().startOf('day').format('YYYY-MM-DD');

  for (var k = 0; k < batch.length; k++) {

    const { keyword, keywordId, isImportant, domain, domainId } = batch[k];
    const keywordScrapStartTime = `${2 + (k * 10) + parseInt(random(0, 2))}`;
    const cronString = `0 ${keywordScrapStartTime} ${14 + currentBatchNumber - 1} * * *`;
    console.log('scheduled for this hour ', cronString, keyword, domain);
    // const cronString = `10 ${(0+(k*8))%60} 16 * * *`;
    taskList[currentBatchNumber][k] = cron.schedule(cronString, () => {
      try {
        const results = googleResult
        .scrapeGoogleResult(keyword, 'https://www.google.co.in', 3)
        .then((scrap) => {
          if (scrap.success) {
            // IF successs write it to db.
            const currentUrls = filter(urls, url => url.domain === domain);
            const resultWithRank = map(currentUrls, (urlData) => {
              console.log('result: ', scrap.result, urlData.url, findIndex(scrap.result, urlData.url))
              return {
                ...urlData,
                rank: findIndex(scrap.result, eachUrl => eachUrl === urlData.url)
              }
            });
            console.log(resultWithRank);
            map(resultWithRank, (result) => {
              db.query(rankWriteDbQuery(result.rank, currentDate, result.companyId, keywordId, 1), (error, result) => {
                if (error) {
                  console.log(error);
                }
                console.log('1 record successfully written')
              });
            });
          } else if (scrap.error) {
            console.log('error', scrap.error);
            // Some internal error write to status db
          }
        console.log('finished');
        });
      } catch (e) {
        // Some other error for this particular keyword.
        // still write on error db
      }

    });
  }
}

module.exports = {
  scrap: scrapABatch,
}

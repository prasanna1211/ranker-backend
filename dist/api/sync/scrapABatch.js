'use strict';

var bluebird = require('bluebird');
var cron = require('node-cron');

var map = require('lodash/map');
var random = require('lodash/random');
var filter = require('lodash/filter');
var findIndex = require('lodash/findIndex');
var moment = require('moment');

var googleResult = require('../../helpers/getGoogleResult.js');

var rankWriteDbQuery = function rankWriteDbQuery(rank, logDate, companyId, keywordId, searchEngineId) {
  return 'INSERT INTO ranks (rank, logDate, companyId, keywordId, searchEngineId) VALUES (' + rank + ', "' + logDate + '", ' + companyId + ', ' + keywordId + ', ' + searchEngineId + ')';
};

var scrapABatch = function scrapABatch(db, taskList, batch, currentBatchNumber, urls) {
  console.log('batch', batch);
  if (!batch.length) {
    return [];
  }

  var currentDate = moment().startOf('day').format('YYYY-MM-DD');

  for (var k = 0; k < batch.length; k++) {
    var _batch$k = batch[k],
        keyword = _batch$k.keyword,
        keywordId = _batch$k.keywordId,
        isImportant = _batch$k.isImportant,
        domain = _batch$k.domain,
        domainId = _batch$k.domainId;

    var keywordScrapStartTime = '' + (13 + k * 10 + parseInt(random(0, 2)));
    var cronString = '0 ' + keywordScrapStartTime + ' ' + currentBatchNumber + ' * * *';
    console.log('scheduled for this hour ', cronString, keyword, domain);
    // const cronString = `10 ${(0+(k*6))%60} 16 * * *`;
    // taskList[currentBatchNumber][k] = cron.schedule(cronString, () => {
    //   try {
    //     const results = googleResult
    //     .scrapeGoogleResult(keyword, 'https://www.google.co.in', 3)
    //     .then((scrap) => {
    //       if (scrap.success) {
    //         // IF successs write it to db.
    //         const currentUrls = filter(urls, url => url.domain === domain);
    //         const resultWithRank = map(currentUrls, (urlData) => {
    //           console.log('result: ', scrap.result, urlData.url, findIndex(scrap.result, urlData.url))
    //           return {
    //             ...urlData,
    //             rank: findIndex(scrap.result, eachUrl => eachUrl === urlData.url)
    //           }
    //         });
    //         console.log(resultWithRank);
    //         map(resultWithRank, (result) => {
    //           db.query(rankWriteDbQuery(rank, currentDate, result.companyId, keywordId, 1), (error, result) => {
    //             if (error) {
    //               console.log(error);
    //             }
    //             console.log('1 record successfully written')
    //           });
    //         });
    //       } else if (scrap.error) {
    //         console.log('error', scrap.error);
    //         // Some internal error write to status db
    //       }
    //     console.log('finished');
    //     });
    //   } catch (e) {
    //     // Some other error for this particular keyword.
    //     // still write on error db
    //   }
    //
    // });
  }
};

module.exports = {
  scrap: scrapABatch
};
//# sourceMappingURL=scrapABatch.js.map
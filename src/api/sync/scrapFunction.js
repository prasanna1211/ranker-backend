// const Promise = require('bluebird');

const forEach = require('lodash/forEach');

const moment = require('moment');
const map = require('lodash/map');
const lodash = require('lodash');
const random = require('lodash/random');
const findIndex = require('lodash/findIndex');
const merge = require('lodash/merge');
const sortBy = require('lodash/sortBy');
const reduce = require('lodash/reduce');
const filter = require('lodash/filter');

let cron = require('node-cron');
const scrap = require('../../helpers/index.js');
const appConstants = require('../../helpers/appConstants.js');
const checkIfCountIsLimited = require('../../helpers/checkIfCountIsLimited.js');

console.log(checkIfCountIsLimited);

const scrapFunction = (db, searchEngines, keywords, urls) => {
  let batchedKeywords;
  let status = true;
  while (status) {
    batchedKeywords = lodash.chain(keywords)
      .map((keyword) => ({
        ...keyword,
        batchId: Math.floor(random(1, 24)),
      }))
      .sortBy('batchId')
    const batches = batchedKeywords
      .map(x => x.batchId)
      .value();
    status &= !checkIfCountIsLimited.check(batches, 6);
  }
  const batchedKeywordGroup = batchedKeywords.value();
  console.log('starting');
  cron.schedule('1 55 * * * *', () => {
    console.log('came in ');
  });
  for(var hour = 1; hour <= 24; hour++) {
    const currentBatch = filter(batchedKeywordGroup, group => group.batchId === hour);
    // console.log('batch ', hour, currentBatch, `${hour} * * *`);
  }
}

module.exports = {
  scrapFunction,
}

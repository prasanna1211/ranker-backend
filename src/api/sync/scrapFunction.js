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
const isEqual = require('lodash/isEqual');
const shuffle = require('lodash/shuffle');

let cron = require('node-cron');
const appConstants = require('../../helpers/appConstants.js');
const checkIfCountIsLimited = require('../../helpers/checkIfCountIsLimited.js');
const scrapABatch = require('./scrapABatch.js');

const getRankData = (eachBatch) => {
  console.log(eachBatch);
}

const scrapFunction = (db, searchEngines, keywords, urls) => {
  let batchedKeywords = lodash.chain(keywords)
    .shuffle()
    .chunk(5)
    .value();
  const taskList = new Array(20);
  let currentHour = 1;
  for(var hour = 1; hour <= 20; hour++) {

    console.log(`1 22 ${hour-1} * * *`);
    taskList[hour-1] = cron.schedule(`1 22 ${hour-1} * * *`, () => {
      const currentBatch = batchedKeywords[currentHour-1];
      console.log('current batch ', currentBatch, currentHour);
      scrapABatch.scrap(db, currentBatch, currentHour);
      currentHour += 1;
    });
  }
}

module.exports = {
  scrapFunction,
}

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
const cron = require('node-cron');

const appConstants = require('../../helpers/appConstants.js');
const checkIfCountIsLimited = require('../../helpers/checkIfCountIsLimited.js');
const scrapABatch = require('./scrapABatch.js');

const scrapFunction = (db, taskList, searchEngines, keywords, urls) => {
  let batchedKeywords = lodash.chain(keywords)
    .shuffle()
    .chunk(5)
    .value();
  let currentHour = 1;
  for(var hour = 1; hour <= 20; hour++) {
    const cronString = `0 1 ${hour-1} * * *`;
    console.log('scheduling items for day ', cronString);
    taskList[hour-1][0] = cron.schedule(cronString, () => {
      const currentBatch = batchedKeywords[currentHour-1];
      // console.log('starting in scrap', currentBatch);
      scrapABatch.scrap(db, taskList, currentBatch, currentHour, urls);
      currentHour += 1;
    });
  }
}

module.exports = {
  scrapFunction,
}

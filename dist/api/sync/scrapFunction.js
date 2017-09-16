'use strict';

// const Promise = require('bluebird');

var forEach = require('lodash/forEach');

var moment = require('moment');
var map = require('lodash/map');
var lodash = require('lodash');
var random = require('lodash/random');
var findIndex = require('lodash/findIndex');
var merge = require('lodash/merge');
var sortBy = require('lodash/sortBy');
var reduce = require('lodash/reduce');
var filter = require('lodash/filter');
var isEqual = require('lodash/isEqual');
var shuffle = require('lodash/shuffle');
var cron = require('node-cron');

var appConstants = require('../../helpers/appConstants.js');
var checkIfCountIsLimited = require('../../helpers/checkIfCountIsLimited.js');
var scrapABatch = require('./scrapABatch.js');

var scrapFunction = function scrapFunction(db, taskList, searchEngines, keywords, urls) {
  var batchedKeywords = lodash.chain(keywords).shuffle().chunk(5).value();
  var currentHour = 1;
  for (var hour = 1; hour <= 20; hour++) {
    var cronString = '0 13 ' + (hour - 1) + ' * * *';
    console.log('scheduling items for day ', cronString);
    taskList[hour - 1][0] = cron.schedule(cronString, function () {
      var currentBatch = batchedKeywords[currentHour - 1];
      console.log('starting in scrap', currentBatch);
      scrapABatch.scrap(db, taskList, currentBatch, currentHour, urls);
      currentHour += 1;
    });
  }
};

module.exports = {
  scrapFunction: scrapFunction
};
//# sourceMappingURL=scrapFunction.js.map
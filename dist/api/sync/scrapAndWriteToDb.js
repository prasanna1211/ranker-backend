'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var forEach = require('lodash/forEach');

var map = require('lodash/map');
var findIndex = require('lodash/findIndex');
var merge = require('lodash/merge');
var sortBy = require('lodash/sortBy');

var appConstants = require('../../helpers/appConstants.js');
var moment = require('moment');
var scrapModule = require('./scrapFunction.js');

exports.default = function (db, taskList) {
  var start = new Date().getTime();

  // query DB for all keywords
  var keywordQuery = 'select k.keyword, k.id as keywordId, k.isImportant as isImportant, d.domain, d.id as domainId from keywords k, domains d where k.domainId = d.id';
  var urlQuery = 'SELECT u.id as urlId, u.url, cn.name, cn.id as companyId, d.domain from urls u, domains d, companynames cn where d.id = u.domainId AND u.companynameId = cn.id';
  var rankQuery = 'INSERT INTO ranks';
  var searchEngineQuery = 'SELECT id as searchEngineId, name as searchEngineName, value as searchEngineUrl from searchengines';

  var keywords = void 0;
  var urls = void 0;
  var searchEngines = void 0;

  db.query(searchEngineQuery, function (error, result) {
    searchEngines = result;
    db.query(keywordQuery, function (error, result) {
      if (error) throw error;
      keywords = result;
      db.query(urlQuery, function (error, result) {
        if (error) throw error;
        urls = result;

        scrapModule.scrapFunction(db, taskList, searchEngines, keywords, urls);
      });
    });
  });

  // For all scrap data

  // Once scrapped write in the db
};
//# sourceMappingURL=scrapAndWriteToDb.js.map
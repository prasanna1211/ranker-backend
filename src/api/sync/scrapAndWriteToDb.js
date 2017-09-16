const forEach = require('lodash/forEach');

const map = require('lodash/map');
const findIndex = require('lodash/findIndex');
const merge = require('lodash/merge');
const sortBy = require('lodash/sortBy');

const appConstants = require('../../helpers/appConstants.js');
const moment = require('moment');
const scrapModule = require('./scrapFunction.js');

export default (db, taskList) => {
  const start = new Date().getTime();

  // query DB for all keywords
  const keywordQuery = 'select k.keyword, k.id as keywordId, k.isImportant as isImportant, d.domain, d.id as domainId from keywords k, domains d where k.domainId = d.id';
  const urlQuery = 'SELECT u.id as urlId, u.url, cn.name, cn.id as companyId, d.domain from urls u, domains d, companynames cn where d.id = u.domainId AND u.companynameId = cn.id';
  const rankQuery = 'INSERT INTO ranks'
  const searchEngineQuery = 'SELECT id as searchEngineId, name as searchEngineName, value as searchEngineUrl from searchengines';

  let keywords;
  let urls;
  let searchEngines;

  db.query(searchEngineQuery, (error, result) => {
    searchEngines = result;
      db.query(keywordQuery, (error, result) => {
        if (error) throw error;
        keywords = result;
        db.query(urlQuery, (error, result) => {
          if (error) throw error;
          urls = result;

          scrapModule.scrapFunction(db, taskList, searchEngines, keywords, urls);

          });
      });
    });

  // For all scrap data

  // Once scrapped write in the db

}

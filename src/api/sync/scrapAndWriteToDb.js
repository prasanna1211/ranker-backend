const scrap = require('../../helpers/index.js');
const forEach = require('lodash/forEach');

const map = require('lodash/map');
const findIndex = require('lodash/findIndex');
const merge = require('lodash/merge');
const sortBy = require('lodash/sortBy');

const appConstants = require('../../helpers/appConstants.js');
const moment = require('moment');
const scrapModule = require('./scrapFunction.js');

export default (db) => (req, res) => {
  const start = new Date().getTime();
  console.log('started----');
  res.json({
    started: true,
  });
  let hasErrorOccured = false;
  // query DB for all keywords
  const keywordQuery = 'select k.keyword, k.id as keywordId, d.domain, d.category, d.id as domainId from keywords k, domains d where k.domain_id = d.id';
  const companyQuery = 'SELECT c.id as companyId, c.name, c.url, d.domain from companies c, domains d where d.id = c.domainId';
  const rankQuery = 'INSERT INTO ranks'
  const searchEngineQuery = 'SELECT id as searchEngineId, name as searchEngineName, value as searchEngineUrl from searchengines';

  let keywords;
  let companies;
  let searchEngines;

  db.query(searchEngineQuery, (error, result) => {
    searchEngines = result;
      db.query(keywordQuery, (error, result) => {
        if (error) throw error;
        keywords = result;
        db.query(companyQuery, (error, result) => {
          if (error) throw error;
          companies = result;

          // console.log('searchEngines', searchEngines);
          // console.log('-------------->');
          // console.log('keywords', keywords);
          // console.log('-------------->');
          // console.log('companies', companies);
          // console.log('-------------->');
          const randomNumber = map(keywords, () => ({ randomNumber: parseInt(Math.random()*10000) }) );
          keywords = merge(keywords, randomNumber);
          keywords = sortBy(keywords, keyword => keyword.randomNumber);
          scrapModule.scrapFunction(db, searchEngines, keywords, companies);
          });
      });
    });

  // For all scrap data

  // Once scrapped write in the db

}

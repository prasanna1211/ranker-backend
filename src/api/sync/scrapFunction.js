const Promise = require('bluebird');

const forEach = require('lodash/forEach');

const moment = require('moment');
const map = require('lodash/map');
const findIndex = require('lodash/findIndex');
const merge = require('lodash/merge');
const sortBy = require('lodash/sortBy');
const reduce = require('lodash/reduce');

const scrap = require('../../helpers/index.js');
const appConstants = require('../../helpers/appConstants.js');

const scrapFunction = (db, searchEngines, keywords, companies) => {
  let hasErrorOccured = false;
  Promise.mapSeries(searchEngines, ({ searchEngineId, searchEngineName, searchEngineUrl }) => {
    // recreate all domains here
    return Promise.mapSeries(keywords, (word) => {
      const companyUrl = reduce(companies, (accumulator, company) => {
        console.log(company);
        if (company.domain === word.domain) {
          accumulator.push(company.url);
        }
        return accumulator;
      }, []);
      return Promise
      .delay(appConstants.delayBetweenKeywords)
      .then(() => {

        return scrap.scrapeGoogleResult(word.keyword, searchEngineUrl, 5)
        .then((scrap) => {
          if (scrap.success) {
            let rankMapping = companyUrl.map(url => {
              return {
                url,
                rank: findIndex(scrap.result, resultUrl => url === resultUrl),
                keywordId: word.keywordId,
              }
            });
            const rankData = map(rankMapping, (rank, index) => {
              return merge(rank, companies[index]);
            });
            console.log('--------------->');
            const currentDate = moment().startOf('day').format('YYYY-MM-DD');
            const keywordQuery = 'KEYWORD QUERY';

            forEach(rankData, ({ url, rank, name, companyId, keywordId }) => {
              let dbQuery = `INSERT INTO ranks (rank, logDate, companyId, keywordId, searchEngineId)
                VALUES (${rank !== -1 ? rank+1 : rank}, "${currentDate}", ${companyId}, ${keywordId}, ${searchEngineId});
              `;
              console.log(dbQuery);
              db.query(dbQuery, (error, result) => {
                if (error) throw error;
              });
            });
          } else if (scrap.error) {
            hasErrorOccured = true;
            let dbQuery = `INSERT INTO errors (error) VALUE ${error.errorMessage}`
            db.query(dbQuery, (error, result) => {
              if (error) throw error;
              console.log(error);
            });
          }
        });

      });
    }).then(() => {
      const status = hasErrorOccured ? 'ERROR occured' : 'No Error Occured';
      let dbQuery = `INSERT INTO statuses (status) VALUE ("${status}")`;
      db.query(dbQuery, (error, result) => {
        if (error) throw error;
        const end = new Date().getTime();
        console.log('finished ', (end - start) / 1000);
      });
    });
  });
}

module.exports = {
  scrapFunction,
}

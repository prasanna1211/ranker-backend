import { version } from '../../package.json';
import { Router } from 'express';
import rankRoutes from './rank/index.js';
import companyRoutes from './companies/index.js';
import keywordRoutes from './keywords/index.js';
import domainRoutes from './domains/index.js';
import searchEngineRoutes from './searchEngines/index.js';
import cancelRoutes from './cancelRoutes/index.js';

export default ({ config, db, taskList }) => {
	let api = Router();

	// rank related routes
	api.route('/rank').get(rankRoutes.getRank(db));

	// companies route
	api.route('/domains').get(domainRoutes.getDomains(db));

	// searc engines route
	api.route('/searchengines').get(searchEngineRoutes.getSearchEngines(db));

	// companies route
	api.route('/companies').get(companyRoutes.getAllCompanies(db));

	// keywords route
	api.route('/keywords').get(keywordRoutes.getAllKeywords(db));

	// cancel all taskList
	api.route('/cancel').get(cancelRoutes.cancelAllTasks(taskList));

	return api;
}

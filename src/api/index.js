import { version } from '../../package.json';
import { Router } from 'express';
import rankRoutes from './rank/index.js';
import companyRoutes from './companies/index.js';
import keywordRoutes from './keywords/index.js';
import syncRoutes from './sync/index.js';

export default ({ config, db }) => {
	let api = Router();

	// rank related routes
	api.route('/rank').get(rankRoutes.getRank(db));

	// companies route
	api.route('/companies').get(companyRoutes.getAllCompanies(db));

	// keywords route
	api.route('/keywords').get(keywordRoutes.getAllKeywords(db));

	// scrap and sync to route
	api.route('/sync').get(syncRoutes.scrapAndWriteToDb(db));

	return api;
}

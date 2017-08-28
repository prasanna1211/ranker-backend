import { version } from '../../package.json';
import { Router } from 'express';
import rankRoutes from './rank/index.js';
import companyRoutes from './companies/index.js';

export default ({ config, db }) => {
	let api = Router();

	// rank related routes
	api.route('/rank').get(rankRoutes.getRank(db));

	// companies route
	api.route('/companies').get(companyRoutes.getAllCompanies(db));

	return api;
}

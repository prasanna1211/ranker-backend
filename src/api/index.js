import { version } from '../../package.json';
import { Router } from 'express';
import rankRoutes from './rank/index.js';

export default ({ config, db }) => {
	let api = Router();

	// rank related routes
	api.route('/rank').get(rankRoutes.getRank(db));

	return api;
}

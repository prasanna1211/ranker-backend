import { version } from '../../package.json';
import { Router } from 'express';
import rankRoutes from './rank/index.js';

export default ({ config, db }) => {
	let api = Router();

	// modified root API
	api.route('/rank').get(rankRoutes.getRank);
	api.route('/ranks').get(rankRoutes.getRanks);
	return api;
}

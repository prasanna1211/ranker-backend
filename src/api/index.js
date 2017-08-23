import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();

	// modified root API
	api.get('/', (req, res) => {
		res.json({
			success: false,
		});
	});

	return api;
}

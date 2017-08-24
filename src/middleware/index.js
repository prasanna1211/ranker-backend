import { Router } from 'express';
import getHtmlData from '../controllers/getHtmlData';
import getRank from '../helpers/getRank';
export default ({ config, db }) => {
	let routes = Router();
	routes.get('/',getHtmlData);
	routes.post('/rank',getRank);
	return routes;
}

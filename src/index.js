import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import cron from 'node-cron';
import map from 'lodash/map';
import syncModule from './api/sync/index.js';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

const taskHeader = new Array(30);

const taskList = map(taskHeader, task => new Array(20));

// // connect to db
// initializeDb( db => {
//
// 	// internal middleware
// 	app.use(middleware({ config, db }));
//
// 	// api router
// 	app.use('/api', api({ config, db, taskList }));
// 	const cronStringStarting = '0 12 11 * * *';
// 	const cronStringEnding = '0 0 23 * * *';
//
// 	cron.schedule(cronStringStarting, () => {
// 		syncModule.scrapAndWriteToDb(db, taskList);
// 	});
// 	cron.schedule(cronStringEnding, () => {
//     for (var i = 0; i < taskList.length; i++) {
//       for (var j = 0; j < taskList[i].length; j++) {
//         if (!isEmpty(taskList[i][j])) {
//           taskList[i][j].destroy();
//         }
//       }
//     }
// 	});
// 	app.server.listen(process.env.PORT || config.port, () => {
// 		console.log(`Started on port ${app.server.address().port}`);
// 	});
// });
	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
export default app;

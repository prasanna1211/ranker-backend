'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _index = require('./rank/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./companies/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./keywords/index.js');

var _index6 = _interopRequireDefault(_index5);

var _index7 = require('./domains/index.js');

var _index8 = _interopRequireDefault(_index7);

var _index9 = require('./searchEngines/index.js');

var _index10 = _interopRequireDefault(_index9);

var _index11 = require('./cancelRoutes/index.js');

var _index12 = _interopRequireDefault(_index11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db,
	    taskList = _ref.taskList;

	var api = (0, _express.Router)();

	// rank related routes
	api.route('/rank').get(_index2.default.getRank(db));

	// companies route
	api.route('/domains').get(_index8.default.getDomains(db));

	// searc engines route
	api.route('/searchengines').get(_index10.default.getSearchEngines(db));

	// companies route
	api.route('/companies').get(_index4.default.getAllCompanies(db));

	// keywords route
	api.route('/keywords').get(_index6.default.getAllKeywords(db));

	// cancel all taskList
	api.route('/cancel').get(_index12.default.cancelAllTasks(taskList));

	return api;
};
//# sourceMappingURL=index.js.map
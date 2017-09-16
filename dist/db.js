'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {
	// connect to a database if needed, then pass it to `callback`:
	var con = _mysql2.default.createConnection({
		host: _config2.default.dbHost,
		user: _config2.default.dbUsername,
		password: _config2.default.dbPassword,
		database: _config2.default.dbName
	});

	con.connect(function (err) {
		if (err) throw err;
	});
	callback(con);
};
//# sourceMappingURL=db.js.map
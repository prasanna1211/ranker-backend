import mysql from 'mysql';
import config from './config.json';

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	const con = mysql.createConnection({
		host: config.dbHost,
		user: config.dbUsername,
		password: config.dbPassword,
	});

	con.connect((err) => {
		if (err) throw err;
	})
	callback(con);
}

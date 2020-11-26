import mysql from 'mysql';

export const pool = mysql.createConnection({
	host: 'localhost',
	user: 'fenikz',
	password: '@F3n1k583'
});

pool.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + pool.threadId);
});

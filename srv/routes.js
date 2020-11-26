import express from 'express'
import { pool } from '../db/mysql.js';

const router = express.Router();

// router.get('/databases', (req, res) => {
// 	pool.getConnection((err, connection) => {
// 		if (err) throw err;

// 		connection.query('SHOW DATABASES', (err, result) => {
// 			if (err) throw err;
// 			const data = result.map(({ Database }, idx) => ({ id: idx + 1, Database }));
// 			res.status(200).json(data)
// 		})
// 		connection.release()
// 	});
// })

// router.get('/privileges', (req, res) => {
// 	pool.getConnection((err, connection) => {
// 		if (err) throw err;

// 		connection.query(`SHOW GRANTS FOR 'fenikz'@'localhost'`, (err, result) => {
// 			if (err) throw err;
// 			console.log(result)
// 			const data = result.map(({ Database }, idx) => ({ id: idx + 1, Database }));
// 			res.status(200).json(result)
// 		})
// 		connection.release()
// 	});
// });

router.post('/database', (req, res) => {
	const { body } = req, // req.body
				{ database } = body; // req.body.database

	if ( database  && database !== '' ) {
		return pool.query(`CREATE DATABASE ${database}`, (err, result) => {
			if (err) {
				if( err.code === "ER_DB_CREATE_EXISTS" && err.errno === 1007){
					pool.query(`USE ${database}`)
					return res.status(200).json({ message: `Activating ${database}` })
				}
				return res.status(500).json({ err });
			}
			console.log(`Database ${database} created`);
			console.log('result: >>', result);
			res.status(201).json({ result });
		})
	}
	return res.status(400).json({ warning: 'Database value is an empty string or missing.'});	
});

router.post( '/table', (req, res) => {
	const { body } = req,
				{ database, table } = body;

	if ( database  && database !== '') {
		pool.query(`USE ${database}`);

		if ( table  && table !== '' ) {
			return pool.query(`CREATE TABLE ${table}`, (err, result) => {
				if (err) {
					return res.status(500).json({ error: err.sqlMessage });
				}
				console.log(`Table ${table} created`);
				console.log('result: >>', result);
				res.status(201).json({ result });
			})
		}
		return res.status(400).json({ warning: 'Table value is an empty string or missing.'});
	}	
	
	return res.status(400).json({ warning: 'Database value is an empty string or missing.'});
		

})
export default router;

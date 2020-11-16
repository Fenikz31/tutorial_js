import express from 'express'
import { pool } from '../db/mysql.js';

const router = express.Router()

router.get('/databases', (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) throw err;

		connection.query('SHOW DATABASES', (err, result) => {
			if (err) throw err;
			const data = result.map(({ Database }, idx) => ({ id: idx + 1, Database }));
			res.status(200).json(data)
		})
		connection.release()
	});
})

router.get('/privileges', (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) throw err;

		connection.query(`SHOW GRANTS FOR 'fenikz'@'localhost'`, (err, result) => {
			if (err) throw err;
			console.log(result)
			const data = result.map(({ Database }, idx) => ({ id: idx + 1, Database }));
			res.status(200).json(result)
		})
		connection.release()
	});
});

router.post('/database', (req, res) => {
	const { body } = req,
				{ database } = body
	if (database && database !== '') {
		return pool.query(`CREATE DATABASE ${database}`, (err, result) => {
			if (err) {
				return res.status(500).json({ err })
			}
			
			(`Database ${database} created`)
			res.status(201).json({})
		})		
	}
	return res.status(500).json({ warning: 'Database value is an empty string or missing.'})
	
})
export default router

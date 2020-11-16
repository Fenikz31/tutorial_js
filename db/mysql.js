import mysql from 'mysql'

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'fenikz',
    password: '@F3n1k583',
    connectionLimit: 10
})

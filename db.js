const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan user MySQL kamu
    password: '', // Ganti dengan password
    database: 'predict_db'
});
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});
module.exports = db;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST: Save candidates
app.post('/api/candidates', (req, res) => {
    const candidates = req.body; // Array of {nama, rapot, sikap, prestasi, score, status}
    const sql = 'INSERT INTO candidates (nama, rapot, sikap, prestasi, score, status) VALUES ?';
    const values = candidates.map(c => [c.nama, c.rapot, c.sikap, c.prestasi, c.score, c.status]);
    db.query(sql, [values], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Candidates saved', ids: result.insertId });
    });
});

// GET: Get all candidates (for history)
app.get('/api/candidates', (req, res) => {
    db.query('SELECT * FROM candidates ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// PUT: Update candidate
app.put('/api/candidates/:id', (req, res) => {
    const { nama, rapot, sikap, prestasi, score, status } = req.body;
    db.query('UPDATE candidates SET nama=?, rapot=?, sikap=?, prestasi=?, score=?, status=? WHERE id=?',
        [nama, rapot, sikap, prestasi, score, status, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Candidate updated' });
    });
});

// GET: Get single candidate by ID
app.get('/api/candidates/:id', (req, res) => {
    db.query('SELECT * FROM candidates WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ message: 'Candidate not found' });
        res.send(result[0]);
    });
});

// DELETE: Delete candidate
app.delete('/api/candidates/:id', (req, res) => {
    db.query('DELETE FROM candidates WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Candidate deleted' });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
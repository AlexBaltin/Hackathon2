const express = require('express');
const { Client } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error("Connection error:", err));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/random-news', async (req, res) => {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const randomArticle = data.articles[Math.floor(Math.random() * data.articles.length)];
        res.json(randomArticle);
    } catch (error) {
        console.error("Error requesting an article", error);
        res.status(500).json({ message: 'Error getting an article' });
    }
});

app.post('/api/save-news', express.json(), (req, res) => {
    const { title, description, status, url_to_image } = req.body;

    const query = 'INSERT INTO news (title, description, status, url_to_image) VALUES ($1, $2, $3, $4)';
    const values = [title, description, status, url_to_image];

    client.query(query, values)
        .then(() => res.status(200).json({ message: 'An article seccesfully saved' }))
        .catch(err => {
            console.error('Error saving an article:', err);
            res.status(500).json({ message: 'Error saving an article' });
        });
});

app.get('/api/status-news/:status', (req, res) => {
    const status = req.params.status;
    const query = 'SELECT * FROM news WHERE status = $1';
    
    client.query(query, [status])
        .then(result => res.status(200).json(result.rows))
        .catch(err => {
            console.error('Error requesting an article by status:', err);
            res.status(500).json({ message: 'Error requesting an article' });
        });
});

app.listen(port, () => {
    console.log(`Server runs on ${port}`);
});

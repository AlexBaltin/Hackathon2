# News API Node Project

By Alex Baltin

## About
A simple NodeJS backend, JavaScript and HTML frontend for reading and saving news articles.

## Installation 
Make sure NPM is installed on your machine.

To install project dependencies, run:
```shell
npm install
```

Create a `.env` file as shown below:
```ini
NEWS_API_KEY='myapikey'
DATABASE_URL="postgresql://my_user:my_pass@host/news_db?sslmode=require"
```
You can get a News API key [here](https://newsapi.org/).

Intialize your database by running:
```SQL
CREATE DATABASE IF NOT EXISTS news_db;

SET search_path TO news_db;

CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK (status IN ('read', 'important', 'fake')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url_to_image VARCHAR(1000)
);
```

Finally, run the server:
```shell
node server.js
```

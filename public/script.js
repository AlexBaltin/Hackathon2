async function getRandomNews() {
    const response = await fetch('/api/random-news');
    const data = await response.json();
    const newsContainer = document.getElementById('news-container');
    
    newsContainer.innerHTML = `
        <div class="news-item">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <img src="${data.urlToImage}">
            <div></div>
            <button class="btn" onclick="saveNews('${data.title}', '${data.description}', 'read', '${data.urlToImage}' )">Mark as read</button>
            <button class="btn" onclick="saveNews('${data.title}', '${data.description}', 'important', '${data.urlToImage}')">Mark as important</button>
            <button class="btn" onclick="saveNews('${data.title}', '${data.description}', 'fake', '${data.urlToImage}')">Mark as fake</button>
            <button class="btn"><a href="${data.url}" target="_blank">Read full article</a></button>
            
        </div>
    `;
}

async function saveNews(title, description, status, url_to_image) {
    await fetch('/api/save-news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, status, url_to_image })
    });
    alert('An article saved');
}

async function showNews(status) {
    const response = await fetch(`/api/status-news/${status}`);
    const data = await response.json();
    const newsContainer = document.getElementById('news-container');
    
    
    if (data.length === 0) {
        newsContainer.innerHTML = `<p>No article with that status.</p>`;
        return;
    }

    
    newsContainer.innerHTML = data.map(news => `
        <div class="news-item">
            <h3>${news.title}</h3>
            <p>${news.description}</p>
            <img src="${news.url_to_image}">

        </div>
    `).join('');
}

const API_KEY = `bb1b88cbeaa145ee9d93a45cfefc5091`;

let newsList = [];

const getLatestNews = async () => {
  const url = new URL(
    `https://jongmin-news-times.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("dddd", data.articles);
  let newsList = data.articles;
  render();
  console.log("dddd", newsList);
};

const render = () => {
  const newsHTML = ``;

  newsHTML = newsList.map(
    (news) => `<div class="row news">
  <div class="col-lg-4">
    <img class="news-img-size" src="${news.urlToImage}" alt="" />
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.description}</p>
    <div>${news.source.name} * ${news.source.publishedAt}}</div>
  </div>
</div>`
  );

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

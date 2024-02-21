const API_KEY = `bb1b88cbeaa145ee9d93a45cfefc5091`
let newsList = [];
const getLatestNews = async() =>{
    const url = new URL (`http://jongmin-news-times.netlify.app/top-headlines=${API_KEY}`);
    const response = await fetch(url);    
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("dddd", newsList);
};

const render=()=>{
    const newsHTML =newsList.map(news=>`<div class="row news">
    <div class="clo-lg-4">
      <img
        class="news-img-size"
        src=${news.urlToImage}/>
    </div>
    <div class="clo-lg-8">
      <h2>${news.title}</h2></h2>
      <p>${news.description}</p>
      <div>${news.source.name} * ${news.publishedAt}
      </div>
    </div>
  </div>`
  ).join("");
    
    document.getElementById("news-board").innerHTML = newsHTML
};
getLatestNews();
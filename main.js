const API_KEY=`bb1b88cbeaa145ee9d93a45cfefc5091`
let news = [];

const getLatestNews = async() =>{
  const url = new URL(`https://jongmin-news-times.netlify.app?country=kr&apiKey=${API_KEY}`);
  const response =await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("dddd", news);
};

getLatestNews();
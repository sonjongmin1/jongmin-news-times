const API_KEY = `bb1b88cbeaa145ee9d93a45cfefc5091`;

const getLatestNews = async () => {
  const url = new URL(
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("dddd", data.articles);
};

getLatestNews();

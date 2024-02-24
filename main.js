const API_KEY = `bb1b88cbeaa145ee9d93a45cfefc5091`;

let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

let url = new URL(
  `https://jongmin-news-times.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page); // => &page=page
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);

    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://jongmin-news-times.netlify.app/top-headlines?country=kr&apiKey=${API_KEY}`
  );

  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://jongmin-news-times.netlify.app/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );

  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://jongmin-news-times.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );

  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
  <div class="col-lg-4">
    <img
      class="news-img-size"
      src=${news.urlToImage}
    />
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>
    ${news.description}
    </p>
    <div>
    ${news.source.name} * ${news.source.publishedAt}
    </div>
  </div>
</div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  //totalResults
  //page
  //pageSize
  //groupSize
  //totalpages
  const totalPages = Math.ceil(totalResults / pageSize);
  //pageGroup
  const pageGroup = Math.ceil(page / groupSize);
  //lastPage
  const lastPage = pageGroup * groupSize;
  //마지막 페이지그룹이 그룹사이즈보다 작다? lastpage = totalpage
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ``;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link" >${i}</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log("movetopage", pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();

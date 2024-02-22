const API_KEY=`bb1b88cbeaa145ee9d93a45cfefc5091`
let newsList=[];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)))

const getLatestNews = async() => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json(); // body안에 data는 json()으로 뽑아줘야됨, json은 파일 형식, 객체
    newsList = data.articles;
    render();
    console.log("ddd",newsList);
}

const getNewsByCategory= async(event)=>{
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("Ddd", data);
  newsList = data.articles;
  render();
};

const getNewsByKeyword= async()=>{
    const keyword = document.getElementById("search-input").value;
    console.log("keyword",keyword);
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)

    const response = await fetch(url);
    const data = await response.json();
    console.log("keyword data", data);
    newsList = data.articles;
    render();
  };

const render=()=>{
  const newsHTML = newsList.map(
    (news) =>`<div class="row news">
  <div class="col-lg-4">
    <img class="news-img-size"
      src=${news.urlToImage}/>
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>
      ${news.description}
    </p>
    <div>
    ${news.source.name} * ${news.publishedAt}
    </div>
  </div>
</div>`
).join('');
  // TodoList에서 학습한 내용 기억안나면 다시 강의듣고 오기
 
  document.getElementById("news-board").innerHTML=newsHTML
};

getLatestNews();

// 1.버튼들에 클릭이벤트주기 o
// 2.카테고리별 뉴스 가져오기 o
// 3.그 뉴스를 보여주기

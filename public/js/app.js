// const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
const btnHxr = document.getElementById('xhr-btn');
const btnFetch = document.getElementById('fetch-btn');
let searchedForText;

btnHxr.addEventListener('click', function(event) {
  event.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

btnFetch.addEventListener('click', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  let uri = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=9b862bfc87dc4ac89e968cad79b16cbc`;
  fetch(uri)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      const response = data.response.docs;
      addNews(response);
    })
    .catch(function(error) {
      console.log(error);
    });
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.onreadystatechange = function() {
    if (articleRequest.readyState === 4 && articleRequest.status === 200) {
      const data = JSON.parse(this.responseText);
      const response = data.response.docs;
      articleRequest.onload = addNews(response);
      articleRequest.onerror = handleError; 
    } 
  };
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=9b862bfc87dc4ac89e968cad79b16cbc`);
  articleRequest.send();
}

function addNews(article) {
  article.map((article) => {
    console.log(article);
    const title = article.headline.main;
    const snippet = article.snippet;
    const imagen = article.multimedia[0].url;
    const webUrl = article.web_url;

    let p = document.createElement('p');
    let li = document.createElement('li');
    let img = document.createElement('img');

    p.className = 'titleClass';
    li.className = 'articleClass';
    img.className = 'imageClass';
    li.innerText = snippet;
    p.innerText = title;
    img.src = 'https://nytimes.com/' + imagen;

    responseContainer.appendChild(p);
    responseContainer.appendChild(li);
    responseContainer.appendChild(img);

    p.addEventListener('click', function() {
      window.location.href = webUrl;
    });
  });
  /* console.log(this.responseText);
  console.log(data.response);
  console.log(this.responseText.docs);*/
}

function handleError(error) {
  console.log(error);
}


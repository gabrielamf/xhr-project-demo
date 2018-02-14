const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=9b862bfc87dc4ac89e968cad79b16cbc`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

function handleError() {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText); // cuando pongo solo response me da lo mismo ¿?
  const response = data.response;
  const article = data.response.docs; //

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


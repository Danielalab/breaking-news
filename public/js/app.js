$(document).ready(() => {
  // selecionando elementos del DOM
  const form = $('#search-form');
  const btnJquery = $('#btn-jquery');
  const searchInput = $('#search');
  const btnBreakingNews = $('#btn-fetch');
  const responseContainer = $('#news-results');
  let searchedForText;
  let urlNYtimes = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
  let keyApi = '&api-key=61f1ab32a7874cc7b37a40e9ecc89b49';

  // funcionalidad para crear sección de noticias recientes usando 'FETCH'
  // let createSectionBreakingNews = (event) => {
  //   event.preventDefault();
  //   let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  //   let actualDate = new Date();
  //   let day = actualDate.getDate();
  //   let actualMonth = months[actualDate.getUTCMonth()];
  //   let actualYear = actualDate.getFullYear();
  //   let fullDate = actualYear + actualMonth + day;
  //   console.log(fullDate);
  //   let urlSearch = `${urlNYtimes}begin_date=${fullDate}${keyApi}`;
  //   console.log(urlSearch);
  //   fetch(urlSearch)
  //     .then(function(result) {
  //       console.log(result);
  //       fetch(result.url).then((result)=> console.log(result));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  let createSectionNews = (article) => {
    let divContainerNews = `
      <div class="card my-2 col-12">
        <h5 class="card-header">${article.headline.main}</h5>
        <div class="card-body">
          <p class="card-text">${article.snippet}</p>
          <a href="#" class="btn btn-info">Go somewhere</a>
        </div>
      </div>
     `;
    $(responseContainer).append(divContainerNews);
  };

  // funcionalidad para buscar noticias ajax-jquery
  let addNews = (news) => {
    console.log(news);
    let articles = news.response.docs;
    articles.forEach((article) => {
      console.log(article);
      createSectionNews(article);
    });
  };

  let handleError = () => {
    console.log('se ha presentado un error');
  };

  let getNews = () => {
    $.ajax({
      url: `${urlNYtimes}q=${searchedForText}${keyApi}`
    }).done(addNews)
      .fail(handleError);
  };

  let startSearch = (event) => {
    event.preventDefault();
    responseContainer.html('');
    searchedForText = searchInput.val();
    getNews();
  };

  let startSearchFetch = () => {
    event.preventDefault();
    let url = `${urlNYtimes}q=${searchedForText}${keyApi}`;
    fetch(url)
      .then(function(result) {
        console.log(result);
        return result;
      })
      // .then(

      // )
      .catch(error => {
        console.log(error);
      });
  };

  // asociando eventos a funciones
  btnJquery.on('click', startSearch);
  btnBreakingNews.on('click', startSearchFetch);
});
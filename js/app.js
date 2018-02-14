$(document).ready(() => {
  // selecionando elementos del DOM
  const form = $('#search-form');
  const searchInput = $('#search');
  const responseContainer = $('#news-results');
  let searchedForText;
  let urlNYtimes = 'http://api.nytimes.com/svc/search/article_search_v2.json?';
  let keyApi = '&api-key=61f1ab32a7874cc7b37a40e9ecc89b49';

  // funcionalidad para crear sección de noticias recientes
  
  // funcionalidad para buscar noticias
  let addNews = (news) => {
    let articles = news.response;
    articles.forEach((article) => {
      console.log(article);
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

  // asociando eventos a funciones
  form.on('submit', startSearch);
});
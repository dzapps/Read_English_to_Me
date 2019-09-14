const NEWSAPIKEY = "6d3bf7bff5324831a84530cf4ea8f757";
const SEARCHURL = "https://newsapi.org/v2/everything";

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log("Looks like there was a problem!", error));
}

fetchData(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWSAPIKEY}`
).then(data => generateResults(data.articles));

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function generateResults(data) {
  $("#top-headlines").empty();
  for (let i = 0; i < data.length; i++) {
    let content = [`${data[i].content}`];
    let newId = "read-me" + i;
    $("#top-headlines").append(
      `<section class="card">
          <img src="${data[i].urlToImage}"/>
            <h1 class="card-title"><a href=${data[i].url} target="_blank">${data[i].title}</a></h1>
            <p><span>${data[i].source.name}</span></p>
            <p>${data[i].description}</p>
            <p id='${newId}' hidden="true">${content}</p>
<div>
           <button class="read-to-me" onclick="responsiveVoice.speak(document.getElementById('${newId}').textContent);" 
            type="button">Read English to Me!</button>
            </div>
      </section>`
    );
  }
}

function newSearch(searchTerm = "technology") {
  const params = {
    q: searchTerm,
    apiKey: NEWSAPIKEY
  };

  let queryString = $.param(params);
  const url = SEARCHURL + "?" + queryString;

  fetchData(url).then(data => generateResults(data.articles));
}

function formSearch() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#search-term").val();
    newSearch(searchTerm);
    $("#search-term").val("");
  });
}

$(formSearch);

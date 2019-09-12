const NEWSAPIKEY = '6d3bf7bff5324831a84530cf4ea8f757';
const SEARCHURL = 'https://newsapi.org/v2/everything'

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
     $("#top-headlines").append(
      `<div>
        <li>
            <h3><a href=${data[i].url} target="_blank">${data[i].title}</a></h3>
            <p><span>${data[i].source.name}</span></p>
            <p>${data[i].description}</p>
            <button id='text-to-speech' type="button">Read English to Me!</button> 
        </li>
      </div>`
    );
  }
}

function newSearch(searchTerm = 'technology'){
    const params ={
        q: searchTerm,
        apiKey: NEWSAPIKEY,
    };

    let queryString = $.param(params);
    const url = SEARCHURL + "?" + queryString;

    fetchData(url).then(data => generateResults(data.articles));
}

function formSearch(){
    $('form').submit(event =>{
        event.preventDefault();
        const searchTerm = $("#search-term").val();
        newSearch(searchTerm);
    })
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
// $(document).on("click", "#texttospeech", function(e) {
//   alert("It worked!");
// });
$(document).on("click", '#text-to-speech', function(e) {
    const url = $(this).closest('li').find('a');
    let textToSpeechURL = url[0].href;
    console.log(textToSpeechURL);
  });
  

$(formSearch);


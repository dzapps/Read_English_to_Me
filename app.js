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
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=6d3bf7bff5324831a84530cf4ea8f757"
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
  for (let i = 0; i < data.length; i++) {
    $("#top-headlines").append(
      `<li>
      <h3><a href="${data[i].url}" target="_blank">${data[i].title}</a></h3>
      <p>${data[i].source.name} | ${data[i].author}</p>
      <p>${data[i].description}</p>
      <button id="texttospeech" type="button">Read English to Me!</button> 
      </li>`
    );
  }
}
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
$(document).on('click', '#texttospeech', function(e) {
    alert('It worked!');
});
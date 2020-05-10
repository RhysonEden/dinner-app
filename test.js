let main = $("#results");

let jobInfo;

$("#job-search").on("submit", async function (event) {
  event.preventDefault();
  main.empty();
  let jobtitle = $("#description").val();
  let fulltime = $("#fulltime").val();
  try {
    let response = await fetch("/job-search", {
      method: "POST",
      body: JSON.stringify({
        description: jobtitle,
        fulltime,
      }),
    });
    let data = await response.json();
    console.log(data);
    data.results.forEach(post => {
      displayData(post);
    })
  } catch (error) {
    console.log(error);
  }
});

async function fetchWeather() {
  if (!navigator || !navigator.geolocation) {
    $('#weather').append($('<h3>Weather not available on this browser</h3>'))
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { coords: { latitude, longitude } } = position;

    const response = await fetch(`/weather?lat=${ latitude }&lon=${ longitude }`);
    const { results } = await response.json();

    if (results.daily) {
      $('#weather').empty();

      results.daily.forEach(day => {
        const { weather: [{ icon }] } = day;

        $('#weather').append($(`
          <img src="http://openweathermap.org/img/wn/${ icon }@2x.png" />
        `));
      });
    }
  }, async (error) => {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    if (result.state == "denied") {
      $('#weather').html(
        $(`<div>
            <h3>You have denied access to location services.</h3>
            <h4>If you wish to see your forecast, update your settings and refresh.</h4>
          </div>`)
      )
    }
  });
}




async function fetchQuote() {
  const response = await fetch('/cowspiration');
  const { cow } = await response.json();

  $('#results').empty().append($(`<pre>${ cow }</pre>`))
}

function displayData(post){
  main.append(`<div class="job-post"><h2>Company: <i>${post.company}</i></h2><br> <h3>Job Title: ${post.title}</h3><br><h4>
  Description: ${post.description}</h4><br><h5>Type: ${post.type}</h5><h5>Location:${post.location} <h5>Apply: ${post.how_to_apply}</h5></div>`)
}

fetchQuote();
fetchWeather();

// results.forEach();

// function Function1(currentValue, index) {
//   main.append(`<div id="jobs>${results.description}</div>`);
// }


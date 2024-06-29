let apiKey = "10d8a39f8a9446b190695814242606";
let searchInput = document.getElementById("search-code");
let searchBtn = document.querySelector(".search-btn");

let DataObject = {};

// current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  getData(lat, lon);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

searchBtn.addEventListener("click", function () {
  getDataByInput();
});

async function getData(lat, lon) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3`
  );
  let data = await response.json();
  DataObject = data;
  display();
}

async function getDataByInput() {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchInput.value}&days=3`
  );
  let data = await response.json();
  DataObject = data;
  display();
}
// convert date to day name
function getDayName(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function display() {
  // cards day
  let date1 = DataObject.forecast.forecastday[0].date;
  let date2 = DataObject.forecast.forecastday[1].date;
  let date3 = DataObject.forecast.forecastday[2].date;
  document.getElementById("date1").innerText = date1;
  document.getElementById("date2").innerText = date2;
  document.getElementById("date3").innerText = date3;
  //  day names
  document.getElementById("day1").innerHTML = getDayName(date1);
  document.getElementById("day2").innerHTML = getDayName(date2);
  document.getElementById("day3").innerHTML = getDayName(date3);

  // card location
  let reslocation = DataObject.location.name;
  let location = document.querySelectorAll(".location");
  location[0].innerHTML = reslocation;
  location[1].innerHTML = reslocation;
  location[2].innerHTML = reslocation;

  // card temperature max
  let tempmax = document.querySelectorAll(".card-text");
  tempmax[0].innerHTML =
    "MAX : " + DataObject.forecast.forecastday[0].day.maxtemp_c;
  tempmax[1].innerHTML =
    "MAX : " + DataObject.forecast.forecastday[1].day.maxtemp_c;
  tempmax[2].innerHTML =
    "MAX : " + DataObject.forecast.forecastday[2].day.maxtemp_c;

  // card temperature min
  let tempmin = document.querySelectorAll(".card-text-min");
  tempmin[0].innerHTML =
    "MIN : " + DataObject.forecast.forecastday[0].day.mintemp_c;
  tempmin[1].innerHTML =
    "MIN : " + DataObject.forecast.forecastday[1].day.mintemp_c;
  tempmin[2].innerHTML =
    "MIN : " + DataObject.forecast.forecastday[2].day.mintemp_c;

  // card img
  let images = document.querySelectorAll(".card-body img");
  images[0].src = `https:${DataObject.forecast.forecastday[0].day.condition.icon}`;
  images[1].src = `https:${DataObject.forecast.forecastday[1].day.condition.icon}`;
  images[2].src = `https:${DataObject.forecast.forecastday[2].day.condition.icon}`;

  // card day status
  let status = document.querySelectorAll(".card-body span");
  status[0].innerHTML = DataObject.forecast.forecastday[0].day.condition.text;
  status[1].innerHTML = DataObject.forecast.forecastday[1].day.condition.text;
  status[2].innerHTML = DataObject.forecast.forecastday[2].day.condition.text;
}

//  get location
window.onload = getLocation;

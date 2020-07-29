//Global Variables - geoNames
let geoBaseURL = 'http://api.geonames.org/searchJSON?';
let geoApi = '5ac28c17516040a2b6d2a94d5a6e00a7';
let username = 'sinhoching';

//Global Variables - WeatherBit
let wbBaseURL = 'http://api.weatherbit.io/v2.0/forecast/daily';
let wbApi = '5ac28c17516040a2b6d2a94d5a6e00a7';


//add-btn event listener
document.getElementById('add-btn').addEventListener('click', addTrip);

function addTrip(e) {
    document.getElementById("add-trip-box").style.display="block"
}

//add-trip-box remove button event listener
document.getElementById('remove-btn-1').addEventListener('click', removeAddTrip);

function removeAddTrip(e) {
    document.getElementById("add-trip-box").style.display="none"
}

//add-trip-box save button event listener
document.getElementById('save-btn-1').addEventListener('click', passDataToTripBox);

function passDataToTripBox(e) {
    const city = document.getElementById('destination').value;
    const departing = document.getElementById('departing').value;
    const returning = document.getElementById('returning').value;
    getCoordinates(username, city)
        .then(function (data) {
            console.log("coordinates get");
            console.log(data);
            return getWeather(data.lat, data.lng, departing)
        })
        .then(function (wdata) {
            console.log("weather get");
            console.log(wdata);
            addTripBox(city, departing, returning, wdata.highTemp, wdata.lowTemp, wdata.descript);
            return getImage()
        });
        document.getElementById("add-trip-box").style.display="none"
}

function daysApart(dt2, dt1) {

    var millisecondsPerDay = 86400000
    var diff = (dt2.getTime() - dt1.getTime()) / millisecondsPerDay;
    return Math.abs(Math.round(diff));
  
  }

function addTripBox(city, departing, returning, highTemp, lowTemp, descript) {

    const tripBox = document.createElement('div');
    const today = new Date();
    const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const date1 = new Date(departing);
    const date2 = new Date(todayDate);
    console.log(daysApart(date1, date2));
    const countDown = daysApart(date1, date2)

    tripBox.setAttribute('class', 'box-gap');
    tripBox.innerHTML =
    `<div class="trip-box">
        <img id="trip-image" alt="Trip Image">
        <div id="trip-info">
          <div>My trip to : <span class="input" id="destination-input">${city}</span></div>
          <div>Departing : <span class="input" id="departing-input">${departing}</span></div>
          <div>Returning : <span class="input" id="returning-input">${returning}</span></div>
        </div>
        <div id="edit-button-2">
          <button class="content-button" id="save-btn-2">save trip</button>
          <button class="content-button" id="remove-btn-2">remove trip</button>
        </div>
        <div id="count-down"><span>${city}</span> is <span>${countDown}</span> days away</div>
        <div id="weather-forecase">Typical weather for then is :
          <br><div>High - <span>${highTemp}</span>, Low - <span>${lowTemp}</span></div>
          <br><div><span>${descript}</span>throughout the day.</div>
        </div>
      </div>`;
    document.body.querySelector('.content-box').appendChild(tripBox);
}


/*
//Dynamic UI Update
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = allData.entries[allData.entries.length - 1].temp;
        document.getElementById('date').innerHTML = allData.entries[allData.entries.length - 1].date;
        document.getElementById('content').innerHTML = allData.entries[allData.entries.length - 1].content;

    } catch (error) {
        console.log("error", error);
    }
}
*/

//getCoordinates GET request (Geonames)
const getCoordinates = async (username, city) => {
    const urlCity = encodeURI(city)
    const url = `${geoBaseURL}q=${urlCity}&maxRows=1&username=${username}`;
    console.log(url)
    const res = await fetch(url);
    try {
        const newData = await res.json();
        return {
            lat: newData.geonames[0].lat,
            lng: newData.geonames[0].lng
        }
    } catch (error) {
        console.log("error", error);
    }
}

//getWeather GET request (WeatherBit)
const getWeather = async (lat, lon, departing) => {
    const url = `${wbBaseURL}?lat=${lat}&lon=${lon}&days=1&valid_date=${departing}&key=${wbApi}`;
    console.log(url)
    const res = await fetch(url);
    try {
        const newData = await res.json();
        return {
            highTemp: newData.data[0].max_temp,
            lowTemp: newData.data[0].min_temp,
            descript: newData.data[0].weather.description
        }
    } catch (error) {
        console.log("error", error);
    }
}


//postData POST request
const postData = async (url = '', data = {}) => {
    //console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        //console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

export { passDataToTripBox }
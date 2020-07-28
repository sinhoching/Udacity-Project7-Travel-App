//Global Variables - weatherbit
let baseURL = 'http://api.geonames.org/searchJSON?';
let apiKey = '5ac28c17516040a2b6d2a94d5a6e00a7';
let username = 'sinhoching';

//add-btn event listener
document.getElementById('add-btn').addEventListener('click', addTrip);

function addTrip(e) {
    document.getElementById("add-trip-box").style.display="block"
}

//remove-btn-1 event listener
document.getElementById('remove-btn-1').addEventListener('click', removeTrip);

function removeTrip(e) {
    document.getElementById("add-trip-box").style.display="none"
}



//save-btn-1 event listener
document.getElementById('save-btn-1').addEventListener('click', performAction);

function performAction(e) {
    const city = document.getElementById('destination').value;
    const departing = document.getElementById('departing').value;
    const returning = document.getElementById('returning').value;
    getCoordinates(username, city)
        .then(function (data) {
            console.log("success");
            console.log(data);
            addTripBox(city, departing, returning);
            //postData('/addData', { temp: data.main.temp, date: data.dt, content: document.querySelector('textarea').value });
        })
        .then(function () {
            //updateUI();
        });
}


function addTripBox(city, departing, returning ) {

    const tripBox = document.createElement('div');
    tripBox.innerHTML =
    `<div id="box-1">
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
        <div id="count-down"><span>destination</span> is <span>numberofdate</span> days away</div>
        <div id="weather-forecase">Typical weather for then is :
          <br><span>high-temp</span>, <span>low-temp</span>
          <br><span>prediction</span>
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

//getCoordinates GET request
const getCoordinates = async (username, city) => {
    const urlCity = encodeURI(city)
    const url = `${baseURL}q=${urlCity}&maxRows=1&username=${username}`;
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

export { performAction }
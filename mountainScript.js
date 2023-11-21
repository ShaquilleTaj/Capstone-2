"use strict";

window.onload = () => {
  const mountainsSelect = document.getElementById("mountains");
  const mountainContainer = document.querySelector(".mountainContainer");

  // looping through mountains array and put in mountains select input
  mountainsArray.forEach((mountain) => {
    mountainsSelect.innerHTML += `<option value='${mountain.name}'>${mountain.name}</option>`;
  });

  mountainsSelect.addEventListener("change", mountainsSelectOnchange);

  async function mountainsSelectOnchange() {
    const value = mountainsSelect.value;
    const mountain = mountainsArray.find((mt) => mt.name === value);
    const sunsetData = await getSunsetForMountain(
      mountain.coords.lat,
      mountain.coords.lng
    );
    console.log(mountain);
    console.log(sunsetData);

    mountainContainer.innerHTML = `
    <div class="parkCard">                               
       <p>Mountain Name: ${mountain.name}</p> 
       <p>Description: ${mountain.desc}</p>
       <p>Elevation: ${mountain.elevation}</p>
       <p>Sunrise Time(UTC): ${sunsetData.results.sunrise}</p>
       <p>Sunset Time(UTC): ${sunsetData.results.sunset}</p>
       <img src= 'images/${mountain.img}' alt="mountain" />
    </div>
  `;
  }
  async function getSunsetForMountain(lat, lng) {
    let response = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
    );
    let data = await response.json();
    return data;
  }
};
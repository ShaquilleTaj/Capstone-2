window.onload = function () {
    initializeDropdown("location", locationsArray);
    initializeDropdown("parkType", parkTypesArray);

    document.getElementById("nextBtn").addEventListener("click", onNextBtnClicked);
    document.getElementById("resetBtn").addEventListener("click", clearForm);
    document.getElementById("selectLocationBtn").addEventListener("click", onSelectLocationBtnClicked);
    document.getElementById("selectParkTypeBtn").addEventListener("click", onSelectParkTypeBtnClicked);
    document.getElementById("allBtn").addEventListener("click", onAllBtnClicked);
};

function initializeDropdown(id, dataArray) {
    let dropdownMenu = document.getElementById(id);
    dataArray.forEach(function (item) {
        let option = document.createElement("option");
        option.text = item;
        dropdownMenu.add(option);
    });
}

function onNextBtnClicked() {
    let locationSection = document.getElementById("locationSection");
    let parkTypeSection = document.getElementById("parkTypeSection");
    if (locRad.checked) {
        locationSection.style.display = "block";
        parkTypeSection.style.display = "none";
    } else if (parkRad.checked) {
        parkTypeSection.style.display = "block";
        locationSection.style.display = "none";
    } else {
        alert("Please select way of search.");
    }
}

function onAllBtnClicked() {
    displayResults("resultForAllSection", nationalParksArray);
}

function displayResults(sectionId, dataArray) {
    let resultSection = document.getElementById(sectionId);
    resultSection.style.display = "block";

    let resultText = "";
    dataArray.forEach(function (nationalPark) {
        resultText += `<b> Location Name: </b>${nationalPark.LocationName} <br>
            <b> Location ID: </b>${nationalPark.LocationID} <br>
            <b> Address: </b>${nationalPark.Address} ${nationalPark.City} ${nationalPark.State} ${nationalPark.ZipCode} | Phone: ${nationalPark.Phone} Fax: ${nationalPark.Fax} <br>`;
        if (nationalPark.Visit) {
            resultText += `<b> Visit: </b> <a href="${nationalPark.Visit}" target="_blank">${nationalPark.Visit}</a> <br>`;
        }
        resultText += `<br>`;
    });

    document.getElementById("parkResult2").innerHTML = resultText;
}

function clearForm() {
    let locRad = document.getElementById("locRad");
    let parkRad = document.getElementById("parkRad");
    document.getElementById("locationSection").style.display = "none";
    document.getElementById("parkTypeSection").style.display = "none";
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("resultForAllSection").style.display = "none";
    locRad.checked = false;
    parkRad.checked = false;
}

function onSelectLocationBtnClicked() {
    let locationSelected = document.getElementById('location');
    let selectedValue = locationSelected.value;
    filterAndDisplayResults("resultSection", nationalParksArray, "State", selectedValue);
    locationSelected.selectedIndex = 0;
}

function onSelectParkTypeBtnClicked() {
    let parkTypeDropdown = document.getElementById('parkType');
    let selectedValue = parkTypeDropdown.value;
    filterAndDisplayResults("resultSection", nationalParksArray, "LocationName", selectedValue);
    parkTypeDropdown.selectedIndex = 0;
}

function filterAndDisplayResults(sectionId, dataArray, property, value) {
    let resultSection = document.getElementById(sectionId);
    resultSection.style.display = "block";

    let resultText = "";
    dataArray.forEach(function (nationalPark) {
        if (nationalPark[property] === value || nationalPark[property].includes(value)) {
            resultText += `<b> Location Name: </b>${nationalPark.LocationName} <br>
                <b> Location ID: </b>${nationalPark.LocationID} <br>
                <b> Address: </b>${nationalPark.Address} ${nationalPark.City} ${nationalPark.State} ${nationalPark.ZipCode} | Phone: ${nationalPark.Phone} Fax: ${nationalPark.Fax} <br>`;
            if (nationalPark.Visit) {
                resultText += `<b> Visit: </b> <a href="${nationalPark.Visit}" target="_blank">${nationalPark.Visit}</a> <br>`;
            }
            resultText += `<br>`;
        }
    });

    document.getElementById("parkResult").innerHTML = resultText;
}
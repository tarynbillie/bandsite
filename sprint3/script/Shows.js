// empty array. Showsinfo = fetched data
showsInformation = [];
// create URL to make more mallleable, if full URL is in multiple places, change the conts instead of every location URL stated
const api_key = "b79de315-3d7e-4254-80fc-00bdcb995755";
const baseUrl = "https://project-1-api.herokuapp.com";
const queryString = '?api_key=' + api_key;

const showsPromise = fetch(baseUrl + '/showdates' + queryString);

// GETting the shows array from API
showsPromise.then((showsResponse) => {
    return showsResponse.json();
})
.then(function(showData) {
    console.log(showData);
    showsInformation = showData;
    displayShows(showData);

});
let badRequest = fetch(baseUrl + '/showdates' + queryString);
badRequest.then((response) => {
    
}, (err) => {
    console.err('Error Caught!');
});


// params order: date, place, location
function displayShows(showsInformation) {
    for (let i = 0; i < showsInformation.length; i++) {
        dateRow(showsInformation[i].date, showsInformation[i].place, showsInformation[i].location);
    }
}
// Create a function with key paramters...(ended up being giant, refine later)
function dateRow(date, place, location) {

    let newCell = document.createElement("TR");
    let firstRow = document.getElementById("showdates-info");
    firstRow.appendChild(newCell);

    let firstTd = document.createElement("TD");
    newCell.appendChild(firstTd);

    let firstLine = document.createElement("DIV");
    firstLine.setAttribute('class', 'first-div');
    let firstHead = document.createElement("H3");
    firstTd.appendChild(firstLine);
    firstLine.appendChild(firstHead);
    firstHead.innerHTML = date;

    let secondLine = document.createElement("P");
    firstLine.appendChild(secondLine);
    secondLine.innerHTML = place;
    
    let secondTd = document.createElement('TD');
    newCell.appendChild(secondTd);
    secondTd.innerHTML = location;
    
    let thirdTd = document.createElement('TD');
    thirdTd.setAttribute('class', 'third-td');
    let rightButton = document.createElement('button');
    rightButton.setAttribute('class', 'shows-button')
    rightButton.innerHTML = "GET TICKETS";
    newCell.appendChild(thirdTd);
    thirdTd.appendChild(rightButton);


}

// When the user scrolls down 20px from the top of the document, show the button
// applying an even tlistener 
document.getElementById('scroll-button').addEventListener('click', function() {
    toTop();
});

window.onscroll = function () { 
    scrolling();
};

function scrolling() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("scroll-button").style.display = "block";
    } else {
        document.getElementById("scroll-button").style.display = "none";
    }
}

// When you click the button, scroll to the top of the document
function toTop() {
    document.body.scrollTop = 0; // for safari lol
    document.documentElement.scrollTop = 0; // for chrome, firefox, IE
}
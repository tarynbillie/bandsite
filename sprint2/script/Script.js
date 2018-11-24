// array methods sort

var commentInput = [
    {
        name: "Jill Saunders",
        comment: "Masters of their instruments and on time with each other all the time, perfect what a pleasure. ",
        // 10 months ago converted in milliseconds since unix epoch time - Wed, Dec 31, 1969 @ 19:00:00 GMT-0500 - but all relative soo?
        // 1513141200000
        time: "10 months ago"
    },
    {
        name: "Edward Anthony",
        comment: "These guys are beyond great. The opening melody was incredible and had to be very difficult. The #1 band I regret not seeing LIVE.",
        // 1531886400000
        time: "3 months ago"
    },
    {
        name: "Corey Kohan",
        comment: "Its just amazing all the sounds that come out of this band. Neil is just an animal on the drum kit and Geddy and Alex are just as good on their instruments.",
        // 1534564800000
        time: "2 months ago"
    },
    {
        name: "Jack Deng",
        comment: "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.",
        // 1537243200000
        time: "1 month ago"
    }
];
// showing comments from array to the DOM
function makeParagraph(comment) {
    // creating a new p element "secretly put in div"
    let newParagraph = document.createElement("P");
    // giving it the comment content
    let getComment = document.createTextNode(comment);
    // now adding that content into the new p element
    newParagraph.appendChild(getComment);
    // adding the new created element P AND the conent into the DOM specifically where I want it to appear
    let currentDiv = document.getElementById('comment-result');
    currentDiv.appendChild(newParagraph);
}
// showing user names from array to the DOM
function makeHeader(name) {
    let newHeader = document.createElement("H3");
    let getName = document.createTextNode(name);
    newHeader.appendChild(getName);
    // append the names inside the same div or else the names will be seperated in their own div
    let secondDiv = document.getElementById('comment-result');
    secondDiv.appendChild(newHeader);
}

function makeDivider() {
    let newDiv = document.createElement("DIV");
    let thirdDiv = document.getElementById('comment-result');
    // creating a div inside comment-result
    thirdDiv.appendChild(newDiv);
}

// Retrieving the time in milliseconds from array and putting it in it's own span?
function makeTime(time) {
    let newSpan = document.createElement("H4");
    let getTime = document.createTextNode(time);
    newSpan.appendChild(getTime);
    let fourthDiv = document.getElementById('comment-result');
    fourthDiv.appendChild(newSpan);
}

// displaying new time in preferred format
function formatDate(date) {
    let monthNames = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sept", "Oct", "Nov", "Dec"
    ];
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return monthNames[monthIndex] + " " + day + "," + " " + year;
}

// displayComment() that takes in one comment object as a parameter 
// and displays it on the page using JavaScript DOM manipulation
// & backwards loop, in order to display last comment made first
function displayComments(commentInput) {
    for (let i = commentInput.length - 1; i >= 0; i--) {
        // call functions previous made
        makeHeader(commentInput[i].name);
        makeTime(commentInput[i].time);
        makeParagraph(commentInput[i].comment);
        // Inserting a line between the comments by calling the function made above
        makeDivider();
    }
}
displayComments(commentInput);


//grab form
let formPrevent = document.getElementById("comment-form");
// WHEN SOMEONE PRESSES THE BUTTON THIS IS WHAT HAPPENS
formPrevent.addEventListener("submit", (event) => {
    // preventing the default refresher
    event.preventDefault();

    let getComment = document.getElementById('comment-input').value;
    let getName = document.getElementById('user-input').value;
    // getting current date on submit with preferred format
    let getTime = formatDate(new Date());
    // pushing new name and comment inputs by calling object keys
    commentInput.push({ name: getName, comment: getComment, time: getTime});

    // clearing comments
    document.getElementById('comment-result').innerHTML = "";
    // clearing text area
    document.getElementById('comment-input').value = "";
    //push the names and comments back into the 
    displayComments(commentInput);

});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("scroll-button").style.display = "block";
    } else {
        document.getElementById("scroll-button").style.display = "none";
    }
}

// When you click the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // for safari lol
    document.documentElement.scrollTop = 0; // for chrome, firefox, IE
}
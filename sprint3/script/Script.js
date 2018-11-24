// calling the array that will be created after post?
let commentInput = [];



const api_key = "b79de315-3d7e-4254-80fc-00bdcb99575";
const baseUrl = "https://project-1-api.herokuapp.com";
const queryString = '?api_key=' + api_key;

const commentsPromise = fetch(baseUrl + '/comments' + queryString);

// GETting the comments from the API
commentsPromise.then((commentResponse) => {
    return commentResponse.json();
})
    .then(function (getData) {
        // printing the array into console
        console.log(getData);
        commentInput = getData;
        // call display comments function and pass on the json data 
        displayComments(getData);
    });

let badRequest = fetch(baseUrl + '/comments' + queryString);
badRequest.then((response) => {
    
}, (err) => {
    console.err('Error Caught!');
});

function makeHeader(name) {
    let newHeader = document.createElement('H3');
    let getName = document.createTextNode(name);
    newHeader.appendChild(getName);
    // append the names inside the same div or else the names will be seperated in their own div
    let secondDiv = document.getElementById('comment-result');
    secondDiv.appendChild(newHeader);
}

// showing comments from array to the DOM
function makeParagraph(comment) {
    // creating a new p element "secretly put in div"
    let newParagraph = document.createElement('P');
    // giving it the comment content
    let getComment = document.createTextNode(comment);
    // now adding that content into the new p element
    newParagraph.appendChild(getComment);
    // adding the new created element P AND the conent into the DOM specifically where I want it to appear
    let currentDiv = document.getElementById('comment-result');
    currentDiv.appendChild(newParagraph);
}

// Thumbs-up SVG
function thumbsUp() {
    let sixthDiv = document.getElementById('comment-result');
    let thumb = document.createElement('i');
    thumb.setAttribute('class', 'fa fa-thumbs-up');
    sixthDiv.appendChild(thumb);
}

function makeDivider() {
    let newDiv = document.createElement('DIV');
    let thirdDiv = document.getElementById('comment-result');
    // creating a div inside comment-result
    thirdDiv.appendChild(newDiv);
}

// Retrieving the time in milliseconds from array and putting it in it's own span?
function makeTime(timestamp) {
    let newSpan = document.createElement('H4');
    let getTime = document.createTextNode(timestamp);
    newSpan.appendChild(getTime);
    let fourthDiv = document.getElementById('comment-result');
    fourthDiv.appendChild(newSpan);
}

function likeCount(likes) {
    let newIcon = document.createElement('P');
    newIcon.setAttribute('id', 'like-count');
    let getLike = document.createTextNode(likes);
    newIcon.appendChild(getLike);
    let fifthDiv = document.getElementById('comment-result');
    fifthDiv.appendChild(newIcon);
    
}



// displayComment() that takes in one comment object as a parameter 
// and displays it on the page using JavaScript DOM manipulation
// & backwards loop, in order to display last comment made first
function displayComments(commentInput) {
    for (let i = commentInput.length - 1; i >= 0; i--) {
        // call functions previous made
        makeHeader(commentInput[i].name);
        makeTime(commentInput[i].timestamp);
        makeParagraph(commentInput[i].comment);
        likeCount(commentInput[i].likes);
        // Inserting a line between the comments by calling the function made above
        makeDivider();
        thumbsUp();
    }
}



//grab form
let formPrevent = document.getElementById("comment-form");
// WHEN SOMEONE PRESSES THE BUTTON THIS IS WHAT HAPPENS
formPrevent.addEventListener("submit", (event) => {
    // preventing the default refresher
    event.preventDefault();
    
    let getComment = document.getElementById('comment-input').value;
    let getName = document.getElementById('user-input').value;
    // dont need get time because the API does that for you 
    
    // clearing comments
    document.getElementById('comment-result').innerHTML = "";
    // clearing text area
    document.getElementById('comment-input').value = "";
    
    const init = {
        // take js object and convert into string because API's only take in strings
        body: JSON.stringify({ name: getName, comment: getComment }),
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        }
    };
    let postRequest = fetch(baseUrl + '/comments' + queryString, init);
    // when it comes back log the response to I can check whether it was successful
    postRequest.then((response) => {
        console.log(response.status);
        return response.json();
    }).then((postData) => {
        console.log(postData);
        return fetch(baseUrl + '/comments' + queryString);
    }).then((response) => {
        // comment data response
        return response.json();
    }).then((getData) => {
        // displaying the data
        displayComments(getData);
    });
});



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

// To do in the future------------------------------------------------------------------------------
// displaying new time in preferred format IF TIME --------------
// function formatDate(date) {
    //     let monthNames = [
        //         "Jan", "Feb", "Mar", "Apr",
        //         "May", "Jun", "Jul", "Aug",
        //         "Sept", "Oct", "Nov", "Dec"
        //     ];
        //     let day = date.getDate();
        //     let monthIndex = date.getMonth();
        //     let year = date.getFullYear();
        
        //     return monthNames[monthIndex] + " " + day + "," + " " + year;
        // }
        
        
// IMPLEMENT A ON CLICK EVENT LISTENER FOR WHEN THEY CLICK LIKE IT GOES UP
// IMPLEMENT SVG TO TAKE THAT ON CLICK
            
// Deleting comments by their specific ID:
// function deleteComment(id, baseUrl) {
//     return fetch(baseUrl + '/comment' + id + queryString , {
//         method : "DELETE"
//     }).then(response => response.json());
// }
                    
// deleteComment();
//global variable that will be main data
var applicationData;
var dvHarmonyResults = document.querySelector("#harmonyResults");
var dvHarmonyResults1 = document.querySelector("#harmonyResults1");

//find file
//can't do anything until data is loaded
fetch("data/colors.json")
    //first callback translates the response, anonymous function that turns response into json object
    .then((response) => { return response.json() })
    //second callback we can do something with
    .then((jsonData) => {
        //store the application data longterm
        //put in something outside of scope and will exist for long, long time
        applicationData = jsonData;
        console.log(applicationData);

        init();
    })

    //sets up application
    //init function is usually first function called in app
function init() {

    //use this if want to display info right away and move placeColors function outside of onNavClicked
    // placeColors(applicationData.colorharmony);

    //use querySelectorAll and forEach loop to listen for click then filter
    var colorOptions = document.querySelectorAll(".colorOption");
    colorOptions.forEach((option) => {
        option.addEventListener("click", onNavClicked);
    })
}

//event is thing clicked on...
//this will run once a colorOption is clicked
function onNavClicked(event) {

    //this removes the other harmonyOption divs once a different colorOption is clicked
    dvHarmonyResults.innerHTML = "";

    //this will retrieve the attribute we defined in html
    //get the primary colors to filter
    let filterType = event.target.getAttribute("filterType");

    // console.log(filterType);
    //create a new array with only the associate type in it
    //similar to forEach or map... filter() is built in array function
    //execute function on each element
    let filteredList = applicationData.colorharmony.filter((primary) => {
        
        //if just return false then nothing in array
        //it will copy over one of primary color to a new array if return true
        //how work with filtering - no query, excecute function per onject in array
        // return true;

        //return true when have shirt in data
        return primary.primaryColor == filterType;
    });

    // console.log(filteredList);
    //need to show only those items
    //one problem is it will keep appending so empty innerHTML at start of placeColors
    // placeColors(filteredList);

    //place elements on the page
    //index is numerical order of items
    filteredList.forEach((object, index) => {
        //loops through forEach
        // console.log(object);

        //make a new div page
        let newDiv = document.createElement("div");

        //add a class
        newDiv.classList.add("harmonyOption");

        //set custom attribute
        //why is this object.type and not colorHarmoniesjson.type?
        //cause each of the objects within colorharmony are selected
        newDiv.setAttribute("type", object.type);

        //set background color with hex code
        // newDiv.setAttribute("style", "background-color: " + object.hex1);
        newDiv.setAttribute("style", "background-color: #C6BDBD");

        //add content into div
        newDiv.innerHTML = "Would you like " + object.type + "?";

        // document.body.appendChild(newDiv);
        //change this from document when add querySelector at top for #clothes
        dvHarmonyResults.appendChild(newDiv);

        //another way of animating
        //from 0 to full in 1 second
        TweenMax.from(newDiv, 1, { opacity: 0, delay: index * .3});
    })

    //use querySelectorAll and forEach loop to listen for click then filter
    var harmonyOptions = document.querySelectorAll(".harmonyOption");
    harmonyOptions.forEach((option) => {
        option.addEventListener("click", onNavClicked2);
    })
}

//this will run once a harmonyOption is clicked
//code is similar to first onNavClicked function
function onNavClicked2(event) {

    dvHarmonyResults1.innerHTML = "";

    let filterType = event.target.getAttribute("type");

    let filteredList = applicationData.colorharmony.filter((harmonyType) => {

        return harmonyType.type == filterType;
    });

    filteredList.forEach((object, index) => {
        let newDiv1 = document.createElement("div");
        newDiv1.classList.add("harmonyOption2");
        newDiv1.setAttribute("style", "background-color: " + object.hex1);
        newDiv1.innerHTML = "<h4>" + object.hex1 + "</h4>";

        dvHarmonyResults1.appendChild(newDiv1);

        //this creates another div so we can add the second hex color
        let newDiv2 = document.createElement("div");
        newDiv2.classList.add("harmonyOption2");
        newDiv2.setAttribute("style", "background-color: " + object.hex2);
        newDiv2.innerHTML = "<h4>" + object.hex2 + "</h4>";

        dvHarmonyResults1.appendChild(newDiv2);

        //this creates another div so we can add the third hex color
        let newDiv3 = document.createElement("div");
        newDiv3.classList.add("harmonyOption2");
        newDiv3.setAttribute("style", "background-color: " + object.hex3);
        newDiv3.innerHTML = "<h4>" + object.hex3 + "</h4>";
        

        dvHarmonyResults1.appendChild(newDiv3);

        TweenMax.from(newDiv1, 1, { opacity: 0});
        TweenMax.from(newDiv2, 1, { opacity: 0});
        TweenMax.from(newDiv3, 1, { opacity: 0});
    })

}
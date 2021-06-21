var currentID = 1; //used in addElementToTicker function

const COOKIE_EXDAYS = 1;
const cookies = ["csport", "cspell", "cmuggle", "cpolitic", "chogwarts", "cauror",
                 "csport-modal", "cspell-modal", "cmuggle-modal", "cpolitic-modal", "chogwarts-modal", "cauror-modal",
                 "ckimmkorn", "clockhart", "cgranger", "cscamander", "cministry",
                 "cshort", "cmedium", "clong",
                 "clondon", "chogwartsLoc", "cuk", "cusa", "ceu", "casia", "cnorthpole"];

const buttonIDs = ["sportBtn", "spellBtn", "muggleBtn", "politicBtn", "hogwartsBtn", "aurorBtn",
                   "sportBtn-modal", "spellBtn-modal", "muggleBtn-modal", "politicBtn-modal", "hogwartsBtn-modal", "aurorBtn-modal",
                   "kimmkornBtn", "lockhartBtn", "grangerBtn", "scamanderBtn", "ministryBtn",
                   "shortBtn", "mediumBtn", "longBtn",
                   "londonBtn", "hogwartsLocBtn", "ukBtn", "usaBtn", "euBtn", "asiaBtn", "northpoleBtn"];

const headlineClasses = ["sportNews", "spellNews", "muggleNews", "politicNews", "hogwartsNews", "aurorNews",
                         "sportNews", "spellNews", "muggleNews", "politicNews", "hogwartsNews", "aurorNews", //two times because topic buttons exist twice
                         "kimmkorn", "lockhart", "granger", "scamander", "ministry",
                         "short", "medium", "long",
                         "london", "hogwartsLoc", "uk", "usa", "eu", "asia", "northpole"];
                        

// some example headlines
var headline1 = {title:" Firebolt now deals 3d10 damage!", link:"#", topic:"spellNews", author:"kimmkorn", artLength:"short", location:"london"};
var headline2 = {title:" Tasha's Mind Whip", link:"#", topic:"spellNews", author:"kimmkorn", artLength:"short", location:"london"};
var headline3 = {title:" Mass Healing Word invented.", link:"#", topic:"spellNews", author:"kimmkorn", artLength:"short", location:"london"};

var headline4 = {title:" Broken arms are the most common injury.", link:"#", topic:"sportNews", author:"kimmkorn", artLength:"short", location:"london"};
var headline5 = {title:" Top 5 Plays of the World Cup.", link:"#", topic:"sportNews", author:"lockhart", artLength:"medium", location:"london"};
var headline6 = {title:" Broom flies without wizard!", link:"#", topic:"sportNews", author:"lockhart", artLength:"medium", location:"london"};

var headline7 = {title:" Study shows: Muggles like Spongebob Squarepants.", link:"#", topic:"muggleNews", author:"lockhart", artLength:"medium", location:"london"};
var headline8 = {title:" Trump banned from Twitter.", link:"#", topic:"muggleNews", author:"lockhart", artLength:"long", location:"london"};

var headline9 = {title:" Hedwig for president!!!", link:"#", topic:"politicNews", author:"lockhart", artLength:"long", location:"london"};

var headline10 = {title:" Explosion in Hufflepuff dorm", link:"#", topic:"hogwartsNews", author:"lockhart", artLength:"long", location:"london"};

var headline11 = {title:" \"Aurors are underpayed\" says Harry Potter", link:"#", topic:"aurorNews", author:"lockhart", artLength:"long", location:"london"};

// array with all headlines
var headlines = [headline1, headline2, headline3, headline4, headline5, headline6, headline7, headline8,
                 headline9, headline10, headline11];

// functions for cookie management
function setCookie(cname, cvalue, exdays) {
    var date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ date.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var carray = decodedCookie.split(';');
    for(var i = 0; i <carray.length; i++) {
      var c = carray[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkCookies() {

    //create cookies if they don't exist yet
    if(document.cookie == "") {
        console.log("no cookies are set");

        for(var i = 0; i < cookies.length; i++) {
            setCookie(cookies[i], "on", COOKIE_EXDAYS);
        }
    }
    console.log(document.cookie);
}

function toggleCookie(cname) {
    if(getCookie(cname) == "on") {
        setCookie(cname, "off", COOKIE_EXDAYS);
    }
    else {
        setCookie(cname, "on", COOKIE_EXDAYS);
    }
}

function deleteCookies() {
    document.cookie = "csport=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cspell=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cmuggle=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cpolitic=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "chogwarts=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cauror=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = "csport-modal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cspell-modal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cmuggle-modal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cpolitic-modal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "chogwarts-modal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cauror-modal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = "ckimmkorn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "clockhart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cgranger=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cscamander=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cministry=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cshort=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cmedium=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "clong=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = "clondon=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "chogwartsLoc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cuk=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cusa=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "ceu=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cnorthpole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = "undefined=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Initialize News Ticker with all headlines
function addAllNewsToTicker() {
    
    var elementToAdd;
    
    for (i = 0; i < headlines.length; i++){
        elementToAdd = "<a id=" + currentID + " " + "class=" + headlines[i].topic  + " " + "href=" + headlines[i].link + ">" + headlines[i].title + " </a>";

        $("#ticker_marquee").append(elementToAdd);

        var IDString = "#" + currentID;
        $(IDString).addClass(headlines[i].author);
        $(IDString).addClass(headlines[i].artLength);
        $(IDString).addClass(headlines[i].location);
        currentID++;

        $("#ticker_marquee").append($("<span>", { class: "dot"}));
    }
    
    refreshTicker();
}

// get called right after page finished loading
function setFilter() {
    
    checkCookies();
    //deleteCookies();

    for (i = 0; i < cookies.length; i++) {
        mapButtonToCookie(buttonIDs[i], headlineClasses[i], cookies[i]);     // also toggles the cookie
    }
}

// Filter Buttons
function toggleButtonAndCookie(id, headlineClass, cname) {
    
    if (getCookie(cname) == "on") {
        toggleCookie(cname);   // must be called before "removeElementsFromTicker"
        document.getElementById(id).setAttribute("class", "btn btn-dark");
        removeElementsFromTicker(headlineClass);
    }
    else {
        toggleCookie(cname);
        document.getElementById(id).setAttribute("class", "btn btn-info");
        addElementsToTicker(headlineClass);
    }
    refreshTicker();
}

function toggleModalButtonAndCookie(id, id2, headlineClass, cname, cname2) {
    
    if (getCookie(cname) == "on") {
        toggleCookie(cname);   // must be called before "removeElementsFromTicker"
        toggleCookie(cname2);
        document.getElementById(id).setAttribute("class", "btn btn-dark");
        document.getElementById(id2).setAttribute("class", "btn btn-dark");
        removeElementsFromTicker(headlineClass);
    }
    else {
        toggleCookie(cname);
        toggleCookie(cname2);
        document.getElementById(id).setAttribute("class", "btn btn-info");
        document.getElementById(id2).setAttribute("class", "btn btn-info");
        addElementsToTicker(headlineClass);
    }
    refreshTicker();
}

function mapButtonToCookie(id, headlineClass, cname) {
    
    if (getCookie(cname) == "off") {
        document.getElementById(id).setAttribute("class", "btn btn-dark");
        removeElementsFromTicker(headlineClass);
    }
    refreshTicker();
}

// add and remove elements to/from the ticker
function addElementsToTicker(headlineClass) {
    
    var elementToAdd;
    
    for (i = 0; i < headlines.length; i++){
        if (headlines[i].topic == headlineClass || headlines[i].author == headlineClass || headlines[i].artLength == headlineClass || headlines[i].location == headlineClass) {
            elementToAdd = "<a id=" + currentID + " " + "class=" + headlines[i].topic  + " " + "href=" + headlines[i].link + ">" + headlines[i].title + " </a>";

        $("#ticker_marquee").append(elementToAdd);

        var IDString = "#" + currentID;
        $(IDString).addClass(headlines[i].author);
        $(IDString).addClass(headlines[i].artLength);
        $(IDString).addClass(headlines[i].location);
        currentID++;

        $("#ticker_marquee").append($("<span>", { class: "dot"}));
        }
    }
}

function removeElementsFromTicker(classToRemove) {
    
    classToRemove = " ." + classToRemove;
    $(classToRemove).remove();
    
    // delete all dots that were between removed headlines
    updateDots();
}

function updateDots() {
    $(".dot").remove();
    
    var dotHTML = "<span class='dot'></span>";
    
    if(getCookie("csport") == "on") {
        $(".sportNews").after(dotHTML);
    }
    if(getCookie("cspell") == "on") {
        $(".spellNews").after(dotHTML);
    }
    if(getCookie("cmuggle") == "on") {
        $(".muggleNews").after(dotHTML);
    }
    if(getCookie("cpolitic") == "on") {
        $(".politicNews").after(dotHTML);
    }
    if(getCookie("chogwarts") == "on") {
        $(".hogwartsNews").after(dotHTML);
    }
    if(getCookie("cauror") == "on") {
        $(".aurorNews").after(dotHTML);
    }
}

// Slider
$( function() {
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 30,
        values: [ 0, 20 ],
        slide: function( event, ui ) {
            $( "#sliderAmount" ).val( + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#sliderAmount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
    " - " + $( "#slider-range" ).slider( "values", 1 ) );
} );

// function for forwards and backwards buttons of the ticker
function forwardTicker() {
    document.getElementById("ticker_marquee").setAttribute('scrollamount', 13);
}

function reverseTicker() {
    document.getElementById("ticker_marquee").setAttribute('scrollamount', 13);
    document.getElementById("ticker_marquee").setAttribute('direction', 'right');
}

function resetTicker() {
    document.getElementById("ticker_marquee").setAttribute('scrollamount', 3);
    document.getElementById("ticker_marquee").setAttribute('direction', 'left');
}

function refreshTicker() {
    document.getElementById("ticker_marquee").setAttribute('direction', 'right');
    document.getElementById("ticker_marquee").setAttribute('direction', 'left');
}
const COOKIE_EXDAYS = 1;

// some example headlines
var headline1 = {title:" Firebolt now deals 3d10 damage!", link:"#", section:"spellNews"};
var headline2 = {title:" Tasha's Mind Whip", link:"#", section:"spellNews"};
var headline3 = {title:" Mass Healing Word invented.", link:"#", section:"spellNews"};

var headline4 = {title:" Broken arms are the most common injury.", link:"#", section:"sportNews"};
var headline5 = {title:" Top 5 Plays of the World Cup.", link:"#", section:"sportNews"};
var headline6 = {title:" Broom flies without wizard!", link:"#", section:"sportNews"};

var headline7 = {title:" Study shows: Muggles like Spongebob Squarepants.", link:"#", section:"muggleNews"};
var headline8 = {title:" Trump banned from Twitter.", link:"#", section:"muggleNews"};

var headline9 = {title:" Hedwig for president!!!", link:"#", section:"politicNews"};

var headline10 = {title:" Explosion in Hufflepuff dorm", link:"#", section:"hogwartsNews"};

var headline11 = {title:" \"Aurors are underpayed\" says Harry Potter", link:"#", section:"aurorNews"};

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
        setCookie("csport", "on", COOKIE_EXDAYS);
        setCookie("cspell", "on", COOKIE_EXDAYS);
        setCookie("cmuggle", "on", COOKIE_EXDAYS);
        setCookie("cpolitic", "on", COOKIE_EXDAYS);
        setCookie("chogwarts", "on", COOKIE_EXDAYS);
        setCookie("cauror", "on", COOKIE_EXDAYS);
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
    document.cookie = "undefined=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// get called right after page finished loading
function setFilter() {
    
    checkCookies();
    //deleteCookies();

    var cookies = ["csport", "cspell", "cmuggle", "cpolitic", "chogwarts", "cauror"];
    var buttonIDs = ["sportFilter", "spellFilter", "muggleFilter", "politicFilter", "hogwartsFilter", "aurorFilter"];
    var sections = ["sportNews", "spellNews", "muggleNews", "politicNews", "hogwartsNews", "aurorNews"];

    for (i = 0; i < cookies.length; i++) {
        mapButtonToCookie(buttonIDs[i], sections[i], cookies[i]);     // also toggles the cookie
    }
}

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

// Initialize News Ticker with all headlines
function addAllNewsToTicker() {
    var elementToAdd;

    for (i = 0; i < headlines.length; i++){
        elementToAdd = "<a class=" + headlines[i].section + " " + "href=" + headlines[i].link + ">" + headlines[i].title + " </a>";
        $("#ticker_marquee").append(elementToAdd);

        $("#ticker_marquee").append($("<span>", { class: "dot"}));
    }

    refreshTicker();
}

// Filter Buttons
function toggleButtonAndCookie(id, section, cname) {

    if (getCookie(cname) == "on") {
        toggleCookie(cname);   // must be called before "removeElementsFromTicker"
        document.getElementById(id).setAttribute("class", "btn btn-dark");
        removeElementsFromTicker(section);
    }
    else {
        toggleCookie(cname);
        document.getElementById(id).setAttribute("class", "btn btn-info");
        addElementsToTicker(section);
    }
    refreshTicker();
}

function mapButtonToCookie(id, section, cname) {

    if (getCookie(cname) == "off") {
        document.getElementById(id).setAttribute("class", "btn btn-dark");
        removeElementsFromTicker(section);
    }
    refreshTicker();
}

// add and remove elements to/from the ticker
function addElementsToTicker(newsSection) {

    var elementToAdd;

    for (i = 0; i < headlines.length; i++){
        if (headlines[i].section == newsSection) {
            elementToAdd = "<a class=" + headlines[i].section + " " + "href=" + headlines[i].link + ">" + headlines[i].title + " </a>";
            $("#ticker_marquee").append(elementToAdd);

            $("#ticker_marquee").append($("<span>", { class: "dot"}));
        }
    }
}

function removeElementsFromTicker(newsSection) {

    var classToRemove = " ." + newsSection;
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
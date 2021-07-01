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

const headlineClasses = ["sportNews", "spellNews", "muggleNews", "politicNews", "hogwartsNews", "aurorNews", // possible topics
                         "sportNews", "spellNews", "muggleNews", "politicNews", "hogwartsNews", "aurorNews", // two times because topic buttons exist twice
                         "kimmkorn", "lockhart", "granger", "scamander", "ministry",                         // possible authors
                         "short", "medium", "long",                                                          // possible length
                         "london", "hogwartsLoc", "uk", "usa", "eu", "asia", "northpole"];                   // possible locations

var slider_low;
var slider_high;

var anyTopicFilterOn = false;
var anyAuthorFilterOn = false;
var anyLengthFilterOn = false;
var anyLocationFilterOn = false;

// array with all headlines
var headlines = [];

// write all headlines in here (leave one space before title)
function createAllHeadlines() {

    // Format: Title, Link, Topic, Author, Length, Location
    addHeadline(" Firebolt now deals 3d10 damage!", "#", "spellNews", "ministry", "short", "london", "default");
    addHeadline(" Tasha's Mind Whip", "#", "spellNews", "kimmkorn", "short", "asia", "default");
    addHeadline(" Mass Healing Word invented.", "#", "spellNews", "kimmkorn", "short", "eu", "default");

    addHeadline(" Broken arms are the most common injury.", "#", "sportNews", "kimmkorn", "short", "london", "default");
    addHeadline(" Top 5 Plays of the World Cup", "#", "sportNews", "lockhart", "short", "london", "default");

    addHeadline(" Study shows: Muggles like Spongebob Squarepants.", "#", "muggleNews", "ministry", "short", "usa", "default");
    addHeadline(" Trump banned from Twitter.", "#", "muggleNews", "lockhart", "short", "usa", "default");

    addHeadline(" Hedwig for president!!!", "#", "politicNews", "ministry", "short", "hogwartsLoc", "default");

    addHeadline(" Explosion in Hufflepuff dorm", "#", "hogwartsNews", "scamander", "short", "hogwartsLoc", "default");

    addHeadline(" \"Aurors are underpayed\" says Harry Potter", "#", "aurorNews", "granger", "short", "northpole", "default");
}

function addHeadline(HTitle, HLink, HTopic, HAuthor, HArtLength, HLocation, HStatus) {
    var newHeadline = {title: HTitle, link: HLink, topic: HTopic, author: HAuthor, artLength: HArtLength, location: HLocation, status: HStatus};
    headlines.push(newHeadline);
}

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

function toggleCookie(cname) {
    if(getCookie(cname) == "default") {
        setCookie(cname, "on", COOKIE_EXDAYS);
    }
    else if(getCookie(cname) == "on") {
        setCookie(cname, "off", COOKIE_EXDAYS);
    }
    else {
        setCookie(cname, "default", COOKIE_EXDAYS);
    }
}

// First thing when Side opens
function checkCookies() {

    //create cookies if they don't exist yet
    if(document.cookie == "") {
        console.log("no cookies are set");

        for(var i = 0; i < cookies.length; i++) {
            setCookie(cookies[i], "default", COOKIE_EXDAYS);
        }
        setCookie("cslider_low", "0", COOKIE_EXDAYS);
        setCookie("cslider_high", "15", COOKIE_EXDAYS);
    }

    slider_low = getCookie("cslider_low");
    slider_high = getCookie("cslider_high");
}

// Initialize News Ticker with all headlines
function addAllNewsToTicker() {

    createAllHeadlines();
    
    var elementToAdd;
    
    for (i = 0; i < headlines.length; i++){
        elementToAdd = "<a id=" + currentID + " " + "class=" + headlines[i].topic  + " " + "href=" + headlines[i].link + ">" + headlines[i].title + " </a>";

        $("#ticker_marquee").append(elementToAdd);

        var IDString = "#" + currentID;
        $(IDString).addClass(headlines[i].author);
        $(IDString).addClass(headlines[i].artLength);
        $(IDString).addClass(headlines[i].location);
        $(IDString).addClass("headline");
        currentID++;

        $("#ticker_marquee").append($("<span>", { class: "dot"}));
    }
    
    refreshTicker();
}

// get called right after page finished loading
function setFilter() {

    for (i = 0; i < cookies.length; i++) {
        mapButtonToCookie(buttonIDs[i], cookies[i]);     // also toggles the cookie
    }
    updateStatusVars();
    applyNewFilter();
    console.log(document.cookie);
}

function mapButtonToCookie(id, cname) {
    
    if (getCookie(cname) == "off") {

        var currentClass = document.getElementById(id).getAttribute('class');
        var classes = currentClass.split(" ");
        
        if(classes.length == 3) {
            var newClass = classes[0] + " " + classes[1] + " filter-off";
            document.getElementById(id).setAttribute("class", newClass);
        }
        else {
            document.getElementById(id).setAttribute("class", "btn btn-danger");
        }
    }

    if (getCookie(cname) == "on") {

        var currentClass = document.getElementById(id).getAttribute('class');
        var classes = currentClass.split(" ");
        
        if(classes.length == 3) {
            var newClass = classes[0] + " " + classes[1] + " filter-on";
            document.getElementById(id).setAttribute("class", newClass);
        }
        else {
            document.getElementById(id).setAttribute("class", "btn btn-success");
        }
    }
}

function updateStatusVars() {
    for (i = 0; i <= 5; i++) {
        if (getCookie(cookies[i]) == "on") {
            anyTopicFilterOn = true;
            break;
        }
        anyTopicFilterOn = false;
    }
    for (i = 12; i <= 16; i++) {
        if (getCookie(cookies[i]) == "on") {
            anyAuthorFilterOn = true;
            break;
        }
        anyAuthorFilterOn = false;
    }
    for (i = 17; i <= 19; i++) {
        if (getCookie(cookies[i]) == "on") {
            anyLengthFilterOn = true;
            break;
        }
        anyLengthFilterOn = false;
    }
    for (i = 20; i <= 26; i++) {
        if (getCookie(cookies[i]) == "on") {
            anyLocationFilterOn = true;
            break;
        }
        anyLocationFilterOn = false;
    }
}

// Filter Buttons
function toggleButtonAndCookie(id, cname) {
    
    if (getCookie(cname) == "default") {
        toggleCookie(cname);
        document.getElementById(id).setAttribute("class", "btn btn-success");
    }
    else if (getCookie(cname) == "on") {
        toggleCookie(cname);
        document.getElementById(id).setAttribute("class", "btn btn-danger");
    }
    else {
        toggleCookie(cname);
        document.getElementById(id).setAttribute("class", "btn btn-info");
    }
    updateStatusVars();
    applyNewFilter();
    refreshTicker();
}

function toggleModalButtonAndCookie(id, id2, cname, cname2) {
    
    if (getCookie(cname) == "default") {
        toggleCookie(cname);
        toggleCookie(cname2);

        var currentClass = document.getElementById(id).getAttribute('class');
        var classes = currentClass.split(" ");
        newClass = classes[0] + " " + classes[1] + " filter-on";

        document.getElementById(id).setAttribute("class", newClass);
        document.getElementById(id2).setAttribute("class", "btn btn-success");
    }
    else if (getCookie(cname) == "on") {
        toggleCookie(cname); 
        toggleCookie(cname2);

        var currentClass = document.getElementById(id).getAttribute('class');
        var classes = currentClass.split(" ");
        newClass = classes[0] + " " + classes[1] + " filter-off";

        document.getElementById(id).setAttribute("class", newClass);
        document.getElementById(id2).setAttribute("class", "btn btn-danger");
    }
    else {
        toggleCookie(cname);
        toggleCookie(cname2);

        var currentClass = document.getElementById(id).getAttribute('class');
        var classes = currentClass.split(" ");
        newClass = classes[0] + " " + classes[1] + " filter-default";

        document.getElementById(id).setAttribute("class", newClass);
        document.getElementById(id2).setAttribute("class", "btn btn-info");
    }
    updateStatusVars();
    applyNewFilter();
    refreshTicker();
}

function applyNewFilter() {

    removeElementsFromTicker("headline");

    var activeHeadlines = [];
    console.log("anyTopicFilterOn: " + anyTopicFilterOn);

    if (anyTopicFilterOn || anyAuthorFilterOn || anyLengthFilterOn || anyLocationFilterOn) {

        for(i = 0; i < headlines.length; i++) {
            if(anyTopicFilterOn) {
                if(headlines[i].topic == "sportNews") {
                    if(getCookie("csport") != "on") {
                        continue;
                    }
                }
                if(headlines[i].topic == "spellNews") {
                    if(getCookie("cspell") != "on") {
                        continue;
                    }
                }
                if(headlines[i].topic == "muggleNews") {
                    if(getCookie("cmuggle") != "on") {
                        continue;
                    }
                }
                if(headlines[i].topic == "politicNews") {
                    if(getCookie("cpolitic") != "on") {
                        continue;
                    }
                }
                if(headlines[i].topic == "hogwartsNews") {
                    if(getCookie("chogwarts") != "on") {
                        continue;
                    }
                }
                if(headlines[i].topic == "aurorNews") {
                    if(getCookie("cauror") != "on") {
                        continue;
                    }
                }
                
            }
            if(anyAuthorFilterOn) {
                if(headlines[i].author == "kimmkorn") {
                    if(getCookie("ckimmkorn") != "on") {
                        continue;
                    }
                }
                if(headlines[i].author == "lockhart") {
                    if(getCookie("clockhart") != "on") {
                        continue;
                    }
                }
                if(headlines[i].author == "granger") {
                    if(getCookie("cgranger") != "on") {
                        continue;
                    }
                }
                if(headlines[i].author == "scamander") {
                    if(getCookie("cscamander") != "on") {
                        continue;
                    }
                }
                if(headlines[i].author == "ministry") {
                    if(getCookie("cministry") != "on") {
                        continue;
                    }
                }
            }
            if(anyLengthFilterOn) {
                if(headlines[i].length == "short") {
                    if(getCookie("cshort") != "on") {
                        continue;
                    }
                }
                if(headlines[i].length == "medium") {
                    if(getCookie("cmedium") != "on") {
                        continue;
                    }
                }
                if(headlines[i].length == "long") {
                    if(getCookie("clong") != "on") {
                        continue;
                    }
                }
            }
            if(anyLocationFilterOn) {
                if(headlines[i].location == "london") {
                    if(getCookie("clondon") != "on") {
                        continue;
                    }
                }
                if(headlines[i].location == "hogwartsLoc") {
                    if(getCookie("chogwartsLoc") != "on") {
                        continue;
                    }
                }
                if(headlines[i].location == "uk") {
                    if(getCookie("cuk") != "on") {
                        continue;
                    }
                }
                if(headlines[i].location == "usa") {
                    if(getCookie("cusa") != "on") {
                        continue;
                    }
                }
                if(headlines[i].location == "eu") {
                    if(getCookie("ceu") != "on") {
                        continue;
                    }
                }
                if(headlines[i].location == "asia") {
                    if(getCookie("casia") != "on") {
                        continue;
                    }
                }
                if(headlines[i].location == "northpole") {
                    if(getCookie("cnorthpole") != "on") {
                        continue;
                    }
                }
            }
            activeHeadlines.push(headlines[i]);
        }

        addHeadlinesToTicker(activeHeadlines);
    }
    else {
        addHeadlinesToTicker(headlines);
    }

    for(i = 0; i < cookies.length; i++) {
        if(getCookie(cookies[i]) == "off") {
            removeElementsFromTicker(headlineClasses[i]);
        }
    }
}

function addHeadlinesToTicker(activeHeadlines) {
    
    var elementToAdd;
    
    for (i = 0; i < activeHeadlines.length; i++) {
            elementToAdd = "<a id=" + currentID + " " + "class=" + activeHeadlines[i].topic  + " " + "href=" + activeHeadlines[i].link + ">" + activeHeadlines[i].title + " </a>";

        $("#ticker_marquee").append(elementToAdd);

        var IDString = "#" + currentID;
        $(IDString).addClass(activeHeadlines[i].author);
        $(IDString).addClass(activeHeadlines[i].artLength);
        $(IDString).addClass(activeHeadlines[i].location);
        $(IDString).addClass("headline");
        currentID++;

        $("#ticker_marquee").append($("<span>", { class: "dot"}));
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
        values: [ slider_low, slider_high ],
        slide: function( event, ui ) {
            $( "#sliderAmount" ).val( + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            setCookie("cslider_low", ui.values[0]);
            setCookie("cslider_high", ui.values[1]);
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

function reset() {
    deleteCookies();
    location.reload();
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
    document.cookie = "casia=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cnorthpole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = "cslider_low=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cslider_high=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    document.cookie = "undefined=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
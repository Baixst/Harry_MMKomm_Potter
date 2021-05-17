// Booleans for news filter
var sportOn = true;
var spellOn = true;
var muggleOn = true;
var politicOn = true;
var hogwartsOn = true;
var aurorOn = true;

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

// function for forwards and backwards buttons of the ticker
function forwardTicker() {
    document.getElementById("ticker_marquee").setAttribute('scrollamount', 10);
}

function reverseTicker() {
    document.getElementById("ticker_marquee").setAttribute('scrollamount', 10);
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
function toggle_sportNews() {
    if(sportOn) {
        sportOn = !sportOn;     // must be called before "removeElementsFromTicker"
        document.getElementById("sportFilter").setAttribute("class", "btn btn-dark");
        removeElementsFromTicker("sportNews");
    }
    else {
        sportOn = !sportOn;
        document.getElementById("sportFilter").setAttribute("class", "btn btn-info");
        addElementsToTicker("sportNews");
    }

    refreshTicker();
}

function toggle_spellNews() {
    if(spellOn) {
        spellOn = !spellOn;
        document.getElementById("spellFilter").setAttribute("class", "btn btn-dark");
        removeElementsFromTicker("spellNews");
    }
    else {
        spellOn = !spellOn;
        document.getElementById("spellFilter").setAttribute("class", "btn btn-info");
        addElementsToTicker("spellNews");
    }

    refreshTicker();
}

function toggle_muggleNews() {
    if(muggleOn) {
        muggleOn = !muggleOn;
        document.getElementById("muggleFilter").setAttribute("class", "btn btn-dark");
        removeElementsFromTicker("muggleNews");
    }
    else {
        muggleOn = !muggleOn;
        document.getElementById("muggleFilter").setAttribute("class", "btn btn-info");
        addElementsToTicker("muggleNews");
    }

    refreshTicker();
}

function toggle_politicNews() {
    if(politicOn) {
        politicOn = !politicOn;
        document.getElementById("politicFilter").setAttribute("class", "btn btn-dark");
        removeElementsFromTicker("politicNews");
    }
    else {
        politicOn = !politicOn;
        document.getElementById("politicFilter").setAttribute("class", "btn btn-info");
        addElementsToTicker("politicNews");
    }

    refreshTicker();
}

function toggle_hogwartsNews() {
    if(hogwartsOn) {
        hogwartsOn = !hogwartsOn;
        document.getElementById("hogwartsFilter").setAttribute("class", "btn btn-dark");
        removeElementsFromTicker("hogwartsNews");
    }
    else {
        hogwartsOn = !hogwartsOn;
        document.getElementById("hogwartsFilter").setAttribute("class", "btn btn-info");
        addElementsToTicker("hogwartsNews");
    }

    refreshTicker();
}

function toggle_aurorNews() {
    if(aurorOn) {
        aurorOn = !aurorOn;
        document.getElementById("aurorFilter").setAttribute("class", "btn btn-dark");
        removeElementsFromTicker("aurorNews");
    }
    else {
        aurorOn = !aurorOn;
        document.getElementById("aurorFilter").setAttribute("class", "btn btn-info");
        addElementsToTicker("aurorNews");
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

    if(spellOn) {
        $(".spellNews").after(dotHTML);
    }
    if(sportOn) {
        $(".sportNews").after(dotHTML);
    }
    if(muggleOn) {
        $(".muggleNews").after(dotHTML);
    }
    if(politicOn) {
        $(".politicNews").after(dotHTML);
    }
    if(hogwartsOn) {
        $(".hogwartsNews").after(dotHTML);
    }
    if(aurorOn) {
        $(".aurorNews").after(dotHTML);
    }
}
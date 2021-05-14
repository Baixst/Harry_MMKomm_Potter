var sportOn = true;
var spellOn = true;


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


// Filter Buttons
function toggle_sportNews() {
    if(sportOn) {
        document.getElementById("sportFilter").setAttribute("class", "btn btn-dark");
    }
    else {
        document.getElementById("sportFilter").setAttribute("class", "btn btn-info");
    }

    sportOn = !sportOn;
}

function toggle_spellNews() {
    if(spellOn) {
        document.getElementById("spellFilter").setAttribute("class", "btn btn-dark");
    }
    else {
        document.getElementById("spellFilter").setAttribute("class", "btn btn-info");
    }

    spellOn = !spellOn;
}

// not used as of now, will be used later to dynamicly add and remove elements from the ticker
function addElementToTicker() {
    $("#ticker_marquee").append($("<span>", { class: "dot"}));
}
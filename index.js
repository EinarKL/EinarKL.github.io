let tabContents = [];
let currentTab = 0;

$(function() {
    tabContents = $(".tabContent");

    adjustImg();
    makeUnderline();
    showHome();
    makeSingleLetters();
        
    $(window).resize(function(){
        updateUnderline(currentTab);
    });
});


function hideAll() {
    for (let c of tabContents) {
        $(c).css("display", "none");
    }
}

function showHome() {
    currentTab = 0;
    hideAll();
    $("#tabHome").css("display", "block");
    $("#underline").css("margin-left", $(window).width() / 9);
    $("#underline").css("transition", "margin-left 0.1s linear");
    $("#underline").css("-webkit-transition", "margin-left 0.1s linear");
}

function showProjects() {
    currentTab = 1;
    hideAll();
    $("#tabProjects").css("display", "block");
    $("#underline").css("margin-left", ($(window).width() / 9)*4);
    $("#underline").css("transition", "margin-left 0.1s linear");
    $("#underline").css("-webkit-transition", "margin-left 0.1s linear");
}

function showApps() {
    currentTab = 2;
    hideAll();
    $("#tabApps").css("display", "block");
    $("#underline").css("margin-left", ($(window).width() / 9)*7);
    $("#underline").css("transition", "margin-left 0.1s linear");
    $("#underline").css("-webkit-transition", "margin-left 0.1s linear");
}

function makeUnderline() {
    $("#underline").css("height", "5px");
    $("#underline").css("width", $(window).width() / 9);
    $("#underline").css("margin-left", $(window).width() / 9);
}

function makeSingleLetters() {
    const tabHomeLetters = $("#tabHome h1").text().split("");
    let newTabHome = "";
    for (let e of tabHomeLetters) {
        newTabHome += "<einar>"+e+"</einar>"
    }
    $("#tabHome h1").html(newTabHome);
}

function adjustImg() {
    const size = $("h1").css("font-size");

    $(".tabAppsImg").css("height", size);
    $(".tabAppsImg").css("width", "auto");
    $(".tabAppsImg").css("margin-right", "0.25%");
}

function updateUnderline(tab) {
    console.log($(window).width());
    $("#underline").css("width", $(window).width() / 9);
    if (tab === 0) {
        $("#underline").css("margin-left", $(window).width() / 9);
    }
    else if (tab === 1) {
        $("#underline").css("margin-left", ($(window).width() / 9)*4);
    }
    else if (tab === 2) {
        $("#underline").css("margin-left", ($(window).width() / 9)*7);
    }
}
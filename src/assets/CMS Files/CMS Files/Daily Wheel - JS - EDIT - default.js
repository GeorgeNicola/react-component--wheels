

Game.prototype.settings.mechanism = "single";
Game.prototype.settings.packages.prizes = [
    "5%",
    "10%",
    "20%",
    "30%",
    "50%"
];
Game.prototype.settings.packages.degrees = [
    310,
    238,
    167,
    96,
    22.5
];
Game.prototype.settings.child.packages.degrees = [];
Game.prototype.settings.nodes.visible = true;
Game.prototype.animation.node.number = 5; // set the number of nodes



// create audio element
var tickerSound = new Audio("https://dyqkwbrfobayv.cloudfront.net/RMF/tick.mp3");
tickerSound.load();

document.querySelector(".audio-trigger").addEventListener("click", function () {
    tickerSound.play();
});

function playBackgroundSong(){
   let songSelector = document.querySelector(".background-sound");
   songSelector.volume = 0.20;
   songSelector.play();
}
/*
window.addEventListener('load', () => {
    console.log("ONLOAD BACKGROUND SONG CALL")
    playBackgroundSong();
});

//Start song when reaching page by using the back btn
if (document.readyState === "complete") {
    setTimeout(function () {
        console.log("DOCUMENT.READY BACKGROUND SONG CALL")
       playBackgroundSong()
   }, 4000)
}
*/


function soundOn() {
     playBackgroundSong();
     tickerSound.volume=1;
     document.querySelector("#wheel-container .sound-off").style.display = 'none';
     document.querySelector("#wheel-container .sound-on").style.display = 'block';   
}

function soundOff() {
    document.querySelector(".background-sound").pause();
    tickerSound.volume=0;
    document.querySelector("#wheel-container .sound-off").style.display = 'block';
    document.querySelector("#wheel-container .sound-on").style.display = 'none';
}

document.querySelector(".sound-box").addEventListener('click', function(event){
    if(event.target.matches('.sound-off')){
        soundOn();
    } else {
        soundOff();
    }
})

document.querySelector(".activateGame").addEventListener('click', function(){
    soundOn();
})

// move game icons inside wheel container
function moveElement(target, el) {
    document.querySelector(target).append(document.querySelector(el))
}

//moveElement('#wheel-container', '#simpleContentRepeater');





// add countdown if user did not clicked spin
var clicked = false;
var spinBtn = document.querySelector('.btn-spin');
var gifContainer = document.querySelector('.gif-container'),
    imgEl = gifContainer.querySelector('img'),
    gifSrc = imgEl.getAttribute('countdown-gif-src'),
    emptySpinImg = spinBtn.getAttribute('default-btn');

var spinBtnTimer = setTimeout(function () {
    if (typeof initCountdown == 'undefined') {
        initCountdown = 'init';

        if (clicked === false) {
            gifContainer.style.cssText = "display: inline-block; opacity: 1;"

            console.log("###### start countdown 1");

            imgEl.setAttribute("src", gifSrc);

            setTimeout(function () {

                console.log("###### start countdown 2");
                spinBtn.click();
                //gifContainer.remove();
                gifContainer.style.display = "none !important";
                //spinBtn.setAttribute('src', emptySpinImg);
            }, 5000);
        }
    }

}, 12000)

spinBtn.addEventListener("click", function () {
    clicked = true;
    gifContainer ? gifContainer.style.cssText = "display: none; opacity: 0;" : "";
    document.getElementById("wheel").classList.remove("wheel-parent");
    clearTimeout(spinBtnTimer);
});


function ready() { }

function iframe() { }

function valid() { }

function notValid() { }

function complete() { }

function error() { }

initWheel();































// //NEW AUDIO ELEMENT
// // create background music audio element
// var backgroundMusic = new Audio("https://dyqkwbrfobayv.cloudfront.net/sound/Happiness.mp3");
// backgroundMusic.load(); 
// document.querySelector(".music-trigger").addEventListener("click", function () {
//     backgroundMusic.play();
// });


// function playBackgroundSong(){
//     document.querySelector(".background-sound").volume = 0.25;
//     let songSelector = document.querySelector(".background-sound");
//     songSelector.play();
//  }
 
//  window.addEventListener('load', () => {
//      playBackgroundSong();
//  });
 
//  //Start song when reaching page by using the back btn
//  if (document.readyState === "complete") {
//      setTimeout(function () {
//        function playBackgroundSong()
//     }, 4000)
//  }
 


$.ajax({
    type: "POST",
    url: "https://stage-us.888casino.com/claim/random/?guid=3121251251251",
    success: function(result) {
        console.log(result)
        // let ajaxValue = $(result).find("#fullContent > div").text();
        // ajaxValue = ajaxValue.replace(/\D/g, "");
        // console.log(ajaxValue)
    },
    error: function(result) {
        console.log(result)
    }
});



fetch('https://stage-us.888casino.com/claim/random/?guid=3121251251251', {
    method: 'POST',
})
.then(result => {
    console.log(result)
    // let ajaxValue = $(result).find("#fullContent > div").text();
    //     ajaxValue = ajaxValue.replace(/\D/g, "");
    //     console.log(ajaxValue)
    // console.log(data)
})
.catch(err => console.log("Error: ", err))
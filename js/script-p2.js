// JavaScript Document


$(document).ready(function() {
    $("#controller").jFlow({
        slides: "#slides",

        width: "1400px",

        height: "513px",

        duration: 2000,  // time in milliseconds to transition one slide

        pause: 5000, //time between transitions

        effect: "rewind", //this is the slide effect (rewind or flow)

    });
});
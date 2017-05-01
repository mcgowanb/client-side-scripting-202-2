// JavaScript Document

"use strict";

// jflow image slider when page loads
$(document).ready(function() {
    $("#controller").jFlow({
        slides: "#slides",

        width: "670px",

        height: "420px",

        duration: 2000,  // time in milliseconds to transition one slide

        pause: 5000, //time between transitions

        effect: "rewind", //this is the slide effect (rewind or flow)

    });
	
	
	// applies image magnify to images of the class magSlides
	jQuery(".magSlides").imageMagnify({ 
 		
		magnifyby:1.5,
		
		magnifyduration: 1000,
		
		mgopacity: 0.2 //opacify of original image when image is enlarged 
	});
	
});

//Image Power Zoomer v1.2
// http://dynamicdrive.com/dynamicindex4/powerzoomer.htm

// Code I tried to use for another magnifying effect.
// when the image in the slider was magnified by the first plugin,
// I wanted this plugin to magnify the image once again.
// this plugin is used as a magnifying glass on the areas of the image
// you place the cursor over

//$(".magSlides").click(function(){ 
//$(this).addpowerzoom({
// 		defaultpower: 2,
//		
// 		powerrange: [2,5],
//		
// 		largeimage: null,
//		
// 		magnifiersize: [100,100] //<--no comma following last option!
//	});
//
//});
//});



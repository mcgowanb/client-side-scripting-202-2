$(document).ready(function(){
    var page = location.href.split("/").slice(-1).toString();
    setMenuPressed(page);
	$(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); } );

});

function setMenuPressed(page){
    switch(page){
        case "index.html":
            $("#p-1").addClass("active");
            break;
        case "page-2.html":
            $("#p-2").addClass("active");
            break;
        case "page-3.html":
            $("#p-3").addClass("active");
            break;
    }
}


///////////////////////////////
$('#postcode_lookup').getAddress({
    api_key: 'uDICbErsV0Gh9YLS8RbKdA8455',
    output_fields:{
        line_1: '#line1',
        line_2: '#line2',
        line_3: '#line3',
        post_town: '#town',
        county: '#county',
        postcode: '#postcode'



    },
    <!--  Register callback at specific stage -->
    onAddressSelected: function(){
        // wait for a callback with the longitude and latitude values
        getPosition(function(position){

            // log the position returned
            var text = document.getElementById("text")
            text.innerHTML = "Marker position: { Longitude: "+position.long+ ",  Latitude:"+position.latt+" }";

            // update the map with the new position
            setup_map(position.latt, position.long);
        });}
});

/////////
function getPosition(callback) {
    // set up our geoCoder
    var geocoder = new google.maps.Geocoder();

    // get our postcode value
    var postcode = document.getElementById("postcode").value;

    //send value to google to get a longitude and latitude value
    geocoder.geocode({'address': postcode}, function(results, status)
    {
        // callback with a status and result
        if (status == google.maps.GeocoderStatus.OK)
        {
            // send the values back in a JSON string
            callback({
                latt: results[0].geometry.location.lat(),
                long: results[0].geometry.location.lng()
            });
        }
    });
}
function setup_map(latitude, longitude) {
    // create a JSON object with the values to mark the position
    var _position = { lat: latitude, lng: longitude};

    // add our default mapOptions
    var mapOptions = {
        zoom: 16,              // zoom level of the map
        center: _position     // position to center
    }

    // load a map within the "map" div and display
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // add a marker to the map with the position of the longitude and latitude
    var marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map
    });
}
window.onload = function() {
    // first setup the map, with our default location of London
    setup_map(51.5073509, -0.12775829999998223);

    document.getElementById("form").onsubmit = function() {
        //document.getElementById("opc_button").onclick = function() {
        // when form is submitted, wait for a callback with the longitude and latitude values
        getPosition(function(position){

            // log the position returned
            var text = document.getElementById("text")
            text.innerHTML = "Marker position: { Longitude: "+position.long+ ",  Latitude:"+position.latt+" }";

            // update the map with the new position
            setup_map(position.latt, position.long);
        });
    }
}
$(document).ready(function(){
    var page = location.href.split("/").slice(-1).toString();
    setMenuPressed(page);
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
$(document).ready(function(){
    var page = location.href.split("/").slice(-1).toString();
    setMenuPressed(page);

    var tempreature = function(time, temp){
        this.time = time;
        this.temp = temp;
    };
    var lowestTemp = 9999;
    var url = "http://api.openweathermap.org/data/2.5/forecast?id=2961423&APPID=8c6860362c19a97e94d507247ba0e59a";
    var chartData = $.getJSON(url, function (data) {
        var records = new Array;
        $.each(data.list, function (key, val) {
            // var temp = new tempreature(val.dt, val.main.temp);
            var time = moment.unix(val.dt);
            
            var temp = val.main.temp;

            if(temp < lowestTemp){
                lowestTemp = temp;
            }
            console.log(time);
            records.push([time, temp]);
        });
        //highcharts here
        $('#highcharts').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'title '
            },
            credits: {
                enabled: false
            },

            subtitle: {
                text: 'Click and drag the plot area to zoom in',
                x: -20
            },
            xAxis: {
                type: 'datetime'
                // min: new Date('2000/10/22').getTime(),
                // max: new Date('2010/10/22').getTime(),
            },
            yAxis: {
                title: {
                    text: 'Temp C°'
                }
                // plotLines: [{
                //     value: 0,
                //     width: 1,
                //     color: '#808080'
                // }]
            },
            tooltip: {
                valueSuffix: 'something'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                showInLegend: false,
                name: "blah",
                data: records
            }]
        });
    });



// Get the CSV and create the chart
// //     $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=analytics.csv&callback=?', function (csv) {
//     $.getJSON('http://api.openweathermap.org/data/2.5/forecast?id=2961423&APPID=8c6860362c19a97e94d507247ba0e59a', function (csv) {
//
//         Highcharts.chart('highcharts', {
//
//             data: {
//                 csv: csv
//             },
//
//             title: {
//                 text: 'Historical Weather Information for Sligo'
//             },
//
//             subtitle: {
//                 text: 'Source: openweatherapi'
//             },
//
//             xAxis: {
//                 tickInterval: 7 * 24 * 3600 * 1000, // one week
//                 tickWidth: 0,
//                 gridLineWidth: 1,
//                 labels: {
//                     align: 'left',
//                     x: 3,
//                     y: -3
//                 }
//             },
//
//             yAxis: [{ // left y axis
//                 title: {
//                     text: null
//                 },
//                 labels: {
//                     align: 'left',
//                     x: 3,
//                     y: 16,
//                     format: '{value:.,0f}'
//                 },
//                 showFirstLabel: false
//             }, { // right y axis
//                 linkedTo: 0,
//                 gridLineWidth: 0,
//                 opposite: true,
//                 title: {
//                     text: null
//                 },
//                 labels: {
//                     align: 'right',
//                     x: -3,
//                     y: 16,
//                     format: '{value:.,0f}'
//                 },
//                 showFirstLabel: false
//             }],
//
//             legend: {
//                 align: 'left',
//                 verticalAlign: 'top',
//                 y: 20,
//                 floating: true,
//                 borderWidth: 0
//             },
//
//             tooltip: {
//                 shared: true,
//                 crosshairs: true
//             },
//
//             plotOptions: {
//                 series: {
//                     cursor: 'pointer',
//                     point: {
//                         events: {
//                             click: function (e) {
//                                 hs.htmlExpand(null, {
//                                     pageOrigin: {
//                                         x: e.pageX || e.clientX,
//                                         y: e.pageY || e.clientY
//                                     },
//                                     headingText: this.series.name,
//                                     maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
//                                     this.y + ' visits',
//                                     width: 200
//                                 });
//                             }
//                         }
//                     },
//                     marker: {
//                         lineWidth: 1
//                     }
//                 }
//             },
//
//             series: [{
//                 name: 'All visits',
//                 lineWidth: 4,
//                 marker: {
//                     radius: 4
//                 }
//             }, {
//                 name: 'New visitors'
//             }]
//         });
//     });


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
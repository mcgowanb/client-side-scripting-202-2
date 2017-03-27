$(document).ready(function () {
    var page = location.href.split("/").slice(-1).toString();
    setMenuPressed(page);


    var averageTemp = 0, lowestTemp = 9999;
    var url = "http://api.openweathermap.org/data/2.5/forecast?id=2961423&APPID=8c6860362c19a97e94d507247ba0e59a&units=metric";
    $.getJSON(url, function (data) {
        console.log(data);
        var records = new Array;
        var count = 0;

        $.each(data.list, function (key, val) {
            //multiplying by 1000 to match js milliseconds for date time
            var time = val.dt * 1000;

            var temp = val.main.temp;
            averageTemp += temp;
            if (temp < lowestTemp) {
                lowestTemp = temp;
            }
            console.log(time);
            records.push([time, temp]);
            count++;
        });
        averageTemp /= count;

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
            },
            yAxis: {
                title: {
                    text: 'Temp C°'
                },
                plotLines: [{
                    value: averageTemp,
                    color: 'green',
                    dashStyle: 'shortdash',
                    width: 2,
                    label: {
                        text: 'Average Temp ' + averageTemp.toFixed(2) + ' C°'
                    }
                }]
            },
            tooltip: {
                valueSuffix: 'C°'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                showInLegend: false,
                name: "Temperature",
                data: records
            }]
        });
    });

});

function setMenuPressed(page) {
    switch (page) {
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
var startDate, endDate;
var formatString = "MMMM Do YYYY HH:mm";
var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?id=2961423&APPID=8c6860362c19a97e94d507247ba0e59a&units=metric";
var historicWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?id=2961423&APPID=8c6860362c19a97e94d507247ba0e59a&units=metric";
$(document).ready(function () {
    var page = location.href.split("/").slice(-1).toString();
    setMenuPressed(page);


    var averageTemp = 0, lowestTemp = 9999;
    var locationName;
    $.getJSON(historicWeatherURL, function (data) {
        var records = new Array;
        var tempRanges = new Array;
        var windIntervals = new Array;
        var maxTemps = new Array;
        var timeValues = new Array;
        var count = 0, avgWindSpeed = 0;
        locationName = data.city.name;

        $.each(data.list, function (key, val) {
            //multiplying by 1000 to match js milliseconds for date time
            var time = val.dt * 1000;
            var temp = val.main.temp;
            // var minTemp = val.main.temp_min;
            // var maxTemp = val.main.temp_max;
            avgWindSpeed += val.wind.speed;
            averageTemp += temp;
            if (temp < lowestTemp) {
                lowestTemp = temp;
            }
            records.push([time, temp]);
            // tempRanges.push(minTemp, maxTemp);
            windIntervals.push([time, val.wind.speed]);
            timeValues.push(time);
            count++;
        });
        averageTemp /= count;
        avgWindSpeed /= count;
        startDate = moment(records[0][0]).format(formatString);
        endDate = moment(records[records.length -1][0]).format(formatString);

        loadTemperatureGraph(records, locationName, averageTemp);
        displayWindSpeed(windIntervals, avgWindSpeed);
    });

});

function displayWindSpeed(windIntervals, avgSpeed) {
    $('#wind-intervals').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Wind speed'
        },
        subtitle: {
            text: 'for the period ' + startDate + ' to ' + endDate
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            }
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: 'Wind speed (m/s)'
            },
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            plotLines: [{
                value: avgSpeed,
                color: 'blue',
                dashStyle: 'shortdash',
                width: 1,
                label: {
                    text: 'Average speed ' + avgSpeed.toFixed(2) + ' m/s'
                }
            }],
            plotBands: [{ // Light air
                from: 0.3,
                to: 1.5,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Light air',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Light breeze
                from: 1.5,
                to: 3.3,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Light breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Gentle breeze
                from: 3.3,
                to: 5.5,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Gentle breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Moderate breeze
                from: 5.5,
                to: 8,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Moderate breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Fresh breeze
                from: 8,
                to: 11,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Fresh breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Strong breeze
                from: 11,
                to: 14,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Strong breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // High wind
                from: 14,
                to: 15,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'High wind',
                    style: {
                        color: '#606060'
                    }
                }
            }]
        },
        tooltip: {
            valueSuffix: ' m/s'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Wind Speed',
            data: windIntervals,
            color: '#5CB85C'
        }],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        }
    });
}


function loadTemperatureGraph(records, locationName, averageTemp) {
    $('#temp-graph').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Temperature information for ' + locationName
        },
        credits: {
            enabled: false
        },

        subtitle: {
            text: 'for the period ' + startDate + ' to ' + endDate
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
        series: [
            {
                name: "Temperature",
                data: records
            }
        ]
    });
}


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
var startDate, endDate;
var formatString = "MMMM Do YYYY HH:mm";
var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?id=2961423&APPID=8c6860362c19a97e94d507247ba0e59a&units=metric";
var historicWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?id=2961423&APPID=8c6860362c19a97e94d507247ba0e59a&units=metric";
var locationName;
var temperatureIcon = " °C";
var averageTemp = 0, highTemp = 0, lowestTemp = 9999;
var weatherIcons;

$(document).ready(function () {
    var page = location.href.split("/").slice(-1).toString().split("?")[0];
    setMenuPressed(page);

    //load json file for cloud icons
    $.getJSON("json/icons.json", function (data) {
        weatherIcons = data;
    });


    //historic weather data
    $.getJSON(historicWeatherURL, function (data) {
        var records = new Array;
        var windIntervals = new Array;
        var timeValues = new Array;
        var count = 0, avgWindSpeed = 0;
        locationName = data.city.name;

        $.each(data.list, function (key, val) {
            //multiplying by 1000 to match js milliseconds for date time
            var time = val.dt * 1000;
            var temp = val.main.temp;
            avgWindSpeed += val.wind.speed;
            averageTemp += temp;

            if (temp < lowestTemp) {
                lowestTemp = temp;
            }

            if (temp > highTemp) {
                highTemp = temp;
            }

            records.push([time, temp]);
            windIntervals.push([time, val.wind.speed]);
            timeValues.push(time);
            count++;
        });
        averageTemp /= count;
        avgWindSpeed /= count;
        startDate = moment(records[0][0]).format(formatString);
        endDate = moment(records[records.length - 1][0]).format(formatString);

        displayMainGraph(windIntervals, records, avgWindSpeed, averageTemp);
        $("#temp-low").text(lowestTemp + temperatureIcon);
        $("#temp-high").text(highTemp + temperatureIcon);
    });

    //get current weather infromation
    $.getJSON(currentWeatherURL, function (data) {
        $("#temp-current").text(data.main.temp + temperatureIcon);
        setWeatherInformation(data.weather[0], data.clouds);
        setOtherWeatherData(data.main);
    });

});

function displayMainGraph(windIntervals, records, avgSpeed, averageTemp) {
    $('#main-graph').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Weather Data for ' + locationName
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
        yAxis: [
            {
                title: {
                    text: 'Wind speed (m/s)'
                },
                labels: {
                    format: '{value}(m/s)',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,
                plotLines: [
                    {
                        value: avgSpeed,
                        color: 'blue',
                        dashStyle: 'longdash',
                        width: 1,
                        label: {
                            text: 'avg speed ' + avgSpeed.toFixed(2) + ' m/s',
                            align: 'right'
                        }
                    },
                    {
                        value: averageTemp,
                        color: 'green',
                        dashStyle: 'shortdash',
                        width: 1,
                        label: {
                            text: 'avg temp ' + averageTemp.toFixed(2) + ' °C',
                            align: 'right'
                        }
                    }
                ],
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
                }],
                opposite: true
            },
            {
                title: {
                    text: 'Temp °C'
                },
                labels: {
                    format: '{value} °C',
                    style: {
                        color: Highcharts.getOptions().colors[3]
                    }
                }
            }
        ],
        tooltip: {
            shared: true
        },
        series: [
            {
                name: 'Wind Speed',
                type: 'spline',
                data: windIntervals,
                color: '#5CB85C',
                tooltip: {
                    valueSuffix: ' (m/s)'
                }
            },
            {
                name: "Temperature",
                type: 'spline',
                data: records,
                tooltip: {
                    valueSuffix: ' ( °C)'
                }
            }
        ],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        }
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

function setWeatherInformation(data, clouds) {
    var prefix = 'wi wi-';
    var code = data.id;
    var icon = weatherIcons[code].icon;

    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
    }
    icon = prefix + icon;
    $("#weather-icon").addClass(icon);
    var $weatherString = $("<div><span class='medium'>" + data.main + "</span></div>");
    var $cloudString = $("<div><small>Cloud cover: " + clouds.all + "%</small></div>");
    $("#weather-data").append($weatherString).append($cloudString);
}


function setOtherWeatherData(data) {
    var $data = [
        $("<div><span class='medium'>Atmospheric Pressure: </span><span class='small other'>" + data.pressure + " hPa</span></div>"),
        $("<div><span class='medium'>Humidity: </span><span class='small other'>" + data.humidity + "%</span></div>")
    ];

    $("#other-weather").append($data);
}
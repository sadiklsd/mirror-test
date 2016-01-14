var module = angular.module('top', []);
module.controller('top-ctrl', function ($scope, $interval) {
  var tick = function () {
    $scope.clock = Date.now();
    var url="http://cors.io/?u=http://free.currencyconverterapi.com/api/v3/convert?q=GBP_EUR&compact=ultra"
    $.getJSON( url, function( data ) {
      $scope.currency=data.results.GBP_EUR.val
    })
    var url = 'http://cors.io/?u=https://api.forecast.io/forecast/a212b6ba4f01a291d6b7130efd21c86c/36.166562,-5.3435349?units=si'
    $.getJSON( url, function( data ) {
      $scope.temperature=data.currently.temperature
      $scope.summary=data.daily.summary
      var time=[]
      var min=[]
      var max=[]
      var moon=[]
      var list=[]
      for (var i = 0; i < data.daily.data.length; i++) {
        time[i] = moment.unix(data.daily.data[i].time).format('ddd');
        min[i]=data.daily.data[i].apparentTemperatureMin
        max[i]=data.daily.data[i].apparentTemperatureMax
        moon[i]=data.daily.data[i].moonPhase
        list[i]=data.daily.data[i].icon
      };
      $scope.day=time.join("\n")
      $scope.temperatureMin=min.join("\n")
      $scope.temperatureMax=max.join("\n")
      $scope.moonPhase=moon.join("\n")
      var skycons = new Skycons({
        "color": "gray"
      });
      for (var i = 0; i < data.daily.data.length; i++) {
        if (list[i] === "partly-cloudy-day") {
          skycons.add("icon"+(i+1), Skycons.PARTLY_CLOUDY_DAY);
        }
        if (list[i] === "clear-day") {
          skycons.add("icon"+(i+1), Skycons.CLEAR_DAY);
        }
        if (list[i] === "clear-night") {
          skycons.add("icon"+(i+1), Skycons.CLEAR_NIGHT);
        }
        if (list[i] === "partly-cloudy-night") {
          skycons.add("icon"+(i+1), Skycons.PARTLY_CLOUDY_NIGHT);
        }
        if (list[i] === "cloudy") {
          skycons.add("icon"+(i+1), Skycons.CLOUDY);
        }
        if (list[i] === "rain") {
          skycons.add("icon"+(i+1), Skycons.RAIN);
        }
        if (list[i] === "sleet") {
          skycons.add("icon"+(i+1), Skycons.SLEET);
        }
        if (list[i] === "snow") {
          skycons.add("icon"+(i+1), Skycons.SNOW);
        }
        if (list[i] === "wind") {
          skycons.add("icon"+(i+1), Skycons.WIND);
        }
        if (list[i] === "fog") {
          skycons.add("icon"+(i+1), Skycons.FOG);
        }
      }
      skycons.play()
    })
  }
  tick();
  $interval(tick, 1000);
});

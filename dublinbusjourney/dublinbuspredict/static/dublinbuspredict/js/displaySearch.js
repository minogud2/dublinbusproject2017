//// Toggle function for route div on map.html
////Toggle function for route div on map.html


$(document).ready(function(){
	$("#RouteMap0").click(function(){
		$("#toggleRouteMap0").toggle();
	});
});

$(document).ready(function(){
	$("#RouteMap1").click(function(){
		$("#toggleRouteMap1").toggle();
});
});
////Toggle function for route div on map.html
$(document).ready(function(){
	$("#RouteMap2").click(function(){
		$("#toggleRouteMap2").toggle();
	});
});

//Toggles plus and minus icon for Show Details
$(document).ready(function(){
	$("#RouteMap0").click(function(){
		$("#RouteMap0").toggleClass('fa-plus-square fa-minus-square');
	});
});

//Toggles plus and minus icon for More Information
$(document).ready(function(){
	$("#RouteMap1").click(function(){
		$("#RouteMap1").toggleClass('fa-plus-square fa-minus-square');
	});
});

//Toggles plus and minus icon for More Information
$(document).ready(function(){
	$("#RouteMap2").click(function(){
		$("#RouteMap2").toggleClass('fa-plus-square fa-minus-square');
	});
});

//// Map and Marker related functions for map.html
//$(document).ready(function() {
//    initMap();
//});

var map; // define a map as a global variable for use of different functions
var directionsDisplay;
//var directionsService = new google.maps.DirectionsService();
var service;
var source;
var destination;

function initMap() {
    console.log('inside map!')
//	Function to pull in the map
    var latlng = new google.maps.LatLng(53.3498053, -6.260309699999993);
	map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }); //closing map creation	

//    Add traffic layer to the map.
	  var trafficLayer = new google.maps.TrafficLayer();
	  trafficLayer.setMap(map);

//	  Add Public transit layer to the map.
	  var transitLayer = new google.maps.TransitLayer();
	  transitLayer.setMap(map);

//	Function to pull in the json from the url.
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/sampleQuery", null, function(d) {
        var data = d.data;
        var points = new Array; 
        
        var marker, i;
        var infowindow = new google.maps.InfoWindow();
        for (i = 0; i < data.length; i++) {
                var newMarker;
                var intSrc = parseInt(source);
                var intDst = parseInt(destination);               
                if (data[i][0] == intSrc){
               	 newMarker = stopsIconSrc;
                } else if (data[i][0] == intDst){
               	 newMarker = stopsIconDst;
                } else {
               	 newMarker = stopsIcon;
                }     
                marker = new google.maps.Marker({
                position: new google.maps.LatLng(data[i][4], data[i][5]),
                map: map,
                icon: newMarker
            });
         points.push(marker.getPosition());
       

        google.maps.event.addListener(marker, 'click', (function(marker, i){
        	return function() {
        		if (data[i][0] == intSrc){
        			infowindow.setContent("<b>Selected Source<br>Stop ID:&nbsp</b>" + data[i][0] + "<br>" + 	
            				"<b>Location:&nbsp</b>" + data[i][2] + "<br>" + "<b>Street:&nbsp</b>" + data[i][3]);
        			infowindow.open(map,marker);
        		} else if(data[i][0] == intDst){
        			infowindow.setContent("<b>Selected Destination<br>Stop ID:&nbsp</b>" + data[i][0] + "<br>" + 	
        				"<b>Location:&nbsp</b>" + data[i][2] + "<br>" + "<b>Street:&nbsp</b>" + data[i][3]);
        		infowindow.open(map,marker);
        		}
        		else {
        			infowindow.setContent("<b>	Stop ID:&nbsp</b>" + data[i][0] + "<br>" + 	
            				"<b>Location:&nbsp</b>" + data[i][2] + "<br>" + "<b>Street:&nbsp</b>" + data[i][3]);
            		infowindow.open(map,marker);}
        	}
        })(marker, i));
        }

      //Initialize the Path Array
      var path = new google.maps.MVCArray();

      //Initialize the Direction Service
      service = new google.maps.DirectionsService();

      //Set the Path Stroke Color
      var poly = new google.maps.Polyline({ map: map, strokeColor: '#3594D4' });

      //Loop and Draw Path Route between the Points on MAP
      for (var i = 0; i < points.length; i++) {
          if ((i + 1) < points.length) {
              var src = points[i];
              var des = points[i + 1];
              path.push(src);
              poly.setPath(path);
              service.route({
                  origin: src,
                  destination: des,
                  travelMode: google.maps.DirectionsTravelMode.TRANSIT
              })
          }
      }
    });
}

//load in the weather onto map
// need to change so that it's only displayed if current mode is selected.No forecasts. 

var dWeather;
function changeWeatherIcon(weatherType) {
    weatherType = weatherType.toLowerCase();
    $("#wIcon").text("");
    $("#wIcon").append("<i></i>");

    if (weatherType.indexOf("clouds") != -1) {
        return $("#wIcon").addClass("wi wi-cloudy");
    } else if (weatherType.indexOf("rain") != -1) {
        return $("#wIcon").addClass("wi wi-rain");
    } else if (weatherType.indexOf("thunderstorm") != -1) {
        return $("#wIcon").addClass("wi wi-thunderstorm");
    } else if (weatherType.indexOf("snow") != -1) {
        return $("#wIcon").addClass("wi wi-snow");
    } else if (weatherType.indexOf("mist") != -1) {
        return $("#wIcon").addClass("wi wi-smoke");
    } else {
        return $("#wIcon").addClass("wi wi-day-sunny");
    }
}

function titleCase(str) {
    var array = str.split(" ");
    for (var i = 0; i < array.length; i++) {
        var temp_array = array[i].split(''); // "ab" => "a","b"
        temp_array[0] = temp_array[0].toUpperCase(); // "a","b" => "A","b"

        for (var j = 1; j < temp_array.length; j++)
            temp_array[j] = temp_array[j].toLowerCase(); // "a","b" => "A","b"
        array[i] = temp_array.join(''); // "A","b" => "Ab"
    }

    return array.join(' ');
}

// Function for displaying output of predictions in divs.
var busNum = 0;
function getPredictedTimes(bus){
	console.log("busNum is now", busNum)
    var arrival = new Date(bus[0].predicted_arrival_time);
    var currentTime = new Date();
    var diff = Math.abs(arrival - currentTime);
    var journey_time = 0;
    var no_stops;    
    for (var i = 0; i < bus.length; i++) {
    	var oldArrival = bus[i].predicted_arrival_time;
    	var newArrival = oldArrival.slice(11);
    	var stop = bus[i].stopid;
    	journey_time += bus[i].duration;
    	$('#ulOutput'+busNum).append('<li class="passed"><b>Arrival Time:&nbsp;</b>' 
    			+ newArrival + '&emsp;&emsp;<b>Stop ID:&nbsp</b>' + stop +
    			'&emsp;&emsp;<b>Stop Name:&nbsp;</b> Insert Stop Name' + "<br>" 
    			+ '<i class="fa fa-bus fa-x8"></i>'+"<br>"+'</li>');        		
    	no_stops +=1;
    }
   $('#dueTime'+busNum).append("<b>" + Math.floor(diff/60000) + " minutes" + "<b>" +"<br>");
  $('#journeyTime'+busNum).append("<b>" + Math.floor(journey_time/ 60) + " minutes" + "</b>");
  $('#distance'+busNum).append("<b>" + " KM" + "</b>");
  
  	// Calculate the cost section for the trip. 
    if (no_stops.length < 4) {
      $('#journeyPrice'+busNum).append("<b>Adult:</b> €2.00" + "<br>");
      $('#journeyPrice'+busNum).append("<b>Leap Card:</b> €1.50" + "<br>");
  } else if (no_stops.length > 3 && no_stops.length < 13){
      $('#journeyPrice'+busNum).append("<b>Adult:</b> €2.70" + "<br>");
      $('#journeyPrice'+busNum).append("<b>Leap Card:</b> €2.05" + "<br>");
  }
  else{
      $('#journeyPrice'+busNum).append("<b>Adult:</b> €3.30" + "<br>");
      $('#journeyPrice'+busNum).append("<b>Leap Card:</b> €2.60" + "<br>");
  }      
    document.getElementById('resultArray'+busNum).style.display = 'block';
    busNum += 1;
  }

function loadRoutes(){
    console.log('HEReeeeeeeeeeeeeee!')
    var counter = 0
    var a = $.getJSON("http://127.0.0.1:8000/dublinbuspredict/loadRoutesForMap", null, function(d) {
        $.each(d['list_routes'], function(i, p) {
            $('#dropdown-list-4').append($('<li></li>').val(p).html('<a onclick=getStops2("' + p + '")>' + p + '</a>'));
        })
        $.each(d['list_stops'], function(i, p) {
            $('#dropdown-list-5').append($('<li></li>').val(p).html('<a onclick=getStopsStartingFromSource2("' + p + '")>' + p + '</a>'));
        })
    });
    var b = $.getJSON("http://127.0.0.1:8000/dublinbuspredict/getInfoNextPage", null, function(d) {
        console.log('Second call!');
        console.log('Results:', d);
        route = d['route'];
        source = d['source'];
        destination = d['destination'];
        time = d['time']
        date = d['date']
        initMap()
        if (time != "" || date != ""){
        	document.getElementById('displayWeather').style.display = 'none';
            $.getJSON("http://127.0.0.1:8000/dublinbuspredict/runPlanner", {"route":route, "source":source, "destination":destination, "date":date, "time":time}, function(d) {
              if (d2 === "No buses found!"){
            	$('#resultArray0').replaceWith("<br>" +"<br>" +"&emsp;&emsp;&emsp;"
            			+ "No bus journeys departing on selected time. Please select another time and date, and try again.");
            	document.getElementById('resultArray0').style.display = 'block';
            }
            else{
                var d2 = d.info_buses;
                console.log("PLAN PREDICTION", d2)
                var bus = d2;
                var busNum = 0;
                var arrival = bus[0].predicted_arrival_time;
                var journey_time = 0;
                var no_stops;
                
                for (var i = 0; i < bus.length; i++) {
                	var oldArrival = bus[i].predicted_arrival_time;
                	var newArrival = oldArrival.slice(11);
                	var stop = bus[i].stopid;
                	journey_time += bus[i].duration;
                	$('#ulOutput'+busNum).append('<li class="passed"><b>Arrival Time:&nbsp;</b>' 
                			+ newArrival + '&emsp;&emsp;<b>Stop ID:&nbsp</b>' + stop +
                			'&emsp;&emsp;<b>Stop Name:&nbsp;</b> Insert Stop Name' + "<br>" 
                			+ '<i class="fa fa-bus fa-x8"></i>'+"<br>"+'</li>');        		
                	no_stops +=1;
                }
		               $('#dueTime'+busNum).append("<b>" + arrival.slice(11)    		   
		            		   + "<b>" +"<br>");
		              $('#journeyTime'+busNum).append("<b>" + Math.floor(journey_time/ 60) + " minutes" + "</b>");
		              $('#distance'+busNum).append("<b>" + " KM" + "</b>");
		              
		              	// Calculate the cost section for the trip. 
		                if (no_stops.length < 4) {
		                  $('#journeyPrice'+busNum).append("<b>Adult:</b> €2.00" + "<br>");
		                  $('#journeyPrice'+busNum).append("<b>Leap Card:</b> €1.50" + "<br>");
		              } else if (no_stops.length > 3 && no_stops.length < 13){
		                  $('#journeyPrice'+busNum).append("<b>Adult:</b> €2.70" + "<br>");
		                  $('#journeyPrice'+busNum).append("<b>Leap Card:</b> €2.05" + "<br>");
		              }
		              else{
		                  $('#journeyPrice'+busNum).append("<b>Adult:</b> €3.30" + "<br>");
		                  $('#journeyPrice'+busNum).append("<b>Leap Card:</b> €2.60" + "<br>");
		              }      
		                document.getElementById('resultArray'+busNum).style.display = 'block';
		                busNum += 1;
            		}
            });
        }
        else{
            $.getJSON("http://127.0.0.1:8000/dublinbuspredict/runModel", {"route":route, "source":source, "destination":destination}, function(d) {
                console.log('here', d)
                var d2 = d.info_buses;
                var bus0, bus1, bus2;
                $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Dublin,Ireland&units=metric&APPID=33e340fbba76a4645e26160abb37f014", null, function(dWeather) {
                    var weatherID = dWeather.weather[0].id;
                    var weatherTemp = dWeather.main.temp;
                    var weatherDesc = dWeather.weather[0].description;
                    weatherDesc = titleCase(weatherDesc);
                    var weatherIcon = changeWeatherIcon(weatherDesc);

                    $("#wTemp1").addClass("wi wi-thermometer");
                    $('#wTemp2').html("&nbsp" + weatherTemp);
                    $('#wTemp3').html("°C");
                    $('#wIcon').html(weatherIcon);
                    $('#wDesc').html(weatherDesc);
                    });
                
                if (d2 != "No buses found!"){
                	console.log("I'm getting into the else statement")
                	if (d2.length == 2){
                		busNum = 0;
                		console.log("size of array is 2")
                    	bus0 = d2[0];
    	                getPredictedTimes(bus0);
                		bus1 = d2[1];
    	                getPredictedTimes(bus1);	
                	} else if (d2.length == 3){
                		console.log("size of array is 3")
                		if (d2[0]== 0){
                			busNum = 0;
                			console.log("first array is empty in 1/3")
                        	bus1 = d2[1];
        	                getPredictedTimes(bus1);
        	                bus2 = d2[2];
        	                getPredictedTimes(bus2);
        	                }
                		}
                		else{
                			console.log("All three arrays are available")
                			busNum = 0;
                        	bus0 = d2[0];
        	                getPredictedTimes(bus0);
                        	bus1 = d2[1];
        	                getPredictedTimes(bus1);
        	                bus2 = d2[2];
        	                getPredictedTimes(bus2);
        	                console.log("predicted functions ran")
                		}
                	}
                else{
                    $('#resultArray0').replaceWith("<br><br>&emsp;&emsp;&emsp;" +
        			"No real-time information available. Please select time and date and try again.");
                    document.getElementById('resultArray0').style.display = 'block';
                }
            });		
        }
    });
}

function searchFunctionRoute2() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("search-box-4");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dropdown-list-4");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function getStops2(route) {
    document.getElementById("search-box-4").value = route;
    console.log(route);
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/pilotRoutes", {"route":route}, function(d) {
        console.log(d)
        document.getElementById("dropdown-list-5").innerHTML = "";
        document.getElementById("search-box-5").value = "";
        document.getElementById("search-box-6").value = "";
    $.each(d['stops'], function(i, p) {
        $('#dropdown-list-5').append($('<li></li>').val(p).html('<a onclick=getStopsDest2(' + p + ')>' + route + ' - ' + p + '</a>'));
    });
    });
}

function searchFunctionSRC2() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("search-box-5");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dropdown-list-5");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function getStopsDest2(source) {
    document.getElementById("search-box-5").value = source;
    console.log('Source:', source);
    route = document.getElementById("search-box-4").value;
    console.log ('Route:', route)
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/pilotDest", {"route":route, "source":source}, function(d) {
        console.log(d)
        document.getElementById("dropdown-list-6").innerHTML = "";
        document.getElementById("search-box-6").value = "";
    $.each(d['stops'], function(i, p) {
        $('#dropdown-list-6').append($('<li></li>').val(p).html('<a onclick=getStopsDestExtra2(' + p + ')>' + route + ' - ' + p + '</a>'));
    });
    });
}

function getStopsDestExtra2(stop){
    document.getElementById("search-box-6").value = stop;
}

function searchFunctionDest2() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("search-box-6");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dropdown-list-6");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function getStopsStartingFromSource2(stop){
    console.log('Stop is', stop)
    document.getElementById("search-box-5").value = stop
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/getStopsStartingFromSource", {"source":stop}, function(d) {
        console.log(d)
        document.getElementById("dropdown-list-4").innerHTML = "";
        document.getElementById("search-box-4").value = "";
        document.getElementById("dropdown-list-6").innerHTML = "";
        document.getElementById("search-box-6").value = "";
    $.each(d['stops'], function(i, p) {
        console.log(p)
        $('#dropdown-list-6').append($('<li></li>').val(p).html('<a onclick=getStopsDestExtraRoute2(' + p + ')>'+ p + '</a>'));
    });
    });
}

function getStopsDestExtraRoute2(route){
    document.getElementById("search-box-6").value = route;
    source = document.getElementById("search-box-5").value;
    dest = document.getElementById("search-box-6").value;
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/getStopsDestExtraRoute", {"source":source, "dest":dest}, function(d) {
        console.log(d)
    $.each(d['routes'], function(i, p) {
        console.log(p)
        $('#dropdown-list-4').append($('<li></li>').val(p).html('<a onclick=getExtraRoute2(' + p + ')>'+ p + '</a>'));
    });
    });
}

function getExtraRoute2(route){
    document.getElementById("search-box-4").value = route;
}

function loadRoutes2(){
    console.log('HEReeeeeeeeeeeeeee!')
    var counter = 0
    document.getElementById("dropdown-list-4").innerHTML = "";
    document.getElementById("search-box-4").value = "";
    document.getElementById("dropdown-list-5").innerHTML = "";
    document.getElementById("search-box-5").value = "";
    document.getElementById("dropdown-list-6").innerHTML = "";
    document.getElementById("search-box-6").value = "";
    var a = $.getJSON("http://127.0.0.1:8000/dublinbuspredict/loadRoutesForMap", null, function(d) {
        $.each(d['list_routes'], function(i, p) {
            $('#dropdown-list-4').append($('<li></li>').val(p).html('<a onclick=getStops2("' + p + '")>' + p + '</a>'));
        })
        $.each(d['list_stops'], function(i, p) {
            $('#dropdown-list-5').append($('<li></li>').val(p).html('<a onclick=getStopsStartingFromSource2("' + p + '")>' + p + '</a>'));
        })
    });
}

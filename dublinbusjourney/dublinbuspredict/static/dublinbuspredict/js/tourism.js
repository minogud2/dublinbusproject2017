var map;
var pos;
var infowindow;
var marker;
var stopMarker;
var routesData;

$(document).ready(function(){
	getStopData();
})

function tourismMap(){
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/getTourist", null, function(d) {
    	var points_of_interest = d.data;
    	// Declaring the map, info-windows, markers, and iterators
        map = new google.maps.Map(document.getElementById("map_tourism"), {
            zoom: 14,
            center: new google.maps.LatLng(53.3444281399357, -6.259417531374538),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    	
//      Add traffic layer to the map.
  	  var trafficLayer = new google.maps.TrafficLayer();
  	  trafficLayer.setMap(map);

//  	  Add Public transit layer to the map.
  	  var transitLayer = new google.maps.TransitLayer();
  	  transitLayer.setMap(map);
  	  
        infowindow = new google.maps.InfoWindow();
        var i;
        
        for (i = 0; i < points_of_interest.length; i++){        	
        	var contentString = "<b><u>"+ points_of_interest[i][0]+ "</u></b><br><br>" +
            					"<b>Name: </b>" + points_of_interest[i][1] +"<br>" +
            					"<b>Type: </b>" + points_of_interest[i][2] +"<br>" +
            					"<b>Address: </b>"+ points_of_interest[i][3]+ "<br>" +
            					"<b>Routes:</b><br><br>" +
            					"<a target='_blank' href='"+ points_of_interest[i][4] + "'>For more information click here</a>";
        	var newMarker;        	
        	if (points_of_interest[i][8] === "sport"){
        		newMarker = sportIcon}
        	else if(points_of_interest[i][8] === "museum"){
        		newMarker = museumIcon
        	}
        	else if(points_of_interest[i][8] === "music"){
        		newMarker = musicIcon
        	}
        	else if(points_of_interest[i][8] === "sights"){
        		newMarker = sightsIcon
        	}
        	else if(points_of_interest[i][8] === "shopping"){
        		newMarker = shoppingIcon
        	}
        	else if(points_of_interest[i][8] === "park"){
        		newMarker = parkIcon
        	}
        	else if(points_of_interest[i][8] === "beer"){
        		newMarker = beerIcon
        	}
               var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(points_of_interest[i][6], points_of_interest[i][7]),
                    map: map,
                    info: contentString,
                    icon: newMarker
                });
                     
           google.maps.event.addListener(marker, 'click', (function(marker, i){
               	return function() {
               		infowindow.close();
               		if(infoWindow){
               			infowindow.close();
               		}
               		infoWindow.setContent(this.info);
                    infoWindow.open(map, this);
               	}
           })(marker, i));
        }
        
    	// Adapted from: https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
      infoWindow = new google.maps.InfoWindow;
      
   // Try HTML5 geolocation.
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              marker = new google.maps.Marker({
              	position: pos,
              	map: map,
              	icon: myLocationIcon
          });  
              
          }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
          });
      } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
      }

<<<<<<< HEAD
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
          infoWindow.open(map);
      }
    });
}
=======
    }
    
    // Looping through the next element by coordinates to place Shopping marker
    for (i = 12; i < 13; i++) {
        marker = new Marker({
            position: new google.maps.LatLng(points_of_interest[i][2], points_of_interest[i][3]),
            map: map,
            icon: {
				path: MAP_PIN,
				fillColor: '#0c2864',
				fillOpacity: 1,
				strokeColor: '',
				strokeWeight: 0
			},
			map_icon_label: '<i class="fa fa-shopping-bag fa-2x" style="margin-bottom:17px; color:white;"></i>'
            //icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
>>>>>>> 2268d8e47d44eedf2c8249e524156489e978de70


<<<<<<< HEAD

function getStopData(){
$.getJSON("http://127.0.0.1:8000/dublinbuspredict/getTouristRoutes", null, function(d2) {
	routesData = d2.data;
	console.log("this is routes data",routesData)
//	var j,stopList, newStopList, stopString;
//	for (j = 0; j < routesData.length; j++){  
//		stopList = routesData[j][1];
//		newStopList = stopList.replace(/[\[\]']+/g, '');
//  
//		stopString = "<b>Stop ID: </b>"+ routesData[j][0]+ "<br><br>" +
//    					"<b>Name: </b>" + routesData[j][2]+"<br>" +
//    					"<b>Routes: </b>" + newStopList +"<br>";
//	
//	stopMarker = new google.maps.Marker({
//        position: new google.maps.LatLng(routesData[j][3], routesData[j][4]),
//        map: map,
//        info: stopString,
//        icon: stopIcon2
//    })
//		stopMarker.setVisible(false)
//	 google.maps.event.addListener(stopMarker, 'click', (function(marker, i){
//      	return function() {
//      	 infoWindow.setContent(this.info);
//           infoWindow.open(map, this);
//      	}
//  })(stopMarker, j));
//	
//}
});
}
=======
    }
    
    // Looping through the next 2 by coordinates to place Outdoors marker
    for (i = 13; i < 15; i++) {
        marker = new Marker({
            position: new google.maps.LatLng(points_of_interest[i][2], points_of_interest[i][3]),
            map: map,
            icon: {
				path: MAP_PIN,
				fillColor: '#0c2864',
				fillOpacity: 1,
				strokeColor: '',
				strokeWeight: 0
			},
			map_icon_label: '<i class="fa fa-tree fa-2x" style="margin-bottom:17px; color:white;"></i>'
            //icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(points_of_interest[i][1]);
                infowindow.open(map, marker);
            }
        })(marker, i));

    }
	
	// Looping through final 13 by coordinates to place Venue marker
    for (i = 15; i < points_of_interest.length; i++) {
        marker = new Marker({
            position: new google.maps.LatLng(points_of_interest[i][2], points_of_interest[i][3]),
            map: map,
            icon: {
				path: MAP_PIN,
				fillColor: '#FFD527',
				fillOpacity: 1,
				strokeColor: '',
				strokeWeight: 0
			},
			map_icon_label: '<i class="fa fa-music fa-2x" style="margin-bottom:17px; color:white;"></i>'
            //icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
>>>>>>> 2268d8e47d44eedf2c8249e524156489e978de70

function geoLocation(){
	map.setZoom(12);
	map.setCenter(pos);
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found');
    infoWindow.open(map, marker);
}
$(document).ready(function (){
  $("#buttonLocation").on('click', function ()
  {
	  geoLocation();	  
	});
});

<<<<<<< HEAD
google.maps.event.addDomListener(window, 'load', tourismMap);

function newLocation(newLat,newLng){
	map.setZoom(16);
	map.setCenter({
		lat : newLat,
		lng : newLng
	});
	
	var j,stopList, newStopList, stopString;
	for (j = 0; j < routesData.length; j++){
		stopList = routesData[j][1];
		newStopList = stopList.replace(/[\[\]']+/g, '');
  
		stopString = "<b>Stop ID: </b>"+ routesData[j][0]+ "<br><br>" +
    					"<b>Name: </b>" + routesData[j][2]+"<br>" +
    					"<b>Routes: </b>" + newStopList +"<br>";
	
	stopMarker = new google.maps.Marker({
        position: new google.maps.LatLng(routesData[j][3], routesData[j][4]),
        map: map,
        info: stopString,
        icon: stopIcon2
    })
		stopMarker.setVisible(true)
	 google.maps.event.addListener(stopMarker, 'click', (function(marker, i){
      	return function() {
      	 infoWindow.setContent(this.info);
           infoWindow.open(map, this);
      	}
  })(stopMarker, j));
	
}
	}

//Here you set the function so when you click, the div id test will display new location.
// So you can create one for each of the attractions or create a loop and number your divs. 
$(document).ready(function (){
    $("#1").on('click', function ()
    {
	  newLocation(53.343792,-6.254572);
	  infowindow.open(map, marker);
	  
	});
  
	$("#2").on('click', function ()
    {
	  newLocation(53.3409059,-6.252502499999991);
	  infowindow.open(map, marker);
	  
	});
	
	$("#3").on('click', function ()
    {
	  newLocation(53.339612,-6.258326000000011);
	  infowindow.open(map, marker);
	  
	});
	
	$("#4").on('click', function ()
    {
	  newLocation(53.349349,-6.2607209999999895);
	  infowindow.open(map, marker);
	  
	});
	
	$("#5").on('click', function ()
    {
	  newLocation(53.3479417,-6.285923099999991);
	  infowindow.open(map, marker);
	  
	});
	
	$("#6").on('click', function ()
    {
	  newLocation(53.34288609999999,-6.267428399999972);
	  infowindow.open(map, marker);
	  
	});
	
	$("#7").on('click', function ()
    {
	  newLocation(53.344719,-6.300155);
	  infowindow.open(map, marker);
	  
	});
	
	$("#8").on('click', function ()
    {
	  newLocation(53.3395154,-6.271476699999994);
	  infowindow.open(map, marker);
	  
	});
	
	$("#9").on('click', function ()
    {
	  newLocation(53.3419,-6.2868);
	  infowindow.open(map, marker);
	  
	});
	
	$("#10").on('click', function ()
    {
	  newLocation(53.3483761,-6.277354400000036);
	  infowindow.open(map, marker);
	  
	});
	
	$("#11").on('click', function ()
    {
	  newLocation(53.3561935,-6.305289799999969);
	  infowindow.open(map, marker);
	  
	});
	
	$("#12").on('click', function ()
    {
	  newLocation(53.36510000000001,-6.3585050000000365);
	  infowindow.open(map, marker);
	  
	});
	
	$("#13").on('click', function ()
    {
	  newLocation(53.342154,-6.259843499999988);
	  infowindow.open(map, marker);
	  
	});
	
	$("#14").on('click', function ()
    {
	  newLocation(53.3381736,-6.259119000000055);
	  infowindow.open(map, marker);
	  
	});
	
	$("#15").on('click', function ()
    {
	  newLocation(53.3716672,-6.270401799999945);
	  infowindow.open(map, marker);
	  
	});
	
	$("#1v").on('click', function ()
    {
	  newLocation(53.347496,-6.228508);
	  infowindow.open(map, marker);
	  
	});
	
	$("#2v").on('click', function ()
    {
	  newLocation(53.360712,-6.251209);
	  infowindow.open(map, marker);
	  
	});
	
	$("#3v").on('click', function ()
    {
	  newLocation(53.334784,-6.258189);
	  infowindow.open(map, marker);
	  
	});
	
	$("#4v").on('click', function ()
    {
	  newLocation(53.342607,-6.277983);
	  infowindow.open(map, marker);
	  
	});
	
	$("#5v").on('click', function ()
    {
	  newLocation(53.344313,-6.266080);
	  infowindow.open(map, marker);
	  
	});
	
	$("#6v").on('click', function ()
    {
	  newLocation(53.335232,-6.228457);
	  infowindow.open(map, marker);
	  
	});
	
	$("#7v").on('click', function ()
    {
	  newLocation(53.325718,-6.229688);
	  infowindow.open(map, marker);
	  
	});
	
	$("#8v").on('click', function ()
    {
	  newLocation(53.355882,-6.329813);
	  infowindow.open(map, marker);
	  
	});
	
	$("#9v").on('click', function ()
    {
	  newLocation(53.343605,-6.304168);
	  infowindow.open(map, marker);
	  
	});
	
	$("#10v").on('click', function ()
    {
	  newLocation(53.348052,-6.239398);
	  infowindow.open(map, marker);
	  
	});
	
	$("#11v").on('click', function ()
    {
	  newLocation(53.335138,-6.261034);
	  infowindow.open(map, marker);
	  
	});
	
	$("#12v").on('click', function ()
    {
	  newLocation(53.344213,-6.240104);
	  infowindow.open(map, marker);
	  
	});
	
	$("#13v").on('click', function ()
    {
	  newLocation(53.2733,-6.2689);
	  infowindow.open(map, marker);
	  
	});
	
});

// Toggle function for Tourist Table on tourism.html
$(document).ready(function(){
	$("#TourismButton").click(function(){
		$("#toggleVenuesTable").hide();
		$("#toggleTourismTable").show();
	});
});
=======
    }
    
	// Adapted from: https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
    infoWindow = new google.maps.InfoWindow;
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            marker = new Marker({
            	position: pos,
            	map: map,
            	icon: {
					path: MAP_PIN,
					fillColor: '#3594D4',
					fillOpacity: 1,
					strokeColor: '',
					strokeWeight: 0
			},
			map_icon_label: '<i class="fa fa-male fa-2x" style="margin-bottom:17px; color:white; margin-left:1px;"></i>'
        });  
            

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found');
            infoWindow.open(map, marker);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
>>>>>>> 2268d8e47d44eedf2c8249e524156489e978de70

// Toggle function for Venues Table on tourism.html
$(document).ready(function(){
	$("#VenuesButton").click(function(){
		$("#toggleTourismTable").hide();
		$("#toggleVenuesTable").show();
	});
});

<<<<<<< HEAD
=======
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
}

// Toggle function for Tourist Table on tourism.html
$(document).ready(function(){
	$("#TourismButton").click(function(){
		$("#toggleTourismTable").toggle();
	});
});

// Toggle function for Venues Table on tourism.html
$(document).ready(function(){
	$("#VenuesButton").click(function(){
		$("#toggleVenuesTable").toggle();
	});
});

// Stephen: Testing functions for linking information tables to map with on-click functionality
//var test = document.getElementById('test');
//test.onclick = function(){
//	for (i = 0; i < points_of_interest.length; i++){
//		var lat = points_of_interest[i][2];
//		var long = points_of_interest[i][3];
//		var mapOptions = {
//			center: new.google.maps.LatLng(lat,long),
//			zoom: 17
//		};
//		var map = new google.maps.Map(document.getElementById("map_tourism"), mapOptions);
//			}
//		});
//	}
//}

//$(document).ready(function() {
//    $(document).on("click", ".button", function(e) {
//        var latLng = $(this).attr("data-latLng");			
//        findLocation(latLng);
//    });
//    
//    function findLocation(latLng) {
//    	tourismMap()
//        latLng = latLng.split(",")
//        var mapOptions = {
//            center: new google.maps.LatLng(latLng[0],latLng[1]),
//            zoom: 17
//        };
//        var map = new google.maps.Map(document.getElementById("map_tourism"), mapOptions);
//    }
//});
>>>>>>> 2268d8e47d44eedf2c8249e524156489e978de70

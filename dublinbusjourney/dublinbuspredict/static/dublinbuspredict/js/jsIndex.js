function searchFunctionRoute() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("search-box-1");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dropdown-list-1");
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

function getStops(route) {
    document.getElementById("search-box-1").value = route;
    console.log(route);
    document.getElementById('search-box-2').onkeyup = function(e){searchFunctionSRC()};
    document.getElementById('spinner2').style.display = 'block';
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/pilotRoutes", {"route":route}, function(d) {
        console.log(d)
        document.getElementById("dropdown-list-2").innerHTML = "";
        document.getElementById("search-box-2").value = "";
        document.getElementById("search-box-3").value = "";
        $.each(d['stops'], function(i, p) {
            $('#dropdown-list-2').append($('<li></li>').val(p[0]).html('<a onclick=getStopsDest(' + p[0] + ')>' + route + ' - ' + p[0] + '</a>'));
        });
        document.getElementById('spinner2').style.display = 'none';
    });
}

function searchFunctionSRC() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("search-box-2");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dropdown-list-2");
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

function getStopsDest(source) {
    document.getElementById("search-box-2").value = source;
    route = document.getElementById("search-box-1").value;
    document.getElementById('spinner3').style.display = 'block';
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/pilotDest", {"route":route, "source":source}, function(d) {
        console.log(d)
        document.getElementById("dropdown-list-3").innerHTML = "";
        document.getElementById("search-box-3").value = "";
        $.each(d['stops'], function(i, p) {
            $('#dropdown-list-3').append($('<li></li>').val(p[0]).html('<a onclick=getStopsDestExtra(' + p[0] + ')>' + route + ' - ' + p[0] + '</a>'));
        });
        document.getElementById('spinner3').style.display = 'none';
    });
}

function getStopsDestExtra(stop){
    document.getElementById("search-box-3").value = stop;   
	var validate = false;
	
	var routeInput = document.getElementById("search-box-1").value;
	var sourceInput = document.getElementById("search-box-2").value;
	var destInput = document.getElementById("search-box-3").value;
	
	if (routeInput !='' && sourceInput !='' && sourceInput !=''){
		validate = true;
		document.getElementById("submit-route").disabled = false;
	}
}

function searchFunctionDest() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("search-box-3");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dropdown-list-3");
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

function getStopsStartingFromSource(stop){
    console.log('Stop is', stop)
    document.getElementById("search-box-2").value = stop
    document.getElementById('spinner3').style.display = 'block';
    console.log('Display;', document.getElementById('spinner3').style.display)
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/getStopsStartingFromSource", {"source":stop}, function(d) {
        console.log(d)
        document.getElementById("dropdown-list-1").innerHTML = "";
        document.getElementById("search-box-1").value = "";
        document.getElementById("dropdown-list-3").innerHTML = "";
        document.getElementById("search-box-3").value = "";
        $.each(d['stops'], function(i, p) {
            $('#dropdown-list-3').append($('<li></li>').val(p).html('<a onclick=getStopsDestExtraRoute(' + p + ')>'+ p + '</a>'));
        });
        document.getElementById('spinner3').style.display = 'none';
        console.log('heredddddddd')
    });
}

function getStopsDestExtraRoute(route){
    document.getElementById("search-box-3").value = route;
    document.getElementById("dropdown-list-1").innerHTML = "";
    source = document.getElementById("search-box-2").value;
    dest = document.getElementById("search-box-3").value;
    document.getElementById('spinner1').style.display = 'block';
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/getStopsDestExtraRoute", {"source":source, "dest":dest}, function(d) {
        console.log(d)
        $.each(d['routes'], function(i, p) {
            console.log(p)
            $('#dropdown-list-1').append($('<li></li>').val(p).html('<a onclick=getExtraRoute("' + p + '")>'+ p + '</a>'));
        });
        document.getElementById('spinner1').style.display = 'none';
    });
}

function getExtraRoute(route){
	document.getElementById("search-box-1").value = route;
	var validate = false;
	
	var routeInput = document.getElementById("search-box-1").value;
	var sourceInput = document.getElementById("search-box-2").value;
	var destInput = document.getElementById("search-box-3").value;
	
	if (routeInput !='' && sourceInput !='' && sourceInput !=''){
		validate = true;
		document.getElementById("submit-route").disabled = false;
	}
}

function loadRoutes(){
    console.log('HEReeeeeeeeeeeeeee!')
    var counter = 0
    document.getElementById("dropdown-list-1").innerHTML = "";
    document.getElementById("search-box-1").value = "";
    document.getElementById("dropdown-list-2").innerHTML = "";
    document.getElementById("search-box-2").value = "";
    document.getElementById("dropdown-list-3").innerHTML = "";
    document.getElementById("search-box-3").value = "";
    document.getElementById('search-box-2').onkeyup = function(e){newSearch()};
    var a = $.getJSON("http://127.0.0.1:8000/dublinbuspredict/loadRoutesForMap", null, function(d) {
        $.each(d['list_routes'], function(i, p) {
            $('#dropdown-list-1').append($('<li></li>').val(p).html('<a onclick=getStops("' + p + '")>' + p + '</a>'));
        })
//        $.each(d['list_stops'], function(i, p) {
//            $('#dropdown-list-2').append($('<li></li>').val(p).html('<a onclick=getStopsStartingFromSource("' + p + '")>' + p + '</a>'));
//        })
    });
}

function loadOrigin(){
    console.log('hereee!')
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/loadRoutesForMap", null, function(d) {
             $.each(d['list_stops'], function(i, p) {
                list_origin_dropdown.push(p);
             });
    });

}

function newSearch(){
    stop = document.getElementById('search-box-2').value;
    console.log(stop);
    var node;
    var textnode;
    text = '';
    document.getElementById("dropdown-list-2").innerHTML = "";
    var i;
    document.getElementById('spinner2').style.display = 'block';
    for(i = 0; i < list_origin_dropdown.length; i++){
        if (list_origin_dropdown[i].toString().indexOf(stop.toString()) != -1){
            if (stop.length > 0){
                var same = true;
                for (var j = 0; j < stop.length; j++){
                    if (stop[j] != list_origin_dropdown[i].toString()[j]){
                        same = false
                    }
                }
                if (same == true){
                    text += '<li><a onclick="getStopsStartingFromSource('+ list_origin_dropdown[i] +')">' + list_origin_dropdown[i] + '</a></li>'
                }
            }
        }
    }
    document.getElementById("dropdown-list-2").innerHTML = text;
    document.getElementById('spinner2').style.display = 'none';
}

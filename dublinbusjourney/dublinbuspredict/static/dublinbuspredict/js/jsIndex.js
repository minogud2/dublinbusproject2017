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
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/pilotRoutes", {"route":route}, function(d) {
        console.log(d)
        document.getElementById("dropdown-list-2").innerHTML = "";
        document.getElementById("search-box-2").value = "";
        document.getElementById("search-box-3").value = "";
    $.each(d['stops'], function(i, p) {
        $('#dropdown-list-2').append($('<li></li>').val(p).html('<a onclick=getStopsDest(' + p + ')>' + route + ' - ' + p + '</a>'));
    });
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
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/pilotDest", {"route":route, "source":source}, function(d) {
        console.log(d)
        document.getElementById("dropdown-list-3").innerHTML = "";
        document.getElementById("search-box-3").value = "";
    $.each(d['stops'], function(i, p) {
        $('#dropdown-list-3').append($('<li></li>').val(p).html('<a onclick=getStopsDestExtra(' + p + ')>' + route + ' - ' + p + '</a>'));
    });
    });
}

function getStopsDestExtra(stop){
    document.getElementById("search-box-3").value = stop;
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
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/getStopsStartingFromSource", {"source":stop}, function(d) {
        console.log(d)
        document.getElementById("dropdown-list-1").innerHTML = "";
        document.getElementById("search-box-1").value = "";
        document.getElementById("dropdown-list-3").innerHTML = "";
        document.getElementById("search-box-3").value = "";
    $.each(d['stops'], function(i, p) {
        console.log(p)
        $('#dropdown-list-3').append($('<li></li>').val(p).html('<a onclick=getStopsDestExtraRoute(' + p + ')>'+ p + '</a>'));
    });
    });
}

function getStopsDestExtraRoute(route){
    document.getElementById("search-box-3").value = route;
    source = document.getElementById("search-box-2").value;
    dest = document.getElementById("search-box-3").value;
    $.getJSON("http://127.0.0.1:8000/dublinbuspredict/getStopsDestExtraRoute", {"source":source, "dest":dest}, function(d) {
        console.log(d)
    $.each(d['routes'], function(i, p) {
        console.log(p)
        $('#dropdown-list-1').append($('<li></li>').val(p).html('<a onclick=getExtraRoute(' + p + ')>'+ p + '</a>'));
    });
    });
}

function getExtraRoute(route){
    document.getElementById("search-box-1").value = route;
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
    var a = $.getJSON("http://127.0.0.1:8000/dublinbuspredict/loadRoutesForMap", null, function(d) {
        $.each(d['list_routes'], function(i, p) {
            $('#dropdown-list-1').append($('<li></li>').val(p).html('<a onclick=getStops("' + p + '")>' + p + '</a>'));
        })
        $.each(d['list_stops'], function(i, p) {
            $('#dropdown-list-2').append($('<li></li>').val(p).html('<a onclick=getStopsStartingFromSource("' + p + '")>' + p + '</a>'));
        })
    });
}

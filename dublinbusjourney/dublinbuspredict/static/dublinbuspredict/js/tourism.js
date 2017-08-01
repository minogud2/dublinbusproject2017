
function tourismMap(){
    console.log('here')
    var points_of_interest = [
        [1, "Guinness Storehouse,<br>St James's Gate,<br>Dublin 8<br>" + '<a target="_blank" href="https://www.guinness-storehouse.com/en">Guinness Storehouse - Website</a>', '53.3419', '-6.2868'],
        [2, "Dublin Zoo,<br>Phoenix Park,<br>Dublin 8<br>" + '<a target="_blank" href="https://www.dublinzoo.ie/">Dublin Zoo - Website</a>', '53.3561935', '-6.305289799999969'],
        [3, "Trinity College Dublin,<br>College Green,<br>Dublin 2<br>" + '<a target="_blank" href="https://www.tcd.ie/visitors/book-of-kells/">Trinity College - Website</a>', '53.34369', '-6.25919'],
        [4, "National Gallery of Ireland,<br>Merrion Square West,<br>Dublin 2<br>" + '<a target="_blank" href="https://www.nationalgallery.ie/">National Gallery - Website</a>', '53.3409059', '-6.252502499999991'],
        [5, "National Botanic Gardens,<br>Glasnevin,<br>Dublin 9<br>" + '<a target="_blank" href="http://www.botanicgardens.ie/">Botanic Gardens - Website</a>', '53.3716672', '-6.270401799999945'],
        [6, "St. Patrick's Cathedral,<br>Wood Quay,<br>Dublin 8<br>" + '<a target="_blank" href="https://www.stpatrickscathedral.ie/">St. Patricks Cathedral - Website</a>', '53.3395154', '-6.271476699999994'],
        [7, "Irish Museum of Modern Art (IMMA),<br>Royal Hospital Kilmainham, Military Rd,<br>Dublin 8<br>" + '<a target="_blank" href="http://www.imma.ie/en/index.htm">IMMA - Website</a>', '53.344719', '-6.300155'],
        [8, "Farmleigh House,<br>White's Road,<br>Dublin 8<br>" + '<a target="_blank" href="http://www.farmleigh.ie/">Farmleigh House - Website</a>', '53.36510000000001', '-6.3585050000000365'],
        [9, "Old Jameson Distellery,<br>Bow Street, Smithfield Village,<br>Dublin 7<br>" + '<a target="_blank" href="https://www.jamesonwhiskey.com/ie/visit-us/jameson-distillery-bow-st">Jameson Distellery - Website</a>', '53.3483761', '-6.277354400000036'],
        [10, "Grafton Street,<br><br>Dublin 2<br>" + '<a target="_blank" href="http://graftonstreet.ie/">Grafton Street - Website</a>', '53.342154', '-6.259843499999988'],
        [11, "St. Stephen's Green ,<br><br>Dublin 2<br>" + '<a target="_blank" href="http://ststephensgreenpark.ie/">St. Stephens Green - Website</a>', '53.3381736', '-6.259119000000055'],
        [12, "The Little Museum of Dublin,<br>15 St Stephen's Green,<br>Dublin 2<br>" + '<a target="_blank" href="https://www.littlemuseum.ie/">The Little Museum of Dublin - Website</a>', '53.339612', '-6.258326000000011'],
        [13, "The G.P.O,<br>O'Connell Street Lower<br>Dublin 1<br>" + '<a target="_blank" href="http://www.gpowitnesshistory.ie/">The G.P.O - Website</a>', '53.349349', '-6.2607209999999895'],
        [14, "Collins Barracks,<br>Benburb Street,<br>Dublin 7<br>" + '<a target="_blank" href="http://www.museum.ie/Decorative-Arts-History">Museum - Website</a>', '53.3479417', '-6.285923099999991'],
        [15, "Dublin Castle,<br>Dame Street,<br>Dublin 2<br>" + '<a target="_blank" href="http://www.dublincastle.ie/">Dublin Castle - Website</a>', '53.34288609999999', '-6.267428399999972'],
        [16, "The Point,<br>North Wall Quay, North Dock,<br>Dublin 1", '53.347496', '-6.228508'],
        [17, "Croke Park,<br>Jones' Rd, Drumcondra,<br> Dublin 3", '53.360712', '-6.251209'],
        [18, "The National Concert Hall,<br>Earlsfort Terrace,<br> Dublin 2", '53.334784', '-6.258189'],
        [19, "Vicar Street,<br>58-59 Thomas St, The Liberties,<br> Dublin 8", '53.342607', '-6.277983'],
        [20, "The Academy,<br>57 Abbey Street Middle, North City,<br> Dublin 1", '53.348030', '-6.261998'],
        [21, "The Olympia Theatre,<br>72 Dame St, Temple Bar,<br> Dublin 2", '53.344313', '-6.266080'],
        [22, "Aviva Stadium,<br>Lansdowne Rd,<br> Dublin 4", '53.335232', '-6.228457'],
        [23, "RDS Arena,<br><br> Dublin 4", '53.325718', '-6.229688'],
        [24, "Phoenix Park,<br><br> Dublin 8", '53.355882', '-6.329813'],
        [25, "Irish Museum of Modern Art (IMMA),<br>Royal Hospital Kilmainham, Military Rd,<br>Dublin 8", '53.343605', '-6.304168'],
        [24, "The Convention Centre,<br>Spencer Dock, N Wall Quay, North Dock,<br> Dublin 1", '53.348052', '-6.239398'],
        [24, "Iveagh Gardens,<br>Clonmel St, Saint Kevin's,<br> Dublin 2", '53.335138', '-6.261034'],
        [25, "Bord Gais Energy Theatre,<br>Grand Canal Quay, Grand Canal Dock,<br> Dublin 2", '53.344213', '-6.240104'],
        [25, "Marlay Park,<br>Grange Road, Rathfarnham,<br> Dublin 16", '53.2733', '-6.2689'],

    ];


    var map = new google.maps.Map(document.getElementById('map_tourism'), {
        zoom: 11,
        center: new google.maps.LatLng(53.35410685206609, -6.285796167333956),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < 15; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(points_of_interest[i][2], points_of_interest[i][3]),
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(points_of_interest[i][1]);
                infowindow.open(map, marker);
            }
        })(marker, i));

    }


    for (i = 15; i < points_of_interest.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(points_of_interest[i][2], points_of_interest[i][3]),
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(points_of_interest[i][1]);
                infowindow.open(map, marker);
            }
        })(marker, i));

    }

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
}

import json

from django.http import HttpResponse
from django.shortcuts import render
from calendar import weekday
from dateutil import parser
from datetime import datetime, timedelta

try:
    import pymysql
    pymysql.install_as_MySQLdb()
except:
    pass
from .models import PilotRoutes
from django.db.models import Q
from .Algorithms import project_central
import MySQLdb
from .Algorithms import time_date
from collections import Counter

route_id, source_id, destination_id, direction = '17', 1, 1, 1
time, date = 0, 0
day_of_week = ''
new_info_buses = ['1']
old_info_buses = []
list_routes = ['1', '4', '7', '9', '11', '13', '14', '15', '16', '17', '18', '25', '27', '31', '32',
                   '33', '37', '38', '39', '40', '41', '42', '43', '44', '47', '49', '53', '59', '61', '63',
                   '65', '66', '67', '68', '69', '70', '75', '76', '79', '83', '84', '102', '104', '111',
                   '114', '116', '118', '122', '123', '130', '140', '142', '145', '150', '151', '161', '184',
                   '185', '220', '236', '238', '239', '270', '747', '757', '14C', '15A', '15B', '16C', '17A',
                   '25A', '25B', '25D', '25X', '26A', '27A', '27B', '27X', '29A', '31A', '31B', '31D', '32A', '32X',
                   '33A', '33B', '33X', '38A', '38B', '38D', '39A', '40B', '40D', '41A', '41B', '41C', '41X', '42D',
                   '44B', '45A', '46A', '46E', '51D', '51X', '54A', '56A', '65B', '66A', '66B', '66X', '67X', '68A',
                   '68X', '69X', '70D', '76A', '77A', '77X', '79A', '7A', '7B', '7D', '83A', '84A', '84X']

def index(request):
    global list_routes
    db = MySQLdb.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    cursor = db.cursor()
    cursor.execute("SELECT distinct(bus_routes.route_id) "
                   "FROM bus_routes;")
    rows = cursor.fetchall()
    routes = []
    for i in rows:
        routes.append(i[0])
    cursor.execute("SELECT bus_stops.stop_id "
                   "FROM bus_stops;")
    rows2 = cursor.fetchall()
    db.close()
    stops = []
    for i in rows2:
        stops.append(i[0])
    return render(request, 'dublinbuspredict/index.html', {'list_routes': routes, 'list_stops': stops})

def pilot_routes(request):
    route_id = request.GET.get('route')
    # route_stops = PilotRoutes.objects.filter(route_id=route_id)
    db = pymysql.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    cursor = db.cursor()
    # print('Direction!', direction)
    query = "SELECT bus_routes.stop_id " \
            "FROM bus_routes " \
            "WHERE bus_routes.route_id ='" + str(route_id) + "' ORDER BY stop_sequence;"
    # print("queryyyy", query)
    cursor.execute(query)
    stop_list = cursor.fetchall()
    # query = "SELECT bus_timetable.trip_id " \
    #         "FROM bus_timetable " \
    #         "WHERE direction ='" + str(1) + "' and route_id ='" + str(route_id) + \
    #         "' ORDER BY stop_sequence limit 1;"
    # print("queryyyy", query)
    # cursor.execute(query)
    # trip_inbound = cursor.fetchall()
    # query = "SELECT bus_timetable.stop_id " \
    #         "FROM bus_timetable " \
    #         "WHERE trip_id ='" + str(trip_inbound[0][0]) + "' and route_id ='" + str(route_id) + \
    #         "' ORDER BY stop_sequence;"
    # print("queryyyy", query)
    # cursor.execute(query)
    # stops_inbound = cursor.fetchall()
    # query = "SELECT bus_timetable.stop_id " \
    #         "FROM bus_timetable " \
    #         "WHERE trip_id ='" + str(trip_outbound[0][0]) + "' and route_id ='" + str(route_id) + \
    #         "' ORDER BY stop_sequence;"
    # print("queryyyy", query)
    # cursor.execute(query)
    # stops_outbound = cursor.fetchall()
    # print(stops_inbound, stops_outbound)
    # # Close connection
    # db.close()
    stops = []
    for i in stop_list:
        stops.append(i[0])
    # for j in stops_outbound:
    #     stops.append(j[0])
    return HttpResponse(json.dumps({"stops":stops}), content_type='application/json')


def pilot_dest(request):
    source_id = request.GET.get('source')
    route_id = request.GET.get('route')
    global direction
    db = pymysql.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    cursor = db.cursor()
    query = "SELECT bus_routes.direction " \
                "FROM bus_routes " \
                "WHERE stop_id =" + str(source_id) + " and route_id ='" + str(route_id) + \
                "' ORDER BY stop_sequence limit 1;"
    cursor.execute(query)
    direction = cursor.fetchall()
    query = "SELECT bus_routes.stop_id " \
            "FROM bus_routes " \
            "WHERE direction ='" + str(direction[0][0]) + "' and route_id ='" + str(route_id) + \
            "' ORDER BY stop_sequence;"
    cursor.execute(query)
    print(query)
    bus_stops = cursor.fetchall()
    # print('Trip_id', trip_id)
    # query = "SELECT bus_timetable.stop_id " \
    #         "FROM bus_timetable " \
    #         "WHERE trip_id ='" + str(trip_id[0][0]) + \
    #         "' ORDER BY stop_sequence;"
    # print(query)
    # cursor.execute(query)
    # bus_stops = cursor.fetchall()
    # bus_stops = PilotRoutes.objects.filter(Q(route_id=route_id) & Q(direction=direction))
    print('Bus stops for maps!', bus_stops)
    stops = []
    found = False
    for i in bus_stops:
        if str(i[0]) == str(source_id):
            found = True
            continue
        if found:
            stops.append(i[0])
    return HttpResponse(json.dumps({"stops":stops}), content_type='application/json')

def run_model(request):
    global route_id
    global source_id
    global destination_id
    global new_info_buses
    route_id = request.GET.get('route')
    source_id = request.GET.get('source')
    destination_id = request.GET.get('destination')
    new_info_buses = project_central.main(route_id, source_id, destination_id)
    return HttpResponse(json.dumps({'info_buses': new_info_buses}), content_type='application/json')

def set_info_next_page(request):
    global route_id, source_id, destination_id, time, date, day_of_week
    route_id = request.GET.get('route')
    source_id = request.GET.get('source')
    destination_id = request.GET.get('destination')
    time = request.GET.get('time')
    date = request.GET.get('date')
    day_of_week = time_date.day(date)
    print('Day of the week', day_of_week)

def get_info_next_page(request):
    global route_id, source_id, destination_id, time, date
    return HttpResponse(json.dumps({'source': source_id, 'destination':destination_id, 'route':route_id, 'time':time, 'date':date}), content_type='application/json')

def load_routes_for_map(request):
    global list_routes
    global source_id
    global route_id
    global destination_id
    global time, date
    global day_of_week
    print(day_of_week)
    db = MySQLdb.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    cursor = db.cursor()
    cursor.execute("SELECT distinct(bus_routes.route_id) "
                   "FROM bus_routes;")
    rows = cursor.fetchall()
    routes = []
    for i in rows:
        routes.append(i[0])
    cursor.execute("SELECT bus_stops.stop_id "
                   "FROM bus_stops;")
    rows2 = cursor.fetchall()
    db.close()
    stops = []
    for i in rows2:
        stops.append(i[0])
    global new_info_buses
    return HttpResponse(json.dumps({'list_routes': routes, 'list_stops': stops, 'info_buses': new_info_buses}), content_type='application/json')

def run_planner(request):
    global route_id
    global source_id
    global destination_id
    global new_info_buses
    route_id = request.GET.get('route')
    source_id = request.GET.get('source')
    destination_id = request.GET.get('destination')
    date = request.GET.get('date')
    time = request.GET.get('time')
    new_info_buses = time_date.time_date(route_id, source_id, destination_id, date, time)
    return HttpResponse(json.dumps({'info_buses': new_info_buses}), content_type='application/json')

def map(request):
    return render(request, 'dublinbuspredict/map.html')

def connections(request):
    return render(request, 'dublinbuspredict/connections.html')

def contact(request):
    return render(request, 'dublinbuspredict/contact.html')

def tourism(request):
    return render(request, 'dublinbuspredict/tourism.html')

def tickets_fares(request):
    return render(request, 'dublinbuspredict/tickets_fares.html')

def sampleQuery(rows):
    # Connect to database using these credentials.
    global route_id, source_id, destination_id, direction, date, time, day_of_week
    if day_of_week == "":
        d = datetime.now().date()
        d = d.strftime('%m/%d/%y')
        day_of_week = time_date.day(d)
    if time == 0:
        time = datetime.now().time().strftime('%H:%M:%S')
    print("HELLO THIS IS MY ", day_of_week)
    print("HELLO THIS IS MY " , time)
    print('Route:', route_id)
    print('direction:', direction)
    
    db = MySQLdb.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    cursor = db.cursor()
    cursor.execute("SELECT DISTINCT bus_timetable.stop_id, bus_timetable.stop_sequence, bus_stops.name, bus_stops.long_name, bus_stops.lat, bus_stops.lon "
                   "FROM bus_timetable, bus_stops "
                   "WHERE bus_timetable.stop_id = bus_stops.stop_id AND bus_timetable.direction = '" + str(direction) + "' AND bus_timetable.route_id = '"+ str(route_id) +\
                   "' AND bus_timetable.arrival_time >= '" + str(time) + "'AND bus_timetable.day_of_week = '" + str(day_of_week)+ "'"
                   "ORDER BY bus_timetable.stop_sequence;")
    rows = cursor.fetchall()
    # for i in rows:
    #     print(i)
    #     break
    db.close()
    print(rows)
    return HttpResponse(json.dumps({'data': rows}), content_type="application/json")

def get_stops_starting_from_source(request):
    source_id = request.GET.get('source')
    print('Running:', source_id)
    db = MySQLdb.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    cursor = db.cursor()
    print('past the cursor')
    cursor.execute("select distinct(route_id) "
                   "from summerProdb.bus_routes where stop_id ='" + str(source_id) + "';")
    rows = cursor.fetchall()
    stops = []
    getting_stops = []
    print('past the fetchall')
    for i in rows:
        cursor.execute("select distinct(stop_id) from summerProdb.bus_routes where route_id='" + i[0] + "';")
        result = cursor.fetchall()
        found = False
        for i in result:
            if str(i[0]) == str(source_id):
                found = True
            elif found:
                if i[0] not in getting_stops:
                    getting_stops.append(i[0])
    db.close()
    getting_stops = sorted(getting_stops)
    for i in getting_stops:
        print(i)
    return HttpResponse(json.dumps({'stops': getting_stops}), content_type="application/json")

def get_stops_dest_extra_route(request):
    source_id = request.GET.get('source')
    dest_id = request.GET.get('dest')
    db = MySQLdb.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    cursor = db.cursor()
    print('past the cursor')
    cursor.execute("select route_id "
                   "from summerProdb.bus_routes where stop_id ='" + str(source_id) + "';")
    rows = cursor.fetchall()
    routes = []
    for i in rows:
        routes.append(i[0])
    print('routes:', routes)
    cursor.execute("select route_id "
                   "from summerProdb.bus_routes where stop_id='" + str(dest_id) + "';")
    rows2 = cursor.fetchall()
    routes2 = []
    for i in rows2:
        routes2.append(i[0])
    print('routes 2:', routes2)
    routes3 = []
    for i in routes:
        if i in routes2:
            routes3.append(i)
    print('routes 3:', routes3)
    return HttpResponse(json.dumps({'routes': routes3}), content_type="application/json")

import requests
try:
    import pymysql
    pymysql.install_as_MySQLdb()
except:
    pass


def get_stop_list(route, direction, dest):
    if direction == 'Inbound':
        direction = 1
    elif direction == 'Outbound':
        direction = 0
    print(route, direction, dest)
    db = pymysql.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    cursor = db.cursor()
    query = "SELECT bus_timetable.trip_id " \
            "FROM bus_timetable " \
            "WHERE direction =" + str(direction) + " and route_id ='" + str(route) + \
            "' ORDER BY stop_sequence limit 1;"
    cursor.execute(query)
    rows = cursor.fetchall()
    query = "SELECT bus_timetable.stop_id " \
            "FROM bus_timetable " \
            "WHERE trip_id ='" + str(rows[0][0]) + "' and route_id ='" + str(route) + \
            "' ORDER BY stop_sequence;"
    cursor.execute(query)
    rows2 = cursor.fetchall()
    db.close()
    stop_list = []
    for i in rows2:
        stop_list.append(i[0])
        if str(i[0]) == str(dest):
            break
    return stop_list


def get_real_time(route_id, stop_id, position):
    base_url = 'https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=' + str(stop_id) + '&routeid=' + str(route_id) + '&maxresults&operator&format=json'
    response = requests.get(base_url)
    results = response.json()
    try:
        bus_at = [{'stopid':stop_id, 'duetime':results['results'][position]['duetime'], 'scheduledarrivaldatetime':results['results'][position]['scheduledarrivaldatetime'], 'arrivaldatetime':results['results'][position]['arrivaldatetime'],
                              'direction':results['results'][position]['direction'], 'origin':results['results'][position]['origin'], 'destination':results['results'][position]['destination']}]
    except:
        bus_at = [{'stopid':stop_id, 'duetime':results['results'][len(results['results']) - 1]['duetime'], 'scheduledarrivaldatetime':results['results'][len(results['results']) - 1]['scheduledarrivaldatetime'], 'arrivaldatetime':results['results'][len(results['results']) - 1]['arrivaldatetime'],
                              'direction':results['results'][len(results['results']) - 1]['direction'], 'origin':results['results'][len(results['results']) - 1]['origin'], 'destination':results['results'][len(results['results']) - 1]['destination']}]
    return bus_at


def central(route, source, dest, direction, position):
    route_stops = get_stop_list(route, direction, dest)
    position = int(position)
    bus_stops = []
    source_reached = False
    for i in range(len(route_stops) - 1, -1, -1):
        if str(route_stops[i]) == str(source):
            source_reached = True
        if source_reached:
            x = get_real_time(route, route_stops[i], int(position))
            # print(x)
            if source_reached and len(bus_stops) != 0 and x[0]['duetime'] != 'Due' and len(bus_stops[len(bus_stops) - 1]) != 1 and int(x[0]['duetime']) > int(bus_stops[len(bus_stops) - 1]['duetime']):
                if position == 0:
                    bus_stops.append([{'stopid':x[0]['stopid'], 'arrival':x[0]['arrivaldatetime']}])
                    break
                position -= 1
                x = get_real_time(route, route_stops[i], position)
            if len(bus_stops) != 0 and x[0]['duetime'] == 'Due' and source_reached:
                bus_stops.append([{'stopid':x[0]['stopid'], 'arrival':x[0]['arrivaldatetime']}])
                return bus_stops
            if i == 0:
                bus_stops.append([{'stopid':x[0]['stopid'], 'arrival':x[0]['arrivaldatetime']}])
                return bus_stops
            bus_stops.append([{'stopid':x[0]['stopid'], 'duetime':x[0]['duetime'], 'arrival':x[0]['arrivaldatetime']}])
        else:
            bus_stops.append([{'stopid':route_stops[i]}])
    return(bus_stops)


def get_buses(route_id, source_id):
    base_url = 'https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=' + str(source_id) + '&routeid=' + str(route_id) + '&maxresults&operator&format=json'
    response = requests.get(base_url)
    results = response.json()
    counter = 0
    first_3_buses = []
    for i in results['results']:
        if counter == 3:
            break
        first_3_buses.append({'duetime':i['duetime'], 'scheduledarrivaldatetime':i['scheduledarrivaldatetime'], 'arrivaldatetime':i['arrivaldatetime'],
                              'direction':i['direction'], 'origin':i['origin'], 'destination':i['destination'], 'order':counter})
        counter += 1
    print(first_3_buses)
    return first_3_buses

if __name__ == '__main__':
    route = '15B'
    source = '5132'
    dest = '354'
    buses = get_buses(route, source)
    direction = buses[0]['direction']
    # list_stops = get_stop_list(route, direction, dest)
    for i in range(len(buses)):
        print(central(route, source, dest, direction, i))
        print('\n\n\n\n\n<<<<<<<<<<<------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

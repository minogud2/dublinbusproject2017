try:
    import pymysql
    pymysql.install_as_MySQLdb()
except:
    pass
from dateutil import parser
from datetime import datetime, timedelta
import requests
# from dublinbusjourney.dublinbuspredict.Algorithms.model_prototype_1 import model
from .model_prototype_1 import model
# from sshtunnel import SSHTunnelForwarder

def day(date):
    weekday = datetime.weekday(parser.parse(date))
    if weekday < 5:
        weekday = 'business day'
    elif weekday == 5:
        weekday = 'saturday'
    elif weekday == 6:
        weekday = 'sunday'
    return weekday


def get_all_stops(time, bus_route, source_stop, destination_stop, date):
    query_day = day(date)
    p_holiday = holidays(date)[0]
    if p_holiday:
        query_day = 'sunday'
    db = pymysql.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    cursor = db.cursor()
    cursor.execute("select * from bus_timetable where bus_timetable.arrival_time > '" + str(time) + "' and bus_timetable.route_id = '" + str(bus_route) + "' and bus_timetable.stop_id = '" + str(source_stop) + "' and bus_timetable.day_of_week = '" + str(query_day) + "' order by bus_timetable.arrival_time ASC limit 1;")
    rows = cursor.fetchall()
    print(rows)
    print(str(rows[0][4]))
    print(str(rows[0][1]))
    cursor.execute("select bus_timetable.arrival_time, bus_timetable.stop_id from bus_timetable where bus_timetable.trip_id = '" + str(rows[0][1]) + "';")
    rows2 = cursor.fetchall()
    print(rows2)
    stops = []
    found = False
    for i in rows2:
        if str(i[1]) == str(source_stop):
            found = True
        if found:
            try:
                stops.append([i[1], i[0], rows2[rows2.index(i) - 1][1]])
            except IndexError:
                stops.append([i[1], i[0], 'Starting stop'])
        if str(i[1]) == str(destination_stop):
            break
    return stops


def holidays(date):
    publicholidays_2017 = ['2017-08-07', '2017-10-30', '2017-12-25', '2017-12-26',
                        '2017-12-27']
    schoolholidays_2017 = ['2017-07-07', '2017-08-07', '2017-09-07', '2017-10-07',
                        '2017-11-07', '2017-12-07', '2017-07-13', '2017-07-14',
                        '2017-07-15', '2017-07-16', '2017-07-17', '2017-07-18',
                        '2017-07-19', '2017-07-20', '2017-07-21', '2017-07-22',
                        '2017-07-23', '2017-07-24', '2017-07-25', '2017-07-26',
                        '2017-07-27', '2017-07-28', '2017-07-29', '2017-07-30',
                        '2017-07-31', '2017-01-08', '2017-02-08', '2017-03-08',
                        '2017-04-08', '2017-05-08', '2017-06-08', '2017-07-08',
                        '2017-08-08', '2017-09-08', '2017-10-08', '2017-11-08',
                        '2017-12-08', '2017-08-13', '2017-08-14', '2017-08-15',
                        '2017-08-16', '2017-08-17', '2017-08-18', '2017-08-19',
                        '2017-08-20', '2017-08-21', '2017-08-22', '2017-08-23',
                        '2017-08-24', '2017-08-25', '2017-08-26', '2017-08-27',
                        '2017-08-28', '2017-08-29', '2017-08-30', '2017-08-31',
                        '2017-10-28', '2017-10-29', '2017-10-30', '2017-10-31',
                        '2017-01-11', '2017-02-11', '2017-03-11', '2017-04-11',
                        '2017-05-11', '2017-12-23', '2017-12-24', '2017-12-25',
                        '2017-12-26', '2017-12-27', '2017-12-28', '2017-12-29',
                        '2017-12-30', '2017-12-31']
    date = date[6:10] + '-' + date[3:5] + '-' + date[:2]
    p_holiday = False
    s_holiday = False
    if date in publicholidays_2017:
        p_holiday = True
    if date in schoolholidays_2017:
        s_holiday = True
    return p_holiday, s_holiday


def weather():
    base_url_time_machine = 'http://api.wunderground.com/api/c59c002ced7bb1cb/conditions/q/IE/Dublin.json'
    response = requests.get(base_url_time_machine)
    results = response.json()
    return results['current_observation']['precip_1hr_metric'][1:], results['current_observation']['wind_kph'], results['current_observation']['temp_c']
    # for i in results['current_observation']:
    #     print(i)

def time_to_arrive(datetime, sec):
    print(datetime, sec)
    #year = (int(datetime[6:10]) * 31556926) + (int(datetime[3:5]) * 2629743.83) + (int(datetime[:2]) * 86400) + (int(datetime[11:13]) * 3600) + (int(datetime[14:16]) * 60) + (int(datetime[17:]))
    new_time = datetime + timedelta(seconds=sec)
    new_time = new_time.strftime('%d/%m/%Y %H:%M:%S')
    return new_time

def time_date(bus_route, source_stop, destination_stop, date, time):
    stops = get_all_stops(time, bus_route, source_stop, destination_stop, date)
    holiday = holidays(date)
    p_holiday = holiday[0]
    s_holiday = holiday[1]
    weekday = datetime.weekday(parser.parse(date))
    # forecast = weather()
    rain = 0
    wind = 0.0
    temp = 0.0
    print('stops', stops)
    dict = []
    status = 0
    for i in stops:
        print(i[0], str(i[1]))
        if stops.index(i) == 0:
            status = 'src'
        elif stops.index(i) == len(stops) - 1:
            status = 'dest'
        else:
            status = 'normal'
        duration = model(bus_route, i[0], str(i[1]), weekday, p_holiday, s_holiday, rain, wind, temp)[0]
        predicted_arrival_time = (time_to_arrive(parser.parse(date + ' ' + str(i[1])), duration))
        # predicted_arrival_time = (time_to_arrive(parser.parse(j['datetime']), j['duration']))
        print(predicted_arrival_time)
        # str(timedelta(seconds=
        dict.append({'stopid':i[0], 'previous_stop':i[2], 'duration':duration, 'predicted_arrival_time':predicted_arrival_time})
    print(dict)
    return dict

if __name__ == '__main__':
    bus_route = '76'
    source_stop = '2112'
    destination_stop = '2123'
    date = '26/07/2017'
    time = '17:33'
    # weekday = 'business day'
    time_date(bus_route, source_stop, destination_stop, date, time)

from boto.mws.response import Destination
try:
    import pymysql
    pymysql.install_as_MySQLdb()
except:
    pass
from dateutil import parser
from datetime import datetime, timedelta
from .model_prototype_1 import model
import requests
# from dublinbusjourney.dublinbuspredict.Algorithms.model_prototype_1 import model
# from sshtunnel import SSHTunnelForwarder
import pandas as pd
pd.options.mode.chained_assignment = None
from sklearn.externals import joblib
from dateutil import parser
from datetime import datetime

def day(date):
    weekday = datetime.weekday(parser.parse(date))
    if weekday < 5:
        weekday = 'business_day'
    elif weekday == 5:
        weekday = 'saturday'
    elif weekday == 6:
        weekday = 'sunday'
    return weekday

def get_all_stops(time, bus_route, source_stop, destination_stop, date, direction):
    holiday = holidays(date)
    p_holiday = holiday[0]
    s_holiday = holiday[1]
    direction = direction
    print("DIRECTION IS", direction)
    print(date)
    query_day = day(date)
    print("time is", time)
    print('Data:', time, bus_route, source_stop, destination_stop, date, direction)
    if p_holiday:
        query_day = 'sunday'
#     print("TIME IS",time)
#     print("BUS ROUTE", bus_route)
#     print("Source", source_stop)
#     print("query day", query_day)
    db = pymysql.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    cursor = db.cursor()
    rows1 = ()
    sql1 = """SELECT bus_timetable.trip_id
                FROM bus_timetable WHERE bus_timetable.arrival_time >= time_format('{q1time}','%T')
                AND bus_timetable.route_id = '{qbus_route}'
                AND bus_timetable.stop_id = '{qsource_stop}'
                AND bus_timetable.day_of_week = '{qquery_day}'
                AND bus_timetable.direction = '{qdirection}'
                ORDER BY bus_timetable.arrival_time ASC
                LIMIT 3"""
    print('SQL 1:', sql1)
    cursor = db.cursor()
    while rows1 == ():
        cursor.execute(sql1.format(q1time=str(time),qbus_route=str(bus_route),\
                               qsource_stop=str(source_stop), qquery_day=str(query_day), qdirection=str(direction)))
        rows1 = cursor.fetchall()
        if direction == 0:
            direction = 1
        elif direction == 1:
            direction = 0
    print('Rows1:', rows1)
    # Create query for the first prediction
    sql2 = """SELECT time_format(bus_timetable.arrival_time,'%T') , bus_timetable.stop_id, bus_timetable.stop_sequence, bus_stops.long_name, bus_timetable.accum_dist
            FROM bus_timetable, bus_stops WHERE trip_id = '{qtrip_id}'
            AND bus_timetable.arrival_time >= '{q2time}' AND bus_timetable.stop_id = bus_stops.stop_id
            ORDER BY bus_timetable.stop_sequence"""
    print('SQL 2:', sql2)
    cursor = db.cursor()
    cursor.execute(sql2.format(qtrip_id=str(rows1[0][0]),q2time=str(time)))
    rows2 = cursor.fetchall()
    # create query for the second prediction
    sql3 = """SELECT time_format(bus_timetable.arrival_time,'%T') , bus_timetable.stop_id, bus_timetable.stop_sequence, bus_stops.long_name, bus_timetable.accum_dist
            FROM bus_timetable, bus_stops WHERE trip_id = '{qtrip_id}'
            AND bus_timetable.arrival_time >= '{q2time}' AND bus_timetable.stop_id = bus_stops.stop_id
            ORDER BY bus_timetable.stop_sequence"""
    print('SQL 3:', sql3)
    cursor = db.cursor()
    cursor.execute(sql3.format(qtrip_id=str(rows1[1][0]),q2time=str(time)))
    rows3 = cursor.fetchall()
    # create query for the third prediction
    sql4 = """SELECT time_format(bus_timetable.arrival_time,'%T') , bus_timetable.stop_id, bus_timetable.stop_sequence, bus_stops.long_name, bus_timetable.accum_dist
            FROM bus_timetable, bus_stops WHERE trip_id = '{qtrip_id}'
            AND bus_timetable.arrival_time >= '{q2time}' AND bus_timetable.stop_id = bus_stops.stop_id
            ORDER BY bus_timetable.stop_sequence"""
    cursor = db.cursor()
    cursor.execute(sql4.format(qtrip_id=str(rows1[2][0]),q2time=str(time)))
    rows4 = cursor.fetchall()
    db.close()
    
    # get the three predictions for the data model.
    stops1 = src_dest_list(rows2, source_stop, destination_stop)
    stops2 = src_dest_list(rows3, source_stop, destination_stop)
    stops3 = src_dest_list(rows4, source_stop, destination_stop)
    print('Stops 1:', stops1)
    print('Stops 2:', stops2)
    print('Stops 3:', stops3)
    return [rows1, stops1, stops2, stops3]


def src_dest_list(rows, source, dest):
    stops = []
    found = False
    for i in rows:
        if str(i[1]) == str(source):
            found = True
        if found:
            stops.append([i[1], i[0], i[3], i[4]])
        if str(i[1]) == str(dest):
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

def time_to_arrive(datetime, sec):
#     print(datetime, sec)
    #year = (int(datetime[6:10]) * 31556926) + (int(datetime[3:5]) * 2629743.83) + (int(datetime[:2]) * 86400) + (int(datetime[11:13]) * 3600) + (int(datetime[14:16]) * 60) + (int(datetime[17:]))
    new_time = datetime + timedelta(seconds=sec)
    new_time = new_time.strftime('%d/%m/%Y %H:%M:%S')
    return new_time

def time_date(bus_route, source_stop, destination_stop, date, time, direction, stops, trip_id):
    # stops = get_all_stops(time, bus_route, source_stop, destination_stop, date, direction, bus)
    # stops1 = stops[0]
#     stops2 = stops[1]
#     stops3 = stops[3]
    print(stops)
    with open("C:\\Users\\lucas\\Desktop\\trained_modelv9.pkl", "rb") as f:
        rtr = joblib.load(f)
    holiday = holidays(date)
    p_holiday = holiday[0]
    s_holiday = holiday[1]
    weekday = datetime.weekday(parser.parse(date))
    # forecast = weather()
    dict = []
    status = 0
    # need to alter here to get the three buses and not just stops1
    for i in stops:
        if stops.index(i) == 0:
            status = 'src'
        elif stops.index(i) == len(stops) - 1:
            status = 'dest'
        else:
            status = 'normal'
        duration = model(bus_route, i[0], str(i[1]), weekday, p_holiday, s_holiday, rtr, trip_id)[0]
        predicted_arrival_time = (time_to_arrive(parser.parse(date + ' ' + str(i[1])), duration))
        # predicted_arrival_time = (time_to_arrive(parser.parse(j['datetime']), j['duration']))
        print(predicted_arrival_time)
        print('I:', i)
        # str(timedelta(seconds=
        dict.append({'stopid':i[0], 'duration':duration, 'predicted_arrival_time':predicted_arrival_time, 'status':status})
    # print(dict)
    return dict

if __name__ == '__main__':
    bus_route = '4'
    source_stop = '324'
    destination_stop = '7113'
    date = '10/08/2017'
    time = '17:15'
    query_day = 'business_day'
    direction = 0
    list_stops = get_all_stops(time, bus_route, source_stop, destination_stop, date, direction)
    counter = 0
    for i in range(1, len(list_stops) - 1):
        if i != []:
            print(time_date(bus_route, source_stop, destination_stop, date, time, direction, list_stops[i], list_stops[0][counter]))
        counter += 1

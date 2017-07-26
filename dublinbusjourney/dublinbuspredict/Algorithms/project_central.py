# from dublinbusjourney.dublinbuspredict.Algorithms.bus_location_finder import main_bus_finder
from .bus_location_finder import main_bus_finder
from datetime import datetime, timedelta
from dateutil import parser
import requests
from .model_prototype_1 import model
# from dublinbusjourney.dublinbuspredict.Algorithms.model_prototype_1 import model


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



def time_to_arrive(datetime, sec):
    new_time = datetime + timedelta(seconds=sec)
    new_time = new_time.strftime('%d/%m/%Y %H:%M:%S')
    return new_time


def main(bus_route, source_stop, destination_stop):
    source_stop = source_stop
    destination_stop = destination_stop
    bus_route = bus_route
    information_from_bus_finder = main_bus_finder(source_stop, destination_stop, bus_route)
    if type(information_from_bus_finder) == str:
        return information_from_bus_finder
    forecast = weather()
    rain = forecast[0]
    wind = forecast[1]
    temp = forecast[2]
    for i in information_from_bus_finder:
        for j in i:
            # delay = j['delay']
            hour = j['datetime']
            weekday = datetime.weekday(parser.parse(j['datetime']))
            holiday = holidays(j['datetime'])
            p_holiday = holiday[0]
            s_holiday = holiday[1]
            j['duration'] = model(bus_route, j['stopid'], hour, weekday, p_holiday, s_holiday, rain, wind, temp)[0]
            j['predicted_arrival_time'] = (time_to_arrive(parser.parse(j['datetime']), j['duration']))
            if str(j['stopid']) == source_stop:
                j['status'] = 'src'
            elif str(j['stopid']) == destination_stop:
                j['status'] = 'dest'
            else:
                j['status'] = 'normal'

    return information_from_bus_finder

if __name__ == '__main__':
    bus_route = '76'
    source_stop = '2112'
    destination_stop = '2123'
    main(bus_route, source_stop, destination_stop)

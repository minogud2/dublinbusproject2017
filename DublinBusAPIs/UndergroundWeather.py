# >> This was to test the Underground Weather API, the same code later being used to crawl the date into the db. <<

import requests

# Establish connection to weather underground.
base_url_time_machine = 'http://api.wunderground.com/api/c59c002ced7bb1cb/history_20121111/q/IE/Dublin.json'
response = requests.get(base_url_time_machine)
results = response.json()
# print(results)
print(results['history']['date']['mday'] + '-' + results['history']['date']['mon'] + '-' + results['history']['date']['year'])

# Need a counter variable just check how many results came in, and see if there were 48 results (1 per 30 min).
count = 0

# Create empty list and filter in only the data we want to use.
weather = []
date = (results['history']['date']['mday'] + '-' + results['history']['date']['mon'] + '-' + results['history']['date']['year'])
for i in results['history']['observations']:
    #Used METAR because that is the one weather station common to all the hours.
    if 'METAR' in i['metar']:
        print(i['date']['hour'] + ':' + i['date']['min'] + ':00')
        time = (i['date']['hour'] + ':' + i['date']['min'] + ':00')
        print('Summary:', i['conds'])
        summary = i['conds']
        print('Temp:', i['tempm'])
        temp = i['tempm']
        print('Rain:', i['rain'])
        rain = i['rain']
        print('Wind Speed:', i['wspdm'])
        wind = i['wspdm']
        print('\n<<--------------------------->>\n')
        weather.append({'date':date, 'time':time, 'summary':summary, 'temp':temp, 'rain':rain, 'wind':wind})
        count += 1
        print(count)

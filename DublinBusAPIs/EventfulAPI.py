# >> This program gets event information from Eventful.
# q can be music or sports (or others, the tutorial does not give keywords).
# t can be This Week (excludes weekend), This Weekend (excludes week, except for Friday), This Month, or a date like (23+June+2017)
# though it seems to be not giving the events in the right date.
# t can also be Future (default), Past, Friday (or other days), Next Month and Next x days also don't seem to be working. <<

import eventful

# API key
api = eventful.API('zVLrtqPJwL4c55nX')

# API Call
events = api.call('/events/search', q='music', l='Dublin', t='2016022800-2016023000', sort_order='popularity')

# Prints the whole data received
print(events)

# Prints the data in treated format
for event in events['events']['event']:
    print('Title:', event['title'])
    print('Venue:', event['venue_name'])
    print('Start:', event['start_time'])
    print('End:', event['stop_time'])
    print('Full day/s:', event['all_day'])
    print('Address:', event['venue_address'])
    print('Longitude:', event['longitude'])
    print('Latitude:', event['latitude'])
    print('Details:\n', event['description'])
    print('\n<<----------------------------------------------------------->>\n')


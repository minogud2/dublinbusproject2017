from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^map$', views.map, name='map'),
    url(r'^connections$', views.connections, name='connections'),
    url(r'^contact$', views.contact, name='contact'),
    url(r'^tourism$', views.tourism, name='tourism'),
    url(r'^tickets_fares$', views.tickets_fares, name='tickets_fares'),
    url(r'^sampleQuery$', views.sampleQuery, name='sampleQuery'),
    url(r'^pilotRoutes', views.pilot_routes, name='pilot_routes'),
    url(r'^pilotDest$', views.pilot_dest, name='pilot_dest'),
    url(r'^runModel$', views.run_model, name='run_model'),
    url(r'^runPlanner$', views.run_planner, name='run_model'),
    url(r'^loadRoutesForMap$', views.load_routes_for_map, name='load_routes_for_map'),
    url(r'^setInfoNextPage$', views.set_info_next_page, name='set_info_next_page'),
    url(r'^getInfoNextPage$', views.get_info_next_page, name='get_info_next_page'),
    url(r'^getStopsStartingFromSource$', views.get_stops_starting_from_source, name='get_stops_starting_from_source'),
    url(r'^getStopsDestExtraRoute$', views.get_stops_dest_extra_route, name='get_stops_dest_extra_route'),
    url(r'^getTourist$', views.get_tourist, name='get_tourist'),
    url(r'^getTouristRoutes$', views.get_tourist_routes, name='get_tourist_routes'),
    url(r'^getTwitterText$',views.get_TwitterAPIAARoadwatch, name='get_TwitterAPIAARoadwatch'),
    url(r'^getNumberBuses$', views.get_number_buses, name='get_number_buses'),
    url(r'^runQueries$', views.run_queries, name='run_queries'),
    ]

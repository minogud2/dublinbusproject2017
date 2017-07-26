# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models

class Raw2012(models.Model):
    timestamp = models.CharField(max_length=45, blank=True)
    line_id = models.CharField(max_length=5, blank=True)
    direction = models.IntegerField(blank=True, null=True)
    journey_pattern_id = models.CharField(max_length=20, blank=True)
    time_frame = models.DateField(blank=True, null=True)
    vehicle_journey_id = models.IntegerField(blank=True, null=True)
    operator = models.CharField(max_length=5, blank=True)
    congestion = models.IntegerField(blank=True, null=True)
    lat = models.DecimalField(max_digits=12, decimal_places=10, blank=True, null=True)
    lon = models.DecimalField(max_digits=12, decimal_places=10, blank=True, null=True)
    delay = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    block_id = models.IntegerField(blank=True, null=True)
    vehicle_id = models.IntegerField(blank=True, null=True)
    stop_id = models.CharField(max_length=10, blank=True)
    at_stop = models.IntegerField(blank=True, null=True)
    unique_id = models.IntegerField(unique=True)
    class Meta:
        managed = False
        db_table = '2012_raw'

class Raw2013(models.Model):
    timestamp = models.CharField(max_length=45, blank=True)
    line_id = models.CharField(max_length=5, blank=True)
    direction = models.IntegerField(blank=True, null=True)
    journey_pattern_id = models.CharField(max_length=20, blank=True)
    time_frame = models.DateField(blank=True, null=True)
    vehicle_pattern_id = models.IntegerField(blank=True, null=True)
    operator = models.CharField(max_length=5, blank=True)
    congestion = models.IntegerField(blank=True, null=True)
    lat = models.DecimalField(max_digits=12, decimal_places=10, blank=True, null=True)
    lon = models.DecimalField(max_digits=12, decimal_places=10, blank=True, null=True)
    delay = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    block_id = models.IntegerField(blank=True, null=True)
    vehicle_id = models.IntegerField(blank=True, null=True)
    stop_id = models.CharField(max_length=10, blank=True)
    at_stop = models.IntegerField(blank=True, null=True)
    unique_id = models.IntegerField(unique=True)
    class Meta:
        managed = False
        db_table = '2013_raw'
        
#===============================================================================
# #===============================================================================
# # class 2013Schedule(models.Model):
# #     trip_id = models.CharField(max_length=30, blank=True, null=True)
# #     route_short_name = models.CharField(max_length=4, blank=True, null=True)
# #     arrival_time = models.TimeField(blank=True, null=True)
# #     departure_time = models.TimeField(blank=True, null=True)
# #     stop_id = models.CharField(max_length=20, blank=True, null=True)
# #     name_without_locality = models.CharField(max_length=45, blank=True, null=True)
# #     name = models.CharField(max_length=45, blank=True, null=True)
# #     lat = models.CharField(max_length=45, blank=True, null=True)
# #     lon = models.CharField(max_length=45, blank=True, null=True)
# #     stop_sequence = models.IntegerField(blank=True, null=True)
# #     stop_headsign = models.CharField(max_length=45, blank=True, null=True)
# #     shape_dist_traveled = models.CharField(max_length=45, blank=True, null=True)
# #     unique_id = models.AutoField(primary_key=True)
# # 
# #     class Meta:
# #         managed = False
# #         db_table = '2013_schedule'
# #===============================================================================
# 
# 
# class 46ARoute(models.Model):
#     stop_id = models.IntegerField(primary_key=True)
#     stop_sequence = models.IntegerField(blank=True, null=True)
#     direction = models.IntegerField(blank=True, null=True)
# 
#     class Meta:
#         managed = False
#         db_table = '46_a_route'
# 
# 
# class AuthGroup(models.Model):
#     name = models.CharField(unique=True, max_length=80)
# 
#     class Meta:
#         managed = False
#         db_table = 'auth_group'
# 
# 
# class AuthGroupPermissions(models.Model):
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
#     permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)
# 
#     class Meta:
#         managed = False
#         db_table = 'auth_group_permissions'
#         unique_together = (('group', 'permission'),)
# 
# 
# class AuthPermission(models.Model):
#     name = models.CharField(max_length=255)
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
#     codename = models.CharField(max_length=100)
# 
#     class Meta:
#         managed = False
#         db_table = 'auth_permission'
#         unique_together = (('content_type', 'codename'),)
# 
# 
# class AuthUser(models.Model):
#     password = models.CharField(max_length=128)
#     last_login = models.DateTimeField(blank=True, null=True)
#     is_superuser = models.IntegerField()
#     username = models.CharField(unique=True, max_length=150)
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30)
#     email = models.CharField(max_length=254)
#     is_staff = models.IntegerField()
#     is_active = models.IntegerField()
#     date_joined = models.DateTimeField()
# 
#     class Meta:
#         managed = False
#         db_table = 'auth_user'
# 
# 
# class AuthUserGroups(models.Model):
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
# 
#     class Meta:
#         managed = False
#         db_table = 'auth_user_groups'
#         unique_together = (('user', 'group'),)
# 
# 
# class AuthUserUserPermissions(models.Model):
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)
# 
#     class Meta:
#         managed = False
#         db_table = 'auth_user_user_permissions'
#         unique_together = (('user', 'permission'),)
# 
# 
class BusRoutes(models.Model):
    stop_id = models.CharField(max_length=45, blank=True, null=True)
    route_id = models.CharField(max_length=45, blank=True, null=True)
    direction = models.IntegerField(blank=True, null=True)
    stop_sequence = models.IntegerField(blank=True, null=True)
    shape_dist = models.CharField(max_length=45, blank=True, null=True)
    unique_id = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'bus_routes'


class BusStops(models.Model):
    stop_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=45, blank=True, null=True)
    long_name = models.CharField(max_length=45, blank=True, null=True)
    lat = models.CharField(max_length=45, blank=True, null=True)
    lon = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bus_stops'


# class DjangoAdminLog(models.Model):
#     action_time = models.DateTimeField()
#     object_id = models.TextField(blank=True, null=True)
#     object_repr = models.CharField(max_length=200)
#     action_flag = models.SmallIntegerField()
#     change_message = models.TextField()
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
# 
#     class Meta:
#         managed = False
#         db_table = 'django_admin_log'
# 
# 
# class DjangoContentType(models.Model):
#     app_label = models.CharField(max_length=100)
#     model = models.CharField(max_length=100)
# 
#     class Meta:
#         managed = False
#         db_table = 'django_content_type'
#         unique_together = (('app_label', 'model'),)
# 
# 
# class DjangoMigrations(models.Model):
#     app = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     applied = models.DateTimeField()
# 
#     class Meta:
#         managed = False
#         db_table = 'django_migrations'
# 
# 
# class DjangoSession(models.Model):
#     session_key = models.CharField(primary_key=True, max_length=40)
#     session_data = models.TextField()
#     expire_date = models.DateTimeField()
# 
#     class Meta:
#         managed = False
#         db_table = 'django_session'
# 
# 
class HistoricData(models.Model):
    vehicle_journey_id = models.IntegerField()
    stop_id = models.IntegerField()
    journey_pattern_id = models.CharField(max_length=45)
    congestion = models.IntegerField()
    delay = models.IntegerField()
    unix = models.CharField(max_length=45)
    weekday = models.IntegerField()
    hour = models.IntegerField()
    date = models.DateField()
    previous_stop = models.IntegerField(blank=True, null=True)
    total_seconds = models.IntegerField(blank=True, null=True)
    school_holiday = models.CharField(max_length=45)
    public_holiday = models.CharField(max_length=45)
    summary = models.CharField(max_length=45)
    temp = models.FloatField()
    rain = models.IntegerField()
    wind = models.IntegerField()
    unique_id = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'historic_data'


class PilotRoutes(models.Model):
    route_id = models.CharField(max_length=45)
    stop_id = models.IntegerField()
    sequence = models.IntegerField()
    direction = models.IntegerField()
    unique_id = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'pilot_routes'
# 
# 
# class Weather2012(models.Model):
#     weather_id = models.AutoField(primary_key=True)
#     date = models.CharField(max_length=100, blank=True, null=True)
#     time = models.CharField(max_length=100, blank=True, null=True)
#     summary = models.CharField(max_length=100, blank=True, null=True)
#     temp = models.FloatField(blank=True, null=True)
#     rain = models.FloatField(blank=True, null=True)
#     wind = models.FloatField(blank=True, null=True)
# 
#     class Meta:
#         managed = False
#         db_table = 'weather2012'
# 
# 
# class Weather2013(models.Model):
#     weather_id = models.AutoField(primary_key=True)
#     date = models.CharField(max_length=100, blank=True, null=True)
#     time = models.CharField(max_length=100, blank=True, null=True)
#     summary = models.CharField(max_length=100, blank=True, null=True)
#     temp = models.FloatField(blank=True, null=True)
#     rain = models.FloatField(blank=True, null=True)
#     wind = models.FloatField(blank=True, null=True)
# 
#     class Meta:
#         managed = False
#         db_table = 'weather2013'
#===============================================================================


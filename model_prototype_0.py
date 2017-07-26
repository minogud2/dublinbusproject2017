import pandas as pd
import numpy as np
import MySQLdb
import pandas.io.sql
from sklearn.ensemble import RandomForestRegressor
from sklearn import metrics
from sklearn.preprocessing import binarize
pd.options.mode.chained_assignment = None
from sklearn.metrics import classification_report

def model(delay, hour, weekday, p_holiday, s_holiday, rain):
    conn = MySQLdb.connect(user='lucas', db='summerProdb', passwd='hello_world', host='csi6220-3-vm3.ucd.ie')
    df = pd.io.sql.read_sql('SELECT * FROM historic_data where stop_id = 807 and previous_stop=806', conn)
    conn.close()

    Monday = df['weekday'] == 1.0
    Tuesday = df['weekday'] == 2.0
    Wednesday = df['weekday'] == 3.0
    Thursday = df['weekday'] == 4.0
    Friday = df['weekday'] == 5.0
    Saturday = df['weekday'] == 6.0
    Sunday = df['weekday'] == 0.0

    df['Monday'] = Monday
    df['Tuesday'] = Tuesday
    df['Wednesday'] = Wednesday
    df['Thursday'] = Thursday
    df['Friday'] = Friday
    df['Saturday'] = Saturday
    df['Sunday'] = Sunday

    monday, tuesday, wednesday, thursday, friday, saturday, sunday = False, False, False, False, False, False, False
    if weekday == 0:
        monday = True
    elif weekday == 1:
        tuesday = True
    elif weekday == 2:
        wednesday = True
    elif weekday == 3:
        thursday = True
    elif weekday == 4:
        friday = True
    elif weekday == 5:
        saturday = True
    elif weekday == 6:
        sunday = True

    selected = ['delay','Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday', 'hour', 'school_holiday', 'public_holiday', 'rain']

    # Create the target features.
    X = df[selected]
    y = df.total_seconds

    X['school_holiday'] = X.school_holiday.astype(bool)
    X['public_holiday'] = X.public_holiday.astype(bool)

    # Random Forest Regresssor
    rtr = RandomForestRegressor(n_estimators=200, max_features='auto', oob_score=True, random_state=1)
    rtr.fit(X, y)

    # pd.DataFrame({'feature': X.columns, 'importance': rtr.feature_importances_})

    input_data = pd.DataFrame({'Delay': [delay], 'Monday': [monday], 'Tuesday': [tuesday], 'Wednesday': [wednesday], 'Thursday': [thursday]\
                           ,'Friday': [friday], 'Saturday': [saturday], 'Sunday': [sunday], 'hour': [hour], 'school_holiday': [s_holiday],\
                            'public_holiday': [p_holiday], 'rain':[rain]})

    predict_duration = rtr.predict(input_data)
    # print(predict_duration)
    return predict_duration

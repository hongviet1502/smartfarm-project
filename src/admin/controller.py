from flask import Blueprint,render_template,request,jsonify
from datetime import date,datetime
import json
from src import db, logger, mqtt, client
from src.utils.get_data import *
# from src import db
admin = Blueprint('admin', __name__)

@admin.route("/home/")
def get_home_page():
    """Return homepage"""
    sensors = getSensors()
    relays = getRelays()
    for sensor in sensors:
        sensor['latestUpdate'] = convert2label((sensor['latestUpdate'])).split(" ")
    return render_template('pages/admin/home.html', sensors = sensors,relays = relays )

@admin.route('/home/chart/<sensorName>', methods = ['GET', 'POST'])
def get_chart_info(sensorName):
    '''
    Load and return all sensor and display chart
    '''
    try:
        response = {}
        list_sensor = db.select_records("sensors", {})
        list_sensor_infor = []
        list_sensor_value = []
        list_sensor_time = []
        list_sensor_name = []
        for i in range (0,len(list_sensor)):
            # get all sensor data by sensorname and sort
            sensor_value = db.select_records("sensorvalues", {"sensorName": list_sensor[i]['name']},sort={"key": "timeUpdate", "direction" : -1})
            # append value to list infor 
            list_sensor_infor.append(sensor_value)
            # append name to list infor
            list_sensor_name.append(list_sensor[i]['name'])
        response['sensor_name'] = list_sensor_name

        if len(list_sensor_infor) == 0:
            list_sensor_value = []
            list_sensor_time = []
            response = {}
        else:
            for i in range (0,len(list_sensor_infor)):
                value = []
                time = []
                for j in range (0, len(list_sensor_infor[i])):
                    value.append(list_sensor_infor[i][j]["value"])
                    time.append(convert2label(list_sensor_infor[i][j]["time"]))
                list_sensor_value.append(value)
                list_sensor_time.append(time)
                    
                response['time'] = list_sensor_time 
                response['value'] = list_sensor_value
                response['sensor_count'] = len(list_sensor_infor)
        return jsonify(response)
    except Exception as e:
        logger.error('Load home with error: {}'.format(e))
        return render_template("page404.html")

def convert2label(date, full = True):
    """Function that convert time from database to time can be use to draw chart"""
    y, m, d, h, minn, sec, msec, _, _ = date.timetuple()

    if full:
        return "{}-{}-{} {}:{}:{}".format(y,m,d,h,minn,sec)

@admin.route("/home/runSchedule",  methods = ['POST'])
def handle_schedule():
    """this funtion is call by http post every 60s to run schedules"""
    # select all schedules that active in dtb
    scheduleActive = db.select_records('schedules',{'active':1})
    for schedule in scheduleActive:
        scheduleDatetime = schedule['time']
        # convert time of type datetime in dtb to timestamp
        scheduleTimestamp = int(round(scheduleDatetime.timestamp()))

        curr_dt = datetime.now()
        # get now timestamp
        curr_timestamp = int(round(curr_dt.timestamp()))
        
        # if reach time, do schedule
        if(curr_timestamp - scheduleTimestamp) >= 0 :
            dataControl = {}
            dataControl['mode'] = 3
            dataControl['control'] = []
            # get infor of each relay in schedule execute
            for relay in schedule['execute']:
                relayInfor = getRelay(relay['ID'])
                relayControl = {}
                relayControl['pin'] = relayInfor['pin']
                relayControl['pull'] = relay['pull']
                dataControl['control'].append(relayControl)
            # send data control relay to broker
            dataControl = json.dumps(dataControl)
            dataSendStatus = mqtt.publish(client,"esp8266/controlschedules",dataControl)
            #if send okay, update dtb
            if dataSendStatus == 0:
                db.update_record(
                        'schedules',
                        {"_id": ObjectId(schedule['_id'])},
                        { "$set": {'active': 0}
                        }
                    )
                
                for relay in schedule['execute']:
                    db.update_record(
                        "relays",
                        {"_id": ObjectId(relay['ID'])},
                        {
                            "$set": {'status': relay['pull']}
                        }
                    )
                return jsonify({'status':'send ok'})
    return jsonify({'status':'send false'})
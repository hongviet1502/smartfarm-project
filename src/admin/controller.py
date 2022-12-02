from flask import Blueprint,render_template,request,jsonify
from datetime import date
import datetime
from src import logger,db
# from src import db
admin = Blueprint('admin', __name__)

@admin.route("/home/")
def get_home_page():
    sensors = db.select_records("sensors", {})
    for sensor in sensors:
        sensor['latestUpdate'] = convert2label((sensor['latestUpdate'])).split(" ")
    return render_template('pages/admin/home.html', sensors = sensors)

@admin.route('/home/chart/<sensorName>', methods = ['GET', 'POST'])
def get_chart_info(sensorName):
    '''
    Load and return all sensor include in a greenhouse through by id of greenhouse and display chart
    '''
    try:
        response = {}
        list_sensor = db.select_records("sensors", {})
        list_sensor_infor = []
        list_sensor_value = []
        list_sensor_time = []
        list_sensor_name = []
        for i in range (0,len(list_sensor)):
            sensor_value = db.select_records("sensorvalues", {"sensorName": list_sensor[i]['name']},sort={"key": "timeUpdate", "direction" : -1})
            list_sensor_infor.append(sensor_value)
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
    y, m, d, h, minn, sec, msec, _, _ = date.timetuple()

    if full:
        return "{}-{}-{} {}:{}:{}".format(y,m,d,h,minn,sec)
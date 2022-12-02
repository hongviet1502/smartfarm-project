from flask import Blueprint, jsonify, request, render_template
from src import db, logger
from src.utils.get_data import *
import datetime

sensor = Blueprint('sensor', __name__)

@sensor.route('/sensor', methods=['GET', 'POST', 'UPDATE', 'DELETE', 'PUT', 'DETAIL'])
def load_init_sensor():
    if request.method == 'GET':
        try:
            list_sensor = getSensors()
            for sensor in list_sensor:
                sensor['latestUpdate'] = convert2label((sensor['latestUpdate'])).split(" ")
            logger.info(list_sensor)
            return render_template("pages/manager/sensor.html", list_sensor=list_sensor)
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")
    elif request.method == 'POST':
        data = request.get_json()
        print(data)
        return jsonify({'msg': 'ok'})


@sensor.route('/temphumisensorvalue', methods=['GET', 'POST', 'UPDATE', 'DELETE', 'PUT', 'DETAIL'])
def save_sensor_data():
    """
    Read data from dht11 sensor and insert data to database
    """
    try:
        # Doc du lieu gui ve tu Cam bien dht11
        temperature = float(request.args.get('temperature'))
        humidity = float(request.args.get('humidity'))
        # Thoi gian update
        updateTime = datetime.datetime.now()
        # khoi tao 2 ban ghi nhiet do va do am
        tempRecord = {}
        tempRecord['value'] = temperature
        # tempRecord['type'] = 1
        tempRecord['time'] = updateTime
        tempRecord['sensorName'] = "CB Nhiet do"

        humiRecord = {}
        humiRecord['value'] = humidity
        # humiRecord['type'] = 2
        humiRecord['time'] = updateTime
        humiRecord['sensorName'] = "CB Do am"
        # Luu du lieu vao dtb
        tempInsertStatus = db.insert_many('sensorvalues', tempRecord)
        humiInsertStatus = db.insert_many('sensorvalues', humiRecord)
        
        db.update_record(
            'sensors',
            {"name": "CB Nhiet do"},
            { "$set": {
                "curValue":tempRecord['value'],
                "latestUpdate":updateTime,
                }
            }
        )
        db.update_record(
            'sensors',
            {"name": "CB Do am"},
            { "$set": {
                "curValue":humiRecord['value'],
                "latestUpdate":updateTime,
                }
            }
        )
        if tempInsertStatus == False :
           logger.error('insert temp data fail')
        if humiInsertStatus == False :
           logger.error('insert temp data fail')
        if tempInsertStatus and humiInsertStatus:
            logger.info('inserted')
            return "Received"
    except Exception as e:
        logger.error(e)


def convert2label(date, full = True):
    """
    Convert type datetime.datetime to String
    """
    y, m, d, h, minn, sec, msec, _, _ = date.timetuple()

    if full:
        return "{}-{}-{} {}:{}:{}".format(y,m,d,h,minn,sec)
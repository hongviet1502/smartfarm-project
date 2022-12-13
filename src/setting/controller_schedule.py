import datetime
from flask import Blueprint, jsonify, request, render_template
from src import db, logger, mqtt, client
from src.utils.get_data import *
import json

schedule = Blueprint('schedule', __name__)

@schedule.route('/schedule', methods = ['GET','POST','PATCH'])
def load_init_schedule():

    if request.method == 'GET':
        """Return home page of schedule"""
        try:
            relays = getRelays()
            schedules = getSchedules()
            return render_template("pages/setting/schedule/schedule.html", relays = relays,schedules = schedules)
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")    
    if request.method == 'POST':
        try:
            status = {}
            data = request.get_json()
            timeArray = data['time'].split('T')
            date = timeArray[0].split("-")
            time = timeArray[1].split(":")
            data['active'] = 0
            data['time'] = datetime.datetime(int(date[0]), int(date[1]),int(date[2]),int(time[0]),int(time[1]))
            isSuccess = db.insert_many("schedules", data)
            status['isSuccess'] = isSuccess
            if(isSuccess):
                status['msg'] = "Tạo lịch thành công"
            else:
                status['msg'] = "Tạo lịch thất bại"
            return jsonify(status)
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")    

    if request.method == 'PATCH':
        try:
            status = {}
            data = request.get_json()
            print(data)
            isUpdated = db.update_record(
                    'schedules',
                    {"_id": ObjectId(data['id'])},
                    { "$set": {
                        "active":data['active'],
                        }
                    }
                )
            status['status'] = isUpdated
            if(isUpdated):
                status['msg'] = "Thay đổi trạng thái thành công"
            else:
                status['msg'] = "Thay đổi trạng thái thất bại"
            return jsonify(status)
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")    
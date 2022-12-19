import datetime
from flask import Blueprint, jsonify, request, render_template
from src import db, logger, mqtt, client
from src.utils.get_data import *
import json

schedule = Blueprint('schedule', __name__)

@schedule.route('/schedule', methods = ['GET','POST','PATCH','DELETE'])
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
        """Create new schedules"""
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
        """handle control scripts"""
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
    if request.method == 'DELETE':
        """handle delete schedule request"""
        try:
            data = request.get_json()
            isDeleted = db.delete_record('schedules',{"_id": ObjectId(data['id'])})
            if isDeleted:
                return jsonify({"status": True, "msg": "Xoá thành công lịch điều khiển!"})
            return jsonify({"status": False, "msg": "Không thể xoá lịch. Vui lòng thử lại sau!"})
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")       

@schedule.route('/schedule/edit/<ID>', methods = ['GET', 'UPDATE'])
def edit_schedule(ID):
    if request.method == 'GET':
        """get schedule data to edit"""
        try:
            schedule = db.select_records("schedules", {"_id" : ObjectId(ID)})[0]
            record = []
            data = {
                '_id': str(schedule['_id']),
                'active': schedule['active'],
                'name':schedule['name'],
                'time': str(schedule['time'])
            }
            record.append(data)
            for i in range(0, len(schedule['execute'])):
                execute ={
                    'ID': str((schedule['execute'])[i]['ID']),
                    'pull': (schedule['execute'])[i]['pull'],
                    'type': (schedule['execute'])[i]['type']
                }
                record.append(execute)
            return jsonify(record)
       
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")

    else :
        """Edit schedule"""
        data = request.get_json()
        timeArray = data['time'].split('T')
        date = timeArray[0].split("-")
        time = timeArray[1].split(":")
        data['time'] = datetime.datetime(int(date[0]), int(date[1]),int(date[2]),int(time[0]),int(time[1]))
        isUpdated = db.update_record(
                        'schedules',
                        {"_id": ObjectId(ID)},
                        { "$set": data
                        }
                    )
        if isUpdated:
            return jsonify(
                {"status": True, "msg": "Cập nhật thông tin lịch thành công!"}
            )
        return jsonify(
            {
                "status": False,
                "msg": "Cập nhật thông tin lịch thất bại!",
            }
        )
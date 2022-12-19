from flask import Blueprint, jsonify, request, render_template
from src import db, logger, mqtt, client
from src.utils.get_data import *
import json, datetime
scripts = Blueprint("scripts", __name__)

@scripts.route("/script", methods=["GET", "DELETE","UPDATE"])
def load_home_scripts_page():

    if request.method == "GET":
        """Return home page of scripts"""
        try:
            relays = getRelays()
            scripts = getScripts()
            return render_template("pages/setting/script/scripts.html",relays = relays,scripts = scripts)   
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")

    elif request.method == "UPDATE":
        """Control status script"""
        try:
            data = request.get_json()
            response = {}
            script = getScript(data['id']) #get the scripts by id
            
            #initialize dataControl to send to broker
            dataControl = {}
            dataControl['mode'] = 2
            dataControl['control'] = []
            #loop through relays in execute
            for relay in script['execute']:
                relayInfor = getRelay(relay['ID'])
                relayControl = {}
                relayControl['pin'] = relayInfor['pin']
                relayControl['pull'] = relay['pull']
                dataControl['control'].append(relayControl)
            #send to broker
            dataControl = json.dumps(dataControl)
            isPublished = mqtt.publish(client,"esp8266/controlscripts",dataControl)
            response['status'] =isPublished
            if(isPublished == 0):
                #update dtb
                for relay in script['execute']:
                    db.update_record(
                        "relays",
                        {"_id": ObjectId(relay['ID'])},
                        {
                            "$set": {'status': relay['pull']}
                        }
                    )
                response['msg'] = "Thay đổi trạng thái kịch bản thành công"
            else:
                response['msg'] = "Thay đổi trạng thái kịch bản thất bại"
            return jsonify(response)
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")

    elif request.method == "DELETE":

        try:
            data = request.get_json()
            isDeleted = db.delete_record('scripts',{"_id": ObjectId(data['id'])})
            if isDeleted:
                return jsonify({"status": True, "msg": "Xoá thành công kịch bản điều khiển!"})
            return jsonify({"status": False, "msg": "Không thể xoá kịch bản. Vui lòng thử lại sau!"})
        except Exception as e:
            logger.error(e)

@scripts.route("/script/creation", methods=["GET", "UPDATE", "POST"])
def create_script():

    if request.method == "GET":
        try:
            # #  Load all relays of house and return
            # relays = []
            # list_relays = db.select_records(
            #     "relays", {"greenhouseId": ObjectId(ID), "active": True}
            # )
            # if list_relays and len(list_relays) > 0:
            #     relays = [Relay(relay) for relay in list_relays]

            # return render_template(
            #     "setting/script/create_script.html", greenhouse=house, relays=relays
            # )
            print('get create')
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")

    elif request.method == "POST":
        # create new item scripts
        status = {}
        data = request.get_json()
        data['numberOfRelay'] = len(data['execute'])
        isSuccess = db.insert_many("scripts", data)
        status['isSuccess'] = isSuccess
        if(isSuccess):
            status['msg'] = "Tạo kịch bản thành công"
        else:
            status['msg'] = "Tạo kịch bản thất bại"
        return jsonify(status)

@scripts.route("/editscript/<idScript>", methods=["GET", "UPDATE", "POST"])
def get_edit_scipts(idScript):
    """get scripts data to edit """
    if request.method == "GET":
        try:
            script = getScript(idScript)
            response = {}
            response['nameScript'] = script['name']
            response['execute'] = script['execute']
            return jsonify(response)
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")


@scripts.route("/script/edit/<id_script>", methods=["POST"])
def edit_script(id_script):
    """update new scripts in for"""
    data = request.get_json()
    isUpdated = db.update_record(
                    'scripts',
                    {"_id": ObjectId(id_script)},
                    { "$set": data
                    }
                )
    if isUpdated:
        return jsonify(
            {"status": True, "msg": "Cập nhật thông tin kịch bản thành công!"}
        )
    return jsonify(
        {
            "status": False,
            "msg": "Cập nhật thông tin kịch bản thất bại!",
        }
    )
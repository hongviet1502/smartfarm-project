from flask import Blueprint, jsonify, request, render_template
from src import db, logger, mqtt, client
from src.utils.get_data import *
import json
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
            script = getScript(data['id'])

            dataControl = {}
            dataControl['mode'] = 2
            dataControl['control'] = []
            for relay in script['execute']:
                relayInfor = getRelay(relay['ID'])
                relayControl = {}
                relayControl['type'] = relayInfor['type']
                relayControl['pull'] = relay['pull']
                dataControl['control'].append(relayControl)

            dataControl = json.dumps(dataControl)
            isPublished = mqtt.publish(client,"esp8266/controlscripts",dataControl)
            if(isPublished == 0):
                response['code'] == 200
                response['msg'] = "Thay đổi trạng thái kịch bản thành công"
            else:
                response['code'] == 400
                response['msg'] = "Thay đổi trạng thái kịch bản thất bại"
            return jsonify(response)
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")

    # elif request.method == "DELETE":

    #     try:
    #         data = request.get_json()
    #         status = Request_API.delete(2, data["id"])
    #         if status['code'] == 200:
    #             return jsonify({"status": True, "msg": "Xoá thành công kịch bản điều khiển!"})
    #         return jsonify({"status": False, "msg": "Không thể xoá kịch bản. Vui lòng thử lại sau!"})
    #     except Exception as e:
    #         logger.error(e)

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
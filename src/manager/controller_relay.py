from flask import Blueprint, jsonify, request, render_template
from src import db, logger, mqtt, client
from src.utils.get_data import *
import datetime
import json

relay = Blueprint('relay', __name__)


@relay.route('/relay', methods=['GET', 'POST', 'UPDATE', 'DELETE', 'PUT', 'DETAIL'])
def handle_relay():
    """
    handle all http request to relay
    """
    if request.method == 'GET':  # load page
        try:
            list_relay = getRelays()
            pins = [16, 5, 4, 0, 2, 14, 12, 13, 15]
            for relay in list_relay:
                relay['_id'] = str(relay['_id'])
                if relay['pin'] in pins:
                    pins.remove(relay['pin'])
            return render_template("pages/manager/relay.html", list_relay=list_relay, pins=pins)
        except Exception as e:
            logger.error(e)
            return render_template("page404.html")
    elif request.method == 'POST':  # change relay status (on/off)
        try:
            data = request.get_json()
            data['type'] = int(data['type'])
            data['mode'] = 1
            data = json.dumps(data)
            # public to topic control device
            dataSendStatus = mqtt.publish(
                client, "esp8266/controldevice", data)
            if (dataSendStatus == 0):
                data = json.loads(data)
                db.update_record(
                    'relays',
                    {"name": data['name']},
                    {"$set": {
                        "status": data['pinMode'],
                    }
                    }
                )
                return jsonify({
                    "msg": "dieu khien thanh cong",
                    "status": True
                })
            else:
                return jsonify({
                    "msg": "dieu khien that bai",
                    "status": False
                })
        except Exception as e:
            logger.error(e)

    elif request.method == 'DELETE':

        id_delete = request.get_json()
        isDeleted = db.delete_record('relays',{"_id": ObjectId(id_delete)})
        if isDeleted:
            return jsonify({'code': 200})
        return jsonify({'code': 400})

    elif request.method == 'UPDATE':

        data = request.get_json()
        isUpdated = db.update_record(
            'relays',
            {"_id": ObjectId(data['_id'])},
            {"$set": {
                'name': data['name']
            }
            }
        )
        if isUpdated:
            return jsonify({'code': 200})
        return jsonify({'code': 400})


@relay.route('/relay/create', methods=['POST'])
def handle_create_relay():
    """
    handle add new relay request
    """
    try:
        data = request.get_json()
        isInserted = db.insert_many("relays", data)
        if isInserted:
            return jsonify({'code': 200})
        return jsonify({'code': 400})
    except Exception as e:
        logger.error(e)
        return render_template("page404.html")

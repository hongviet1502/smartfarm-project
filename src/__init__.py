from flask import Flask,render_template

import logging
from logging import Formatter
# setting log
# logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('log.log')
handler = logging.StreamHandler()
handler.setFormatter(Formatter(
    '%(asctime)s %(levelname)s: %(message)s '
    '[in %(pathname)s:%(lineno)d]'
))
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

from src.utils.connector import MongoDb_Connector
from src.utils.MQTT_Connector import MQTT_Connector
from ini_config import config
import time
app = Flask(__name__)

# connect public mqtt emqx
mqtt = MQTT_Connector
client = mqtt.connect_mqtt()
client.loop_start()
time.sleep(4) # Wait for connection setup to complete
client.loop_stop()    #Stop loop 

# connect database
db =  MongoDb_Connector(config.get('DATABASE', 'SRV'), config.get('DATABASE', 'DB'))

from src.auth.controller import auth
from src.admin.controller import admin
from src.manager.controller_firmware import firmware
from src.manager.controller_sensor import sensor
from src.manager.controller_relay import relay
from src.setting.controller_script import scripts
from src.setting.controller_schedule import schedule

app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(admin, url_prefix='/')
app.register_blueprint(firmware, url_prefix='/manager')
app.register_blueprint(sensor, url_prefix='/manager')
app.register_blueprint(relay, url_prefix='/manager')
app.register_blueprint(scripts, url_prefix='/setting')
app.register_blueprint(schedule, url_prefix='/setting')


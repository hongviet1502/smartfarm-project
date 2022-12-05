from flask import Flask,render_template
from src.utils.connector import MongoDb_Connector
from src.utils.MQTT_Connector import MQTT_Connector
from ini_config import config
import logging
import time
app = Flask(__name__)

mqtt = MQTT_Connector
client = mqtt.connect_mqtt()
client.loop_start()
time.sleep(4) # Wait for connection setup to complete
client.loop_stop()    #Stop loop 


db =  MongoDb_Connector(config.get('DATABASE', 'SRV'), config.get('DATABASE', 'DB'))
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('log.log')

from src.auth.controller import auth
from src.admin.controller import admin
from src.manager.controller_firmware import firmware
from src.manager.controller_sensor import sensor

app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(admin, url_prefix='/')
app.register_blueprint(firmware, url_prefix='/manager')
app.register_blueprint(sensor, url_prefix='/manager')

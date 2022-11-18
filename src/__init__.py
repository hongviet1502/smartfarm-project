from flask import Flask,render_template
from src.utils.connector import MongoDb_Connector
from ini_config import config

app = Flask(__name__)

db =  MongoDb_Connector(config.get('DATABASE', 'SRV'), config.get('DATABASE', 'DB'))

from src.auth.controller import auth
from src.admin.controller import admin
from src.manager.controller_firmware import firmware
from src.manager.controller_sensor import sensor

app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(admin, url_prefix='/')
app.register_blueprint(firmware, url_prefix='/manager')
app.register_blueprint(sensor, url_prefix='/manager')
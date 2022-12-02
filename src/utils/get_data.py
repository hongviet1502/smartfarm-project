from src import db
from bson.objectid import ObjectId

def getSensors():
    """
    Return sensors in dtb
    """
    list_sensor = db.select_records("sensors",{})
    return list_sensor
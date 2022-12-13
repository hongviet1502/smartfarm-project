from src import db
from bson.objectid import ObjectId

def getSensors():
    """
    Return sensors in dtb
    """
    list_sensor = db.select_records("sensors",{})
    return list_sensor

def getRelays():
    """
    Return relays in dtb
    """
    list_relay = db.select_records("relays",{})
    return list_relay

def getRelay(idRelay):
    """
    Return relay with specific id
    """
    relay = db.select_records("relays",{"_id": ObjectId(idRelay)})[0]
    return relay

def getScripts():
    """
    Return all scripts in dtb
    """
    scripts = db.select_records("scripts",{})
    return scripts

def getScript(idScript):
    """
    Return scripts with specific id
    """
    script = db.select_records("scripts",{"_id": ObjectId(idScript)})[0]
    return script

def getSchedules():
    """
    Return schedules in dtb
    """
    schedules = db.select_records("schedules",{})
    return schedules   
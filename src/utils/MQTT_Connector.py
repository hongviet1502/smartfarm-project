from paho.mqtt import client as mqtt_client
import time, random
from src import logger
# public broker information
broker = 'broker.emqx.io'
port = 1883
topic = "esp8266/smartfarmviet"
client_id = f'python-mqtt-{random.randint(0, 1000)}'
username = 'emqx'
password = 'public'

class MQTT_Connector:
    def connect_mqtt() -> mqtt_client:
        """
        connect to broker
        """
        def on_connect(client, userdata, flags, rc):
            """
            callback connect function
            """
            if rc == 0:
                logger.info("Connected to MQTT Broker!")
            else:
                logger.error("Failed to connect, return code %d\n", rc)

        client = mqtt_client.Client(client_id)
        client.username_pw_set(username, password)
        client.connect(broker, port)
        client.on_connect = on_connect
        msg = "msg from python"
        result = client.publish(topic, msg) # test public 
        return client

    def subscribe(client: mqtt_client):
        """
        subcribe to topic
        """
        def on_message(client, userdata, msg):
            """
            callback funtion: log from broker sended
            """
            logger.info(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        client.subscribe(topic)
        client.on_message = on_message
    def publish(client,topic,msg):
        """
        publish to specific topic with message
        """
        result = client.publish(topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            logger.info(f"Send `{msg}` to topic `{topic}`")
        else:
            logger.error(f"Failed to send message to topic {topic}")
        return status
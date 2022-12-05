from paho.mqtt import client as mqtt_client
import time, random

broker = 'broker.emqx.io'
port = 1883
topic = "esp8266/smartfarmviet"
client_id = f'python-mqtt-{random.randint(0, 1000)}'
username = 'emqx'
password = 'public'

class MQTT_Connector:
    def connect_mqtt() -> mqtt_client:
        def on_connect(client, userdata, flags, rc):
            if rc == 0:
                print("Connected to MQTT Broker!")
            else:
                print("Failed to connect, return code %d\n", rc)

        client = mqtt_client.Client(client_id)
        client.username_pw_set(username, password)
        client.connect(broker, port)
        client.on_connect = on_connect
        msg = "msg from python"
        result = client.publish(topic, msg)
        return client

    def subscribe(client: mqtt_client):
        def on_message(client, userdata, msg):
            print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        client.subscribe(topic)
        client.on_message = on_message
    def publish(client,topic,msg):
        result = client.publish(topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        return status
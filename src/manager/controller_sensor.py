from flask import Blueprint, jsonify, request, render_template
# from src import db

sensor = Blueprint('sensor', __name__)

@sensor.route('/sensor', methods = ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT', 'DETAIL'])
def load_init_sensor():
    # data = {}
    # data['role'] = 1
    # data['password'] = 'testpass'
    # data['active'] = True
    # data['username'] = 'testusername'
    # test = db.insert_one('users',data)
    # print(test)
    if request.method == 'GET':
        return render_template('pages/manager/sensor.html')
    elif request.method == 'POST':
        data = request.get_json()
        print(data)
        return jsonify({'msg':'ok'})
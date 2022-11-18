from flask import Blueprint, request, render_template

firmware = Blueprint('firmware', __name__)

@firmware.route('/firmware', methods=['GET', 'POST', 'PUT', 'DELETE'])
def handle_firmware():
    if request.method == 'GET':
        return render_template('pages/manager/firmware.html')
    else:
        return render_template("page404.html")
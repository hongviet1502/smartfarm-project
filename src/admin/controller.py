from flask import Blueprint,render_template
# from src import db
admin = Blueprint('admin', __name__)

@admin.route("/home/")
def get_home_page():
    return render_template("base.html")
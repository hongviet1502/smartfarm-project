from src import app,render_template
from flask import Flask, redirect, url_for
from pymongo import MongoClient

client = MongoClient('localhost', 27017)

# db = client.flask_db
# todos = db.todos

if __name__ == '__main__':
    app.run(debug=True)

@app.route("/")
def hello_world():
    return redirect(url_for('auth.login'))

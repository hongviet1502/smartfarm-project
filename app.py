from src import app,socketio
from flask import Flask, redirect, url_for

if __name__ == '__main__':
    app.run(debug=True)
    socketio.run(app)
@app.route("/")
def hello_world():
    return redirect(url_for('auth.login'))

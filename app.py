from src import app,render_template
from flask import Flask, redirect, url_for

if __name__ == '__main__':
    app.run(debug=True)
@app.route("/")
def hello_world():
    return redirect(url_for('auth.login'))

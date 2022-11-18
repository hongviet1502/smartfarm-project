from flask_wtf import FlaskForm # , RecaptchaField
from wtforms import StringField, PasswordField #, BooleanField
from wtforms.validators import Required, Email, EqualTo


class LoginForm(FlaskForm):
    username       = StringField('Email Address', [
                    Required(message='Forgot your username?')])
    password    = PasswordField('Password', [
                    Required(message='Must provide a password.')])
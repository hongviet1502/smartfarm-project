"""Load configuration from .ini file."""
import configparser

# Read local file `config.ini`.
config = configparser.ConfigParser()                                     
config.read('config.ini')


"""
Tutorials:

    Get a paramenters in file config.ini

    Step1 : import package
        from ini_config import config

    Step2 : Get values from our .ini file

        config.get('DATABASE', 'HOST')
        config['DATABASE']['HOST']
"""
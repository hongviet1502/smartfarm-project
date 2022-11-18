from pymongo import MongoClient
import logging

class MongoDb_Connector:

    def __init__(self, mongodb_srv, database_name) -> None:
    
        client = MongoClient(mongodb_srv)
        self.db = client[database_name]

    def insert_one(self, tbl_name, record):

        """
        Insert a new record into database

        Paramters:
            - tbl_name: name of table in database (str)
            - record  : a new record with dic type
        
        Return:
            - True if insert success 
            - False else 
        """
        try:
            self.db[tbl_name].insert_one(record)
            logging.info('Insert success a new record to {}'.format(tbl_name))
            return True

        except Exception as e:
            logging.info('Insert failed a new record to {}. Exception: {}'.format(tbl_name, e))
            return False

    def insert_many(self, tbl_name, records):

        """
        Insert many records into database 

        Parameters:
            - tbl_name: str
            - records: list records
        
        Return: True | False equivalent Success or Failure
        """
        try:
            self.db[tbl_name].insert_one(records)
            logging.info('Insert success a new list records to {}'.format(tbl_name))
            return True

        except Exception as e:

            logging.error('Insert failed a new list records to {}. Exception: {}'.format(tbl_name, e))
            return False

    def update_record(self, tbl_name, condition, new_value):

        """
        Adjust value of record in database 
        Paramters:
            - tbl_name: str 
            - condition: condition to find record format sample {"name" : "John"}
            - new_value: Example: { "$set": { "address": "Canyon 123" } }
        
        Return: True | False
        """
        try:
            self.db[tbl_name].update_many(condition, new_value)
            logging.info('Updated record success! {}'.format(tbl_name))
            return True
        except Exception as e:
            print(e)
            logging.error("Update record failed! {} with exception: {}".format(tbl_name, e))
            return False 

    def delete_record(self, tbl_name, condition):
        """
        Delete a record propitiate condition
        Parameters:
            - tbl_name: str 
            - condition: The condition will be used delete record (Sample format : {"id" : "abc13323"})
        
        Return: True | False
        """
        try:
            self.db[tbl_name].delete_many(condition)

            return True 
        except Exception as e:
            logging.error("Delete a record in {} failed. Case exception: {}".format(tbl_name, e))
            return False  
    
    def select_records(self, tbl_name, condition = {}, hide_fields = {}, sort = None ,limit = 130000):
        """
        Get all record in a tbl
        Parameters:
            - tbl_name: str 
            - condition: Ex {"name" : "Zfold3"} if no have condition use {}
            - hide_fields: Fields will not return in output. Ex ['name', 'email'] will not appear in output.
            - limit: Maximum records can get out (default = MAX_INT) 
        Return:
            - a list records (None if has exception)
        """
        hide_fields_format = {}
        for field in hide_fields:
            hide_fields_format[field] = 0
        
        try:
            if len(hide_fields) > 0:
                records_result = self.db[tbl_name].find(condition, hide_fields_format).limit(limit)
            else:
                records_result = self.db[tbl_name].find(condition).limit(limit)
            
            if sort is not None:
                records_result = records_result.sort(sort['key'], sort['direction'])

            return [record for record in records_result]

        except Exception as e:
            
            print(e)
            logging.error("Get all query occurs a problem {} in {}".format(e, tbl_name))
            return None

    def update_upsert(self, tbl_name, condition, new_value):
        try:
            self.db[tbl_name].update_one(condition, new_value, upsert=True)
            logging.info('Updated record success! {}'.format(tbl_name))
            return True
        except Exception as e:
            print(e)
            logging.error("Update record failed! {} with exception: {}".format(tbl_name, e))
            return False 

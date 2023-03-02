from fastapi import FastAPI
from pymysql.pymysql_get_databases import getDataFromDatabase

app = FastAPI()

@app.get("/stops")
def getData():
    response = getDataFromDatabase()
    return response

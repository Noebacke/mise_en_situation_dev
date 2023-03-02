from fastapi import FastAPI
from pymysql.pymysql_get_databases import getDataFromDatabase
from fastapi.middleware.cors import CORSMiddleware
from extractXml import returnTimeOftravel

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/travel/{start}/{end}}")
def getTimeOfTravel(start, end):
    return {"start": start, "end": end}
    response = returnTimeOftravel(start, end)
    return response

@app.get("/stops")
def getData():
    response = getDataFromDatabase()
    return response


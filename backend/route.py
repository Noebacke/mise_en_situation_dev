from fastapi import FastAPI
from pymysql.pymysql_get_databases import getDataFromDatabase
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/stops")
def getData():
    response = getDataFromDatabase()
    return response

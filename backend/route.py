from fastapi import FastAPI
import requests
from trafic import Trafic

callApi = "https://transport.data.gouv.fr/api/datasets/632a56a6375be9df218c0d3a"
callApiSwappi = "https://swapi.dev/api/planets/1/"

app = FastAPI()


@app.post("/scheduletrame")
def post_params():
    
    response = requests.get(callApi)
    return response.json()["history"][2]["payload"]["zip_metadata"]

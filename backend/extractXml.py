import xmltodict
import json

with open('./data/BORDEAUX_METROPOLE_offre_Bus_TBM_BordeauxM_tropole__95_95.xml') as file:
    dictionary = xmltodict.parse(file.read())
json_object = json.dumps(dictionary)
print(json_object)

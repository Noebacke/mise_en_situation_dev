import xmltodict
import json
import re 

with open('./data/BORDEAUX_METROPOLE_offre_Bus_TBM_BordeauxM_tropole__95_95.xml') as file:

    dbData = []

    dictionary = xmltodict.parse(file.read())

    pattern = dictionary["PublicationDelivery"]["dataObjects"]["CompositeFrame"][
        "frames"]["GeneralFrame"][0]["members"]

    json_object = json.dumps(pattern["ScheduledStopPoint"][0]["@id"],indent=3)
    regExp = re.compile('[A-Za-z:_]+95_[A-Z0-9]+a([0-9]+)')

    for match in regExp.finditer(json_object):
        match.group(1)
        dbData.append(match.group(1))
    print(dbData)
    
    
    

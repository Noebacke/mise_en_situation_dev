import xmltodict
import json
import re
from pymysql.pymysql_get_databases import createTable

with open('./data/BORDEAUX_METROPOLE_offre_Bus_TBM_BordeauxM_tropole__95_95.xml') as file:

    dbData = []

    dictionary = xmltodict.parse(file.read())

json_object = json.dumps(dictionary)


regexId = re.compile('[A-Za-z:_]+95_[A-Z0-9]+a([0-9]+)')

i2 = 0
trajetsTab = []
patternsTab = []
listId = []
stopsNameWithId = []

# Créer la liste des ID des arrêts
stopPoints = dictionary['PublicationDelivery']['dataObjects']['CompositeFrame'][
    'frames']['GeneralFrame'][0]['members']['ScheduledStopPoint']

stopPointsArray = []

i = 0
for stop in stopPoints:
    stopPointsArray.append(stopPoints[i]['@id'])
    i += 1

for stop in stopPointsArray:
    for match in regexId.finditer(stopPointsArray[i2]):
        listId.append(match.group(1))
        i2 += 1


# Créer la liste des trajets avec leur nom et horaires associés >> trajetsTab
Trajets = dictionary['PublicationDelivery']['dataObjects']['CompositeFrame'][
    'frames']['GeneralFrame'][1]['members']['ServiceJourney']


t = 1
trajetsTabRange = 0

for trajet in Trajets:
    h = 1
    trajetName = trajet['Name']
    trajetTypeRef = trajet['dayTypes']['DayTypeRef']['@ref']

    if '1101100' in trajetTypeRef:
        type = "lundi-mardi-jeudi-vendredi"
    else:
        if '0010000' in trajetTypeRef:
            type = "mercredi"
        else:
            type = "toute la semaine"

    currentTrajet = trajet['passingTimes']['TimetabledPassingTime']

    trajetsTab.append({"id": t, "type": type, "destination": trajetName,
                      "horaires": []})

    for horaire in currentTrajet:

        arrival = horaire['ArrivalTime']
        departure = horaire['DepartureTime']

        trajetsTab[trajetsTabRange]['horaires'].append(
            {"id": h, "arrival": arrival, "departure": departure})

        h += 1

    t += 1
    trajetsTabRange += 1

# Créer la liste des patterns des trajets avec leur nom, l'ordre des arrêts et leur id associés >> patternsTab
Patterns = dictionary['PublicationDelivery']['dataObjects']['CompositeFrame'][
    'frames']['GeneralFrame'][0]['members']['ServiceJourneyPattern']

p = 1
patternsTabRange = 0

for pattern in Patterns:

    patternName = pattern['Name']

    currentPattern = pattern['pointsInSequence']['StopPointInJourneyPattern']

    patternsTab.append({"id": p, "patternName": patternName,
                        "pattern": []})

    for stop in currentPattern:

        order = stop['@order']
        id = stop['@id']

        for match in regexId.finditer(id):
            patternsTab[patternsTabRange]['pattern'].append(
                {"order": order, "id": match.group(1)})

    patternsTabRange += 1
    p += 1


# Créer la liste des arrêts avec leur id, nom, longitude et latitude associés

f = open("./data/stops.txt", "r")
f.readline()
for line in f:
    if line[0].isnumeric():
        stop = {"id": line.split(',')[0], "name": line.split(",")[1],
                "latitude": line.split(",")[2], "longitude": line.split(",")[3]}
        stopsNameWithId.append(stop)

matched = []
for id in listId:
    for stop in stopsNameWithId:
        if id == stop['id']:
            matched.append(stop)


# Lier les différents résultats dans un seul tableau des arrêts avec leurs horaires

stopComplete = []

def createStopsTab ():
    for p in patternsTab:
        pName = p['patternName']

        for t in trajetsTab:
            if pName in t['destination']:
                destination = t['destination']
                index = 0
                for o in t['horaires']:
                    stopId = p['pattern'][index]['id']
                    for element in matched:
                        if stopId == element['id']:
                            index += 1
                            stopComplete.append({"destination": destination, "type": t['type'], "id": stopId, "name": element['name'], "arrival": o['arrival'], "departure": o[
                                                'departure'], "latitude": element['latitude'], "longitude": element['longitude']})


for elem in stopComplete:
    print(elem)

import xmltodict
import json
import re
from pymysql.pymysql_get_databases import createTable,deleteTable,insertData,getTime
from datetime import datetime, timedelta


with open('./data/BORDEAUX_METROPOLE_offre_Bus_TBM_BordeauxM_tropole__95_95.xml', encoding='utf-8') as file:
    dictionary = xmltodict.parse(file.read())

json_object = json.dumps(dictionary)


regexId = re.compile('[A-Za-z:_]+95_[A-Z0-9]+a([0-9]+)')

trajetsTab = []
patternsTab = []
listId = []
stopsNameWithId = []

# Créer la liste des ID des arrêts
stopPoints = dictionary['PublicationDelivery']['dataObjects']['CompositeFrame'][
    'frames']['GeneralFrame'][0]['members']['ScheduledStopPoint']

stopPointsArray = []

for stop in stopPoints:
    stopPointsArray.append(stop['@id'])

for stop in stopPointsArray:
    for match in regexId.finditer(stop):
        listId.append(match.group(1))


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
        type_ = "lundi-mardi-jeudi-vendredi"
    else:
        if '0010000' in trajetTypeRef:
            type_ = "mercredi"
        else:
            type_ = "toute la semaine"

    currentTrajet = trajet['passingTimes']['TimetabledPassingTime']

    trajetsTab.append({"id": t, "type": type_, "destination": trajetName,
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

with open('./data/stops.txt', encoding='utf-8') as file:
    file.readline()
    for line in file:
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



def insertDataToDatabase():
    deleteTable()
    createTable()
    for elem in stopComplete:
        insertData(elem)

def returnTimeOftravel(start,end):
    timeStart = getTime(start)
    timeEnd = getTime(end)

    time_object_start = datetime.strptime(timeStart[1], '%H:%M:%S').time()
    time_object_end = datetime.strptime(timeEnd[1], '%H:%M:%S').time()

    delta = timedelta(hours = time_object_end.hour - time_object_start.hour, minutes = time_object_end.minute - time_object_start.minute, seconds = time_object_end.second - time_object_start.second)

    return int(delta.total_seconds())
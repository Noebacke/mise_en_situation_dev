import xmltodict
import json
import re

with open('./data/BORDEAUX_METROPOLE_offre_Bus_TBM_BordeauxM_tropole__95_95.xml') as file:
    dictionary = xmltodict.parse(file.read())

json_object = json.dumps(dictionary)

stopPoints = dictionary['PublicationDelivery']['dataObjects']['CompositeFrame'][
    'frames']['GeneralFrame'][0]['members']['ScheduledStopPoint']

# print(stopPoints)

stopPointsArray = []

i = 0
for stop in stopPoints:
    stopPointsArray.append(stopPoints[i]['@id'])
    i += 1
# print(stopPointsArray)

regexId = re.compile('[A-Za-z:_]+95_[A-Z0-9]+a([0-9]+)')

i2 = 0
listId = []

for stop in stopPointsArray:
    for match in regexId.finditer(stopPointsArray[i2]):
        listId.append(match.group(1))
        i2 += 1

print(listId)


stopsNameWithId = []


f = open("./data/stops.txt", "r")
f.readline()
print(f.readline().split(",")[0])
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

print(matched)

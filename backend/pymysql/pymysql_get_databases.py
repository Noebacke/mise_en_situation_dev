import mysql.connector
import json


def deleteTable():
  mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="ligne95"
  )
  cursor = mydb.cursor()
  cursor.execute("DROP TABLE IF EXISTS STOPS")

def createTable(): 
  mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="ligne95"
  )
  cursor = mydb.cursor()
  cursor.execute(
    "CREATE TABLE STOPS (id INT AUTO_INCREMENT primary key NOT NULL, id_stop INT, name VARCHAR(100) NOT NULL, latitude FLOAT,longitude FLOAT, destination VARCHAR(100),\
        type VARCHAR(100), arrival VARCHAR(10), departure VARCHAR(10));"
    )


sql = "INSERT INTO STOPS (id_stop, name, latitude, longitude, destination, type, arrival, departure) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"


def insertData(e):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="123456",
        database="ligne95"
    )
    cursor = mydb.cursor()
    val = (e['id'], e['name'], e['latitude'], e['longitude'],
           e['destination'], e['type'], e['arrival'], e['departure'])
    cursor.execute(sql, val)
    mydb.commit()


def getDataFromDatabase():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="123456",
        database="ligne95"
    )
    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM STOPS")

    myresult = mycursor.fetchall()
    print(myresult)
    data = []
    for row in myresult:
      data.append({"id": row[0], "id_stop": row[1], "name": row[2], "latitude": row[3], "longitude": row[4],
                "destination": row[5], "type": row[6], "arrival": row[7], "departure": row[8]})
    return data

def getTime(start):

  mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="ligne95"
  )

  mycursor = mydb.cursor()

  mycursor.execute(("SELECT id_stop,arrival FROM STOPS WHERE id_stop=\'%s\'") %start)

  myresult = mycursor.fetchall()

  print(myresult)
  return myresult[0]
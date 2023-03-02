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

def getTime(start):

  mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="ligne95"
  )

  mycursor = mydb.cursor()

  mycursor.execute(("SELECT name,arrival FROM STOPS WHERE name=\'%s\'") % start)

  myresult = mycursor.fetchall()

  print(myresult)
  return myresult

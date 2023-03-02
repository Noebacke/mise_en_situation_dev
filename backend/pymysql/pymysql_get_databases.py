import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="123456",
  database="ligne95"
)

mycursor = mydb.cursor()

mycursor.execute("DROP TABLE IF EXISTS STOPS")

mycursor.execute(
    "CREATE TABLE STOPS (id INT AUTO_INCREMENT primary key NOT NULL, id_stop INT, name VARCHAR(100) NOT NULL, latitude FLOAT,longitude FLOAT, destination VARCHAR(100),\
        type VARCHAR(100), arrival VARCHAR(10), departure VARCHAR(10));"
    )

mycursor.execute("SHOW TABLES")

for x in mycursor:
  print(x)

mydb.close()
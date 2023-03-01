import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="123456",
  database="ligne95"
)

mycursor = mydb.cursor()

mycursor.execute(
    "CREATE TABLE stops (id INT NOT NULL AUTO_INCREMENT, id_stop INT, name VARCHAR(100) NOT NULL, latitude FLOAT,longitude FLOAT);"
    )

mycursor.execute("SHOW TABLES")

for x in mycursor:
  print(x)
import fastapi
from extractXml import insertDataToDatabase,returnTimeOftravel



if __name__ == '__main__':
    insertDataToDatabase()
    returnTimeOftravel("Collège Claude Massé","Broustey")
import json

def save(obj):
    try: 
        if obj.player == 1:
            with open("./client/src/dataX.json", "w") as f:
                json.dump(obj.toJson(), f)
        elif obj.player == -1: 
            with open("./client/src/dataO.json", "w") as f:
                json.dump(obj.toJson(), f)
    except Exception as ex:
        print("Error", ex)

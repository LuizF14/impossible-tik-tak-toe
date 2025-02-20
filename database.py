import json

def save(obj):
    try: 
        if obj.children[0].player == 'B':
            with open("./client/src/dataB.json", "w") as f:
                json.dump(obj.toJson(), f)
        elif obj.children[0].player == 'P': 
            with open("./client/src/dataP.json", "w") as f:
                json.dump(obj.toJson(), f)
    except Exception as ex:
        print("Error", ex)

# import pickle

# def save(obj):
#     try:
#         with open("data.pickle", "wb") as f:
#             pickle.dump(obj, f, protocol=pickle.HIGHEST_PROTOCOL)
#     except Exception as ex:
#         print("Error during pickling object (Possibly unsupported):", ex)
    
# def load(filename):
#     try:
#         with open(filename, "rb") as f:
#             return pickle.load(f)
#     except Exception as ex:
#         print("Error during unpickling object (Possibly unsupported):", ex)

import json


def save(obj):
    try: 
        with open("./client/src/data.json", "w") as f:
            json.dump(obj.toJson(), f)
    except Exception as ex:
        print("Error", ex)


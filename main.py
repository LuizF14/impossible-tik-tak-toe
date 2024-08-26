from bot.create_game_tree import create_game_tree
from utils.database import save, load
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/", methods=['GET'])
def hello_world():
    return "Hello World!"

# root = create_game_tree()

# def print_rec(root):
#     print(f'{root.table} - {root.score}')
#     if root.children_nodes == []: 
#         return
#     print_rec(root.children_nodes[0])

# print_rec(root)
# save(root)
# root = load('data.pickle')
# print(root.table)


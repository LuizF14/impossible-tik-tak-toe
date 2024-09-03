from create_game_tree import create_game_tree
from database import save
# root = create_game_tree()

root = create_game_tree()
save(root)

# def print_rec(root):
#     print(f'{root.table} - {root.score}')
#     if root.children_nodes == []: 
#         return
#     print_rec(root.children_nodes[0])

# print_rec(root)
# root = load('data.pickle')
# print(root.table)


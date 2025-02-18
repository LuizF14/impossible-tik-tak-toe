from create_game_tree import create_game_tree, filter_game_tree
from database import save
from test import test_performance

root = create_game_tree()
filtered_root = filter_game_tree(root)
# test_performance(root)

save(root)

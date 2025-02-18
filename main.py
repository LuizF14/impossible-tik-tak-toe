from create_game_tree import create_game_tree, filter_game_tree
from database import save
from test import test_performance

root_X = create_game_tree(max_first_player=True)
root_O = create_game_tree(max_first_player=False)
filtered_root_X = filter_game_tree(root_X)
filtered_root_O = filter_game_tree(root_O)
# test_performance(root)

save(filtered_root_X)
save(filtered_root_O)

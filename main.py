from create_game_tree import create_game_tree, filter_game_tree
from database import save
from test import test_performance

root_B = create_game_tree(max_first_player=True)
root_P = create_game_tree(max_first_player=False)
filtered_root_B = filter_game_tree(root_B)
filtered_root_P = filter_game_tree(root_P)
# test_performance(root)

save(filtered_root_B)
save(filtered_root_P)

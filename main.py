from create_game_tree import create_game_tree
from database import save
from test import test_performance

root = create_game_tree()
test_performance(root)

save(root)

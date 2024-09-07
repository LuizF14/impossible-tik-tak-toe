def test_performance_rec(root):
    if root.children_nodes == []:
        if root.score == 1: test_performance_rec.victories += 1
        elif root.score == -1: test_performance_rec.losses += 1
        elif root.score == 0: test_performance_rec.ties += 1
        return
    for i in root.children_nodes:
        test_performance_rec(i)

def test_performance(root):
    test_performance_rec.victories = 0
    test_performance_rec.losses = 0
    test_performance_rec.ties = 0
    test_performance_rec(root)
    return test_performance_rec.victories, test_performance_rec.losses, test_performance_rec.ties
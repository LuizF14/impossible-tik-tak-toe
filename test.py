def test_performance_rec(root, results):
    if not root.children:
        if root.score == 10:
            results[0] += 1  # Victories
        elif root.score == -10:
            results[1] += 1  # Losses
        elif root.score == 0:
            results[2] += 1  # Ties
        return

    best_child = max(root.children, key=lambda x: x.score)
    test_performance_rec(best_child, results)

def test_performance(root):
    results = [0, 0, 0]
    test_performance_rec(root, results)
    print(f"Victories: {results[0]}, Losses: {results[1]}, Ties: {results[2]}")
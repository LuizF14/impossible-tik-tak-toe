TABLE_LENGTH = 9

class TreeNode():
    def __init__(self, table, player = ''):
        self.children = []
        self.player = player
        self.table = table
        self.score = 0
    def toJson(self):
        json = {
            "table": self.table,
            "children": [],
            "player": self.player,
        }
        for i in self.children:
            json["children"].append(i.toJson())
        return json
    def copy_node(self):
        new_node = TreeNode(self.table)
        new_node.player = self.player
        new_node.score = self.score
        return new_node


def evaluate_score(table):
    end_table = [[1,1,1,0,0,0,0,0,0],
                [0,0,0,1,1,1,0,0,0],
                [0,0,0,0,0,0,1,1,1],
                [1,0,0,1,0,0,1,0,0],
                [0,1,0,0,1,0,0,1,0],
                [0,0,1,0,0,1,0,0,1],
                [1,0,0,0,1,0,0,0,1],  
                [0,0,1,0,1,0,1,0,0],  
            ]
    
    for i in end_table:
        status = 0
        for j in range(9):
            if i[j] == 1 and table[j] == 'X':
                status = 10
            elif i[j] == 1 and table[j] != 'X':
                status = 0
                break
        if status == 10: return status

        for j in range(9):
            if i[j] == 1 and table[j] == 'O':
                status = -10
            elif i[j] == 1 and table[j] != 'O':
                status = 0
                break
        if status == -10: return status
    return 0

def is_game_end(table):
    for i in table: 
        if i == '-':
            return False
    return True

def tree_rec(root, depth, isMax):
    score = evaluate_score(root.table)

    if score == 10 or score == -10: 
        return score

    if is_game_end(root.table):
        return 0

    if isMax: 
        best_score = -1000
        for i, cell in enumerate(root.table): 
            if cell == '-': 
                child_node = TreeNode(root.table.copy(), player='X')
                child_node.table[i] = child_node.player

                rec_score = tree_rec(child_node, depth+1, False)
                best_score = max(best_score, rec_score)
                child_node.score = best_score
                root.children.append(child_node)
        return best_score
    else: 
        best_score = 1000
        for i, cell in enumerate(root.table): 
            if cell == '-': 
                child_node = TreeNode(root.table.copy(), player='O')
                child_node.table[i] = child_node.player

                rec_score = tree_rec(child_node, depth+1, True)
                best_score = min(best_score, rec_score)
                child_node.score = best_score
                root.children.append(child_node)
        return best_score

def filter_rec(filtered, root):
    if root.children == []:
        return

    if root.player == 'O': 
        best_child = max(root.children, key=lambda x: x.score)
        filtered_child = best_child.copy_node()
        filtered.children.append(filtered_child)
        filter_rec(filtered_child, best_child)
    elif root.player == 'X':
        for i in root.children:
            filtered_child = i.copy_node()
            filtered.children.append(filtered_child)
            filter_rec(filtered_child, i) 
    

def filter_game_tree(root):
    filtered_table = ['-'] * TABLE_LENGTH
    filtered_tree = TreeNode(filtered_table, player='')
    filter_rec(filtered_tree, root)
    return filtered_tree

def create_game_tree():
    root_table = ['-'] * TABLE_LENGTH
    root = TreeNode(root_table, player='O')
    tree_rec(root, depth=0, isMax=True)
    return root

# 35998025129
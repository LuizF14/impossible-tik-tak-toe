TABLE_LENGTH = 9
game_table = [0] * TABLE_LENGTH

class TreeNode():
    def __init__(self, table):
        self.table = table
        self.children_nodes = []
        self.player = -1
        self.score = 0
    def toJson(self):
        json = {
            "table": self.table,
            "children": [],
            "player": self.player,
        }
        for i in self.children_nodes:
            json["children"].append(i.toJson())
        return json

def is_game_end(table):
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
            if i[j] == 1 and table[j] == 1:
                status = 1
            elif i[j] == 1 and table[j] != 1:
                status = 0
                break
        if status == 1: return status

        for j in range(9):
            if i[j] == 1 and table[j] == -1:
                status = -1
            elif i[j] == 1 and table[j] != -1:
                status = 0
                break
        if status == -1: return status
    return 0

def get_largest_score(children_nodes):
    largest_score = children_nodes[0]
    for i in children_nodes:
        if i.score > largest_score.score:
            largest_score = i
    return largest_score

def tree_rec(root):
    children_nodes = []
    for i in range(TABLE_LENGTH):
        if root.table[i] == 0:
            child_node = TreeNode(root.table.copy())
            child_node.player = root.player * -1
            child_node.table[i] = child_node.player

            children_nodes.append(child_node)
            if is_game_end(child_node.table) == 0:
                tree_rec(child_node)
                for j in child_node.children_nodes:
                    child_node.score += j.score
            else: child_node.score = is_game_end(child_node.table)
    
    if root.player == -1:
        root.children_nodes.append(get_largest_score(children_nodes))
    else: root.children_nodes = children_nodes

def create_game_tree():
    root = TreeNode(game_table)
    tree_rec(root)
    return root
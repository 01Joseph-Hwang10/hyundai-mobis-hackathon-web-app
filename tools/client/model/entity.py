class Entity:

    id: str
    createdAt: int

    def __init__(self, data):
        self.id = data['id']
        self.createdAt = data['createdAt']

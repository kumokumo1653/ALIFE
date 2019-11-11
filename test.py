import pyxel

class App:
    def __init__(self):
        pyxel.init(160, 120,fps=1)
        self.x1 = 0
        self.x2 = 0
        pyxel.run(self.update, self.draw)

    def update(self):
        self.x1 = (self.x1 + 1) % pyxel.width

    def draw(self):
        pyxel.cls(0)
        pyxel.rect(self.x1, 0, 8, 8, 9)
        pyxel.circb(50,50,5,7)


App()
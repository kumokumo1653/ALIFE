import pyxel
from plant import Plant

class Weed(Plant):
    def __init__(self,posX,posY,width,height,color):
        super().__init__(posX,posY,width,height)
        pyxel.rect(posX,posY,width,height,color)
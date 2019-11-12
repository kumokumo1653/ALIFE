import pyxel
from plant import Plant
from dataset import *

class Weed(Plant):
    def __init__(self,posX,posY,width,height,color):
        super().__init__(posX,posY,width,height)
        pyxel.rect(posX,posY,width,height,color)

    def redraw(self):
        pyxel.rect(self.posX, self.posY, self.width, self.height, Plant_Weed.color)
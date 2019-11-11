import pyxel
from animal import Animal

class Herbivore(Animal):
    def __init__(self,posX,posY,width,height,color,searchRange):
        super().__init__(posX,posY,width,height,searchRange)
        pyxel.rect(posX,posY,width,height,color)
    
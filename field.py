import pyxel
from dataset import *
import collisionDetection as coll
from herbivore import Herbivore
from weed import Weed
import random
class Field():
    def __init__(self,width,height):
        self.width = width
        self.height = height
        pyxel.init(self.width,self.height)
        pyxel.cls(Environment.ground)
        self.herbi = Herbivore(10,10,Animal_Herbivore.width,Animal_Herbivore.height,Animal_Herbivore.color,Animal_Herbivore.searchRange)
        self.weed = Weed(random.randrange(pyxel.width), random.randrange(pyxel.height),Plant_Weed.width, Plant_Weed.height, Plant_Weed.color)
        pyxel.run(self.update,self.draw)
    
    def update(self):
        if pyxel.btnp(pyxel.KEY_Q):
            pyxel.quit()
        self.herbi.move(random.choice([Direction.up, Direction.down, Direction.right, Direction.left]),1)
        if self.isOut(self.herbi.posX,self.herbi.posY, Animal_Herbivore.width, Animal_Herbivore.height):
            pyxel.quit()
        if coll.collisionDetection(self.herbi.posX,self.herbi.posY,self.herbi.width,self.herbi.height,self.weed.posX,self.weed.posY,self.weed.width,self.weed.height):
            pyxel.quit()
        
    def draw(self):
        pyxel.cls(Environment.ground)
        self.weed.redraw()
        self.herbi.searchAround()
        self.herbi.redraw()


    def isOut(self,x,y,w,h):
        if(x < 0) or (y < 0) or (pyxel.width < x + w) or (pyxel.height < y + h):
            return True
        return False
Field(25,25)
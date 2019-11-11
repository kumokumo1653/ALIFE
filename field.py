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
        pyxel.cls(7)
        pyxel.rect(0,15,2,2,4)
        self.herbi = Herbivore(10,10,Animal_Herbivore.width,Animal_Herbivore.height,Animal_Herbivore.color,Animal_Herbivore.searchRange)
        pyxel.run(self.update,self.draw)
    
    def update(self):
        if pyxel.btnp(pyxel.KEY_Q):
            pyxel.quit()
        self.herbi.move(random.choice([Direction.up, Direction.down, Direction.right, Direction.left]),1)
        if self.isOut(self.herbi.posX,self.herbi.posY, Animal_Herbivore.width, Animal_Herbivore.height):
            pyxel.quit()
        
    def draw(self):
        pyxel.cls(7)
        pyxel.rect(0,15,2,2,4)
        self.herbi.searchAround()
        pyxel.rect(self.herbi.posX, self.herbi.posY, Animal_Herbivore.width, Animal_Herbivore.height, Animal_Herbivore.color)


    def isOut(self,x,y,w,h):
        if(coll.collisionDetection(x,y,w,h,-1,-1,pyxel.width + 1,1) or
            coll.collisionDetection(x,y,w,h,-1,-1,1,pyxel.height + 1) or 
            coll.collisionDetection(x,y,w,h,0,pyxel.height,pyxel.width,1) or
            coll.collisionDetection(x,y,w,h,pyxel.width,0,1,pyxel.height)):
            return True
        return False

Field(25,25)
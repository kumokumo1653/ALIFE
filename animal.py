import math 
import pyxel
import numpy as np
class Animal():
    def __init__(self,posX,posY,width,height,searchRange):
        self.posX = posX
        self.posY = posY
        self.width = width
        self.height = height
        self.searchRange = searchRange
    #direction
    # 1...up
    # 2...down
    # 3...right
    # 4...left
    #speed... n Pixel/ f
    def move(self,direction,speed):
        if direction == 1:
            self.posY -= speed
        elif direction == 2:
            self.posY += speed
        elif direction == 3:
            self.posX += speed
        elif direction == 4:
            self.posX -= speed
    def searchAround(self):
        # 範囲座標を特定
        centerX = math.floor(self.width / 2)
        centerY = math.floor(self.height / 2)
        startVec2 = (self.posX - self.searchRange + centerX, self.posY - self.searchRange + centerY)
        endVec2 = (self.posX + self.searchRange + centerX, self.posY + self.searchRange + centerY)
        
        search = np.empty((self.searchRange * 2, self.searchRange * 2),np.int)
        np.full_like(search,-1)
        for i in range(startVec2[0],endVec2[0]):
            for j in range(startVec2[1], endVec2[1]):
                if(i >= 0 and i < pyxel.width and j >= 0 and j < pyxel.height):
                    search[j - startVec2[1],i - startVec2[0]] = pyxel.image(4,system=True).get(i,j)
                else:
                    search[j - startVec2[1], i - startVec2[0]] = -1
        print(search)

        
    

   
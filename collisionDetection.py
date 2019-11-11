def collisionDetection(x1,y1,w1,h1,x2,y2,w2,h2):
    if(abs(x1 - x2) < (w1 / 2 + w2 / 2)) and (abs(y1 - y2) < (h1 / 2 + h2 / 2)):
        return True
    return False

#pragma once
#include "Random.hpp"
#include <cmath>
#include <iostream>
class Creature;
class Action {
public:
	virtual int action(Creature* creature) = 0;
};

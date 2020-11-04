#pragma once
#include "Random.hpp"
#include <cmath>
#include <iostream>
#include "Location.hpp"
class Creature;
class Action {
public:
	virtual int action(Creature* creature) = 0;
};

#pragma once
#include "Creature.hpp"
class Creature;
class Action {
public:
	virtual int action(Creature* creature) = 0;
};

#pragma once 
#include "Action.hpp"
#include "Creature.hpp"
class Action;
class Creature;
class Initialize : public Action {
public:
	int action(Creature* creature)override;
};
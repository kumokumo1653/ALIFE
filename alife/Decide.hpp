#pragma once
#include "Action.hpp"
#include "Creature.hpp"
class Creature;
class Action;
class Decide : public Action {
public:
	int action(Creature* creature)override;
private:
	Rand::Random rand;
};

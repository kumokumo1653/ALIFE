#pragma once
#include "Action.hpp"
#include "Random.hpp"
class Action;
class Decide : public Action {
public:
	int action(Creature* creature)override;
private:
	Rand::Random rand;
};

#pragma once
#include "Action.hpp"
#pragma once
#include "Random.hpp"
#pragma once
#include "Creature.hpp"
class Creature;
class Action;
class Decide : public Action {
public:
	int action(Creature* creature)override;
private:
	Rand::Random rand;
};

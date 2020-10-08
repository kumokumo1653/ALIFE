#pragma once
#include "Creature.hpp"
#include "Action.hpp"
class Creature;
class Action;
class Wait : public Action {
public:
	int action(Creature* creature)override;
};


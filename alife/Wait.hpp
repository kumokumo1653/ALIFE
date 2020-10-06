#pragma once
#include "Action.hpp"
class Action;
class Wait : public Action {
public:
	int action(Creature* creature)override;
};

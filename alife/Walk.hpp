#pragma once 
#include "Action.hpp"
class Action;
class Walk : public Action {
	public: int action(Creature* creature) override;
};

#pragma once 
#include "Decide.hpp"

int Decide::action(Creature* creature) {
	creature->memory->x = rand.RandInt(0,400);
	creature->memory->y = rand.RandInt(0,400);
	return 1;
}
#pragma once
#include "Initialize.hpp"

int Initialize::action(Creature* creature) {
	creature->memory->x = -1;
	creature->memory->y = -1; 
	return 1;
}

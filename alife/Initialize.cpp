#pragma once
#include "Initialize.hpp"

int Initialize::action(Creature* creature) {
	creature->memory->destination.location.x = -1;
	creature->memory->destination.location.y = -1; 
	creature->memory->destination.location.z = 0; 

	creature->memory->destination.range = -1;
	return 1;
}

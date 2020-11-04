#include "Decide.hpp"

int Decide::action(Creature* creature) {
	creature->memory->destination.location.x = rand.RandInt(0,400);
	creature->memory->destination.location.y = rand.RandInt(0,400);
	creature->memory->destination.range = 2.0;
	return 1;
}
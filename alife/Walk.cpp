#pragma once 
#include "Walk.hpp"

int Walk::action(Creature* creature) {

	int x = creature->memory->x;
	int y = creature->memory->y;
	if (x < 0 || y < 0) return 0;
	if ((int(creature->x) == x && int(creature->y) == y) || int(ceil(creature->x)) == x && int(ceil(creature->y) == y) || int(round(creature->x) == x) && int(round(creature->y) == y)) {
		return 1;
	}
	double theta = atan2(y - creature->y, x - creature->x);
	creature->x += creature->r * cos(theta);
	creature->y += creature->r * sin(theta);
	return 2;
}

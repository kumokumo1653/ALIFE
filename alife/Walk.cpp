#pragma once 
#include "Walk.hpp"

int Walk::action(Creature* creature) {

	double range = creature->memory->destination.range;
	if (range < 0) return 0;
	double distance = VSizeD(VSubD(creature->vector, creature->memory->destination.location));
	if(distance <= range + creature->size){
		return 1;
	}
	double theta = atan2(creature->memory->destination.location.y - creature->vector.y, creature->memory->destination.location.x - creature->vector.x);
	creature->vector.x += creature->r * cos(theta);
	creature->vector.y += creature->r * sin(theta);
	return 2;
}

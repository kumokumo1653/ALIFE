#pragma once
#include "Brain.hpp"
using namespace Rand;


Brain::Brain() :state(s_init), condition(flag_null) {

}

bool Brain::init(Creature* creature) {
	memory.x = -1;
	memory.y = -1; 
}
//creature*,int x,int y
bool Brain::go(Creature* creature) {
	int x = memory.x;
	int y = memory.y;
	if (x < 0 || y < 0) return false;
	if (int(creature->x) == x && int(creature->y) == y)
		return;
	double theta = atan2(y - creature->y, x - creature->x);
	creature->x += creature->r * cos(theta);
	creature->y += creature->r * sin(theta);
	return true;
}

//creature*
bool Brain::wait(Creature* creature) {
	return true;
}

bool Brain::decide(Creature* creature) {
	memory.x = rand.RandInt(0, 400);
	memory.y = rand.RandInt(0, 400);
	return true;

}

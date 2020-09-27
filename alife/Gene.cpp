#pragma once
#include "Gene.hpp"
using namespace std;

Gene::Gene() :state(init),condition(flag_null){
}

//creature*,int x,int y
bool Gene::go(Creature* creature,...) {
	va_list args;
    va_start( args, creature );
	int x = va_arg(args, int);
	int y = va_arg(args, int);
	va_end(args);
	if (int(creature->x) == x && int(creature->y) == y)
		return;
	double theta = atan2(y - creature->y, x - creature->x);
	creature->x += creature->r * cos(theta);
	creature->y += creature->r * sin(theta);
	return true;
}

//creature*
bool Gene::wait(Creature* creature,...) {
	return true;
}
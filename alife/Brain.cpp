#pragma once
#include "Brain.hpp"


Brain::Brain() :state(s_init), condition(null) {
	action_table[0] = new Initialize;
	action_table[1] = new Wait;
	action_table[2] = new Walk;
	action_table[3] = new Decide;

}



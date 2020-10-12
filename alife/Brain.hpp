#pragma once
#include "Creature.hpp"
#include "Action.hpp"
#include "Wait.hpp"
#include "Walk.hpp"
#include "Initialize.hpp"
#include "Decide.hpp"
class Creature;
class Wait;
class Walk;
class Initialize;
class Decide;
class Brain {
	private:
		typedef enum {
			flag_null,
			flag_stop,
			flag_move,
			flag_decide,
			c_size,
		}Conditions;
		
		typedef enum {
			s_init,
			s_stop,
			s_move,
			s_decide,
			s_size,
		}State;


		
	public:
		Brain();
		int state;
		int condition;
		int state_table[s_size][c_size] = {
			{s_stop,s_stop,s_move,s_decide},
			{s_init,s_stop,s_move,s_decide},
			{s_init,s_stop,s_move,s_decide},
		};
		Action* action_table[s_size];

};


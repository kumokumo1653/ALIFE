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
			error,
			completion,
			processing,
			null,
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
			{s_init,s_decide,s_init,s_init},
			{s_init,s_decide,s_stop,s_init},
			{s_init,s_stop,s_move,s_init},
			{s_init,s_move,s_decide,s_init},
		};
		Action* action_table[s_size];

};


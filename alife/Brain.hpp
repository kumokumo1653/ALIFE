#pragma once
#include "Creature.hpp"
#pragma once
#include <vector>
#pragma once
#include "Random.hpp"
class Creature;

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


		struct Memory memory;
		Rand::Random rand;
		bool init(Creature*);
		bool go(Creature*);
		bool wait(Creature*);
		bool decide(Creature*);
		
	public:
		Brain();
		int state;
		int condition;
		int state_table[s_size][c_size] = {
			{s_stop,s_stop,s_move,s_decide},
			{s_init,s_stop,s_move,s_decide},
			{s_init,s_stop,s_move,s_decide},
		};
		bool(Brain::*Brain::action_table[Brain::State::s_size])(Creature*) = { &Brain::init, &Brain::wait ,&Brain::go ,&Brain::decide };
};

struct Memory {
	int x;
	int y;
};

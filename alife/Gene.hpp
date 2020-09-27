#pragma once
#include<array>
#pragma once
#include <utility>
#pragma once
#include <math.h>
#pragma once
#include "Creature.hpp"
#pragma once
#include<exception>
#pragma once
#include <stdarg.h>
#include <array>

class Creature;
class Gene {
	private:
		typedef enum {
			flag_null,
			flag_stop,
			flag_move,
			c_size,
		}Conditions;
		
		typedef enum {
			init = 0,
			stop,
			move,
			s_size,
		}State;

		bool go(Creature*,...);
		bool wait(Creature*,...);
		
	public:
		Gene();
		int state;
		int condition;
		int state_table[s_size][c_size] = {
			{stop,move},
			{stop,move},
			{stop,move},
		};
		bool(Gene::* action_table[s_size][c_size])(Creature*, ...) = {
			{&Gene::wait ,&Gene::go},
			{&Gene::wait ,&Gene::go},
			{&Gene::wait ,&Gene::go},
		};
};

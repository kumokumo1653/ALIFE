#include "Creature.hpp"

Creature::Creature(int HP, int size, double x, double y, double r):
HP(HP), size(size), x(x), y(y), r(r){}

void Creature::behavior() {
	(brain->*Brain::action_table[brain->state])(this);
}
#include "Creature.hpp"

Creature::Creature(int HP, int size, double x, double y, double r):
HP(HP), size(size), x(x), y(y), r(r){}

void Creature::behavior() {
	//“®ìŽÀs
	int result = brain->action_table[brain->state]->action(this);
	
	
	//ó‘Ô‘JˆÚ
	brain->state = brain->state_table[brain->state][brain->condition];
}
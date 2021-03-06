#include "Creature.hpp"

Creature::Creature(int HP, int size, VECTOR_D vector, double r):
HP(HP), size(size), vector(vector), r(r), brain(new Brain), memory(new Memory){}

void Creature::behavior() {
	//動作実行
	int result = brain->action_table[brain->state]->action(this);
	
	
		
	//状態遷移
	brain->state = brain->state_table[brain->state][result];
}
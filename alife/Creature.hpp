#pragma once
#include <DxLib.h>
#include "Brain.hpp"
#include "Memory.hpp"
class Brain;
class Memory;
class Creature {
	private:
		Brain* brain;
	public:
		Creature(int HP, int size, VECTOR_D vector, double r);
		int HP;
		int size;
		VECTOR_D vector;
		double r;//?ړ???
		void behavior();
		Memory* memory;
};

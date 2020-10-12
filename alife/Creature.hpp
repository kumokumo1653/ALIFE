#pragma once
#include "Brain.hpp"
#include "Memory.hpp"
class Brain;
class Memory;
class Creature {
	private:
		Brain* brain;
	public:
		Creature(int HP, int size, double x, double y, double r);
		int HP;
		int size;
		double x;
		double y;
		double r;//ˆÚ“®—Ê
		void behavior();
		Memory* memory;
};

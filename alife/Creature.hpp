#pragma once
#include"Gene.hpp"
#pragma once
#include "Brain.hpp"
#pragma once
#include "Memory.hpp"
class Brain;
class Gene;
class Memory;
class Creature {
	private:
		Gene* gene = new Gene;
		Brain* brain = new Brain;
	public:
		Creature(int HP, int size, double x, double y, double r);
		int HP;
		int size;
		double x;
		double y;
		double r;//ˆÚ“®—Ê
		void behavior();
		Memory* memory = new Memory;
};

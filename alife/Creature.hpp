#pragma once
#include"Gene.hpp"
#pragma once
#include "Brain.hpp"
class Brain;
class Gene;
class Creature {
	private:
		Gene* gene;
		Brain* brain = new Brain;
	public:
		Creature(int HP, int size, double x, double y, double r);
		int HP;
		int size;
		double x;
		double y;
		double r;//ˆÚ“®—Ê
		void behavior();
};

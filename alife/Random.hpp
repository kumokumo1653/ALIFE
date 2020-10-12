#pragma once
#include <random>
#include <vector>
namespace Rand {
	class Random {
	private:
		std::random_device rand;
		std::mt19937 mt;
	public:
		Random();
		int RandInt(int min, int max);
		int RandInt(int max);
		double RandDouble(double min, double max);
		double RandDouble(double max);
		bool RandBool(double rate);
		bool RandBool();
		int RandDiscrete(std::vector<double> rateSequence);
	};
}

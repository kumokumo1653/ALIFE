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
		bool RandBool(double rate);
		int RandDiscrete(std::vector<double> rateSequence);
	};
}

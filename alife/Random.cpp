#include "Random.hpp"
Rand::Random::Random() {
	mt.seed(rand());
}

int Rand::Random::RandInt(int min, int max) {
	std::uniform_int_distribution<int> dist(min, max);
	return dist(mt);
}

bool Rand::Random::RandBool(double rate){
	std::bernoulli_distribution dist(rate);
	return dist(mt);
}

int Rand::Random::RandDiscrete(std::vector<double> rateSequence) {
	std::discrete_distribution<std::size_t> dist(rateSequence.begin(), rateSequence.end());
	return dist(mt);
}

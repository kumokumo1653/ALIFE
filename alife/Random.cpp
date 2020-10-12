#include "Random.hpp"

Rand::Random::Random() {
	mt.seed(rand());
}

int Rand::Random::RandInt(int min, int max) {
	std::uniform_int_distribution<int> dist(min, max);
	return dist(mt);
}

int Rand::Random::RandInt(int max) {
	std::uniform_int_distribution<int> dist(0, max);
	return dist(mt);
}

double Rand::Random::RandDouble(double min, double max){
	std::uniform_real_distribution<double> dist(min,max);
	return dist(mt);
}

double Rand::Random::RandDouble(double max){
	std::uniform_real_distribution<double> dist(0, max);
	return dist(mt);
}

bool Rand::Random::RandBool(double rate){
	std::bernoulli_distribution dist(rate);
	return dist(mt);
}

bool Rand::Random::RandBool(){
	std::bernoulli_distribution dist(0.5);
	return dist(mt);
}

int Rand::Random::RandDiscrete(std::vector<double> rateSequence) {
	std::discrete_distribution<std::size_t> dist(rateSequence.begin(), rateSequence.end());
	return dist(mt);
}

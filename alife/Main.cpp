#pragma once
#include <DxLib.h>
#include "Creature.hpp"

// プログラムは WinMain から始まります
int WINAPI WinMain( HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow ) {
	ChangeWindowMode(TRUE);//非全画面にセット
	SetGraphMode(640, 480, 32);//画面サイズ指定
	if( DxLib_Init() == -1 ){		// ＤＸライブラリ初期化処理
		return -1 ;			// エラーが起きたら直ちに終了
	}



	SetDrawScreen( DX_SCREEN_BACK ) ;//描画先を裏画面に
	VECTOR_D init = VGetD(200, 300, 0);
	Creature creature(10, 30, init,1.0);
	while( ProcessMessage()==0 ) {
		ClearDrawScreen();//裏画面消す
        
		creature.behavior();
		DrawCircle(creature.vector.x, creature.vector.y, creature.size, GetColor(0, 255, 0), 1);
		DrawCircle(creature.memory->destination.location.x, creature.memory->destination.location.y, creature.memory->destination.range, GetColor(255, 0, 0), 1);
		ScreenFlip();//裏画面を表画面にコピー

		if(CheckHitKey(KEY_INPUT_Q))
			DxLib_End();				// ＤＸライブラリ使用の終了処理
	}

	return 0 ;				// ソフトの終了 
}
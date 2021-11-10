import * as PIXI from 'pixi.js';

class MousewheelPlugin{
	constructor(app){
		this.app = app;
        console.log(this.app.stage);
		this.eventHandler = (e) =>{console.log("wheel");this.onMouseWheel(e);};
		this.app.view.addEventListener('mousewheel',this.eventHandler);
		this.app.view.addEventListener('DOMMouseScroll',this.eventHandler);
		this.app.view.addEventListener('wheel',this.eventHandler);
	}

	onMouseWheel(e){
		let target = this.findScrollTarget({x:e.offsetX,y:e.offsetY})
        console.log(e);
		if(target){
			e.preventDefault()
			target.emit('mousewheel', this.deriveNormalizedWheelDelta(e), e)
		}
	}

	findScrollTarget(pos){
		let hit = this.app.renderer.plugins.interaction.hitTest(pos)

		if(hit && hit.interactive)
			return hit
	}

	deriveNormalizedWheelDelta(e){
		if(e.detail){
			if(e.wheelDelta)
				return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
			else
				return -e.detail/3 // Firefox
		}else
			return e.wheelDelta/120 // IE,Safari,Chrome
	}
}

export function mousewheelPlugin (){
    PIXI.Application.registerPlugin({
        init: (options) =>{

            this.wheelPlugin = new MousewheelPlugin(this);
        },
        destroy: () =>{
            this.wheelPlugin.destroy();
        }
    });
};
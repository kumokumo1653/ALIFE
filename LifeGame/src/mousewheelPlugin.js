
class MousewheelPlugin{
	constructor(app){
		this.app = app;
		this.eventHandler = (e) =>{this.onMouseWheel(e);};
		this.app.view.addEventListener('wheel',this.eventHandler, {passive: false});
	}

	onMouseWheel(e){
		const target = this.findTarget({x:e.offsetX, y:e.offsetY});
		if(target){
			e.preventDefault();
			target.emit('wheel', e);
		}
	}

	findTarget(pos){
		const hit = this.app.renderer.plugins.interaction.hitTest(pos);

		if(hit && hit.interactive){
			return hit;
		}
	}
	destructor(){
		this.app.view.removeEventListener('wheel', this.eventHandler);
	}
	
}
export function activateMouseWheel(app){
	new MousewheelPlugin(app);
};
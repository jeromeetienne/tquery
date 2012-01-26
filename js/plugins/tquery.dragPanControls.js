/**
 * @fileOverview Plugins for tQuery and Stats.js
*/


require([
	"../js/tquery.core.js",
], function(){

/**
 * 
*/
var DragPanControls	= function(loop)
{
	this._loop	= loop	|| tQuery.loop;

	this._controls	= new THREEx.DragPanControls(tQuery.scene.camera());
	this._$onRender	= this._onRender.bind(this);
	this._loop.hookPreRender(this._$onRender);
};

DragPanControls.prototype.destroy	= function(){
	this._loop.unhookPreRender(this._$onRender);	
};

DragPanControls.prototype._onRender	= function(){
	this._controls.update();
};


// register the plugins
tQuery.register('DragPanControls', DragPanControls);
tQuery.register('createDragPanControls', function(loop){ return new tQuery.DragPanControls(loop); });

});	// require.js end

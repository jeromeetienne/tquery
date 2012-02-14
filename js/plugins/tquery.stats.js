/**
 * @fileOverview Plugins for tQuery and Stats.js
*/

(function(){

/**
 * 
*/
var myStats	= function(loop)
{
	// add Stats.js - https://github.com/mrdoob/stats.js
	this._stats	= new Stats();
	this._stats.domElement.style.position	= 'absolute';
	this._stats.domElement.style.bottom	= '0px';
	document.body.appendChild( this._stats.domElement );

	this._loop	= loop	|| tQuery.world.loop();

	this._$onRender	= this._onRender.bind(this);
	this._loop.hookPostRender(this._$onRender);
}

myStats.prototype.destroy	= function(){
	this._loop.unhookPostRender(this._$onRender);	
	document.body.removeChild(this._stats.domElement );
}

myStats.prototype._onRender	= function(){
	this._stats.update();
};

// register the plugins
tQuery.register('Stats', myStats);
tQuery.register('createStats', function(loop){ return new tQuery.Stats(loop); });

})();	// closure function end

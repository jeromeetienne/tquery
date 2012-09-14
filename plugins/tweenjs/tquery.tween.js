//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World.registerInstance('enableTweenUpdater', function(){
	// if it is already enabled, do nothing
	if( this.hasTweenUpdater() )	return this;
	// init context
	var context	= tQuery.data(this, 'tweenUpdaterCtx', {
		loopCb	: function(){
			TWEEN.update();
		}
	}, true);
	// hook the loopCb
	this.loop().hook(context.loopCb);
	return this;	// for chained API
});

tQuery.World.registerInstance('hasTweenUpdater', function(){
	var context	= tQuery.data(this, 'tweenUpdaterCtx');
	if( !context )	return false;
	return context.loopCb ? true : false;
});

tQuery.World.registerInstance('disableTweenUpdater', function(){
	// if it is already enabled, do nothing
	if( !this.hasTweenUpdater() )	return this;
	// get context
	var context	= tQuery.data(this, 'tweenUpdaterCtx');
	// hook the loopCb
	this.loop().unhook(context.loopCb);
	// remove the context
	tQuery.removeData(this, 'tweenUpdaterCtx', true);
	return this;	// for chained API
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('createTween', function(properties, delay){
	return new tQuery.Tween(properties);
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('Tween', function(properties){
	// call parent ctor
	TWEEN.Tween.call(this, properties)

	// initial back value
	this._back		= null;
	this._onUpdateCallback	= null;
	this._properties	= properties;
	this._origProperties	= tQuery.extend({}, properties);

	// overload onUpdate() to cache the value - used in .thenBounce()
	var $onUpdate	= this.onUpdate;
	this.onUpdate	= function(fn){
		this._onUpdateCallback	= fn;
		$onUpdate(fn)
		return this;
	}
});

/**
 * Getter/Setter for back value
*/
tQuery.Tween.prototype.back	= function(value){
	if( value === undefined )	return this._back;
	this._back	= value;
	return this;
}

/**
 * Getter/Setter for back value
*/
tQuery.Tween.prototype.thenBounce	= function(delay){
	//console.log("_properties", JSON.stringify(this._properties));
	//console.log("_origProperties", JSON.stringify(this._origProperties));
	//console.log("onUpdateCallbnack", this._onUpdateCallback)
	// setup a backward tween
	var tweenBack	= tQuery.createTween(this._properties)
		.to(this._origProperties, delay)
		.onUpdate(this._onUpdateCallback)
		.back(this);
	// make this tween to be chained with the one we just created
	this.chain(tweenBack);
	// return the tweenBack. use .back() to come back on the previous tween
	return tweenBack;
}

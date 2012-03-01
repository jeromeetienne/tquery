//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.DummyAnimation	= function(){
	// call parent ctor
	tQuery.DummyAnimation.parent.constructor.call(this)
}

tQuery.DummyAnimation.prototype.destroy	= function(){
	// call parent dtor
	tQuery.DummyAnimation.parent.destroy();
}

/**
 * inherit from tQuery.Animation
*/
tQuery.inherit(tQuery.DummyAnimation, tQuery.Animation);

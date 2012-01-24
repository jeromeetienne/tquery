THREE.Plugins	= {
	mixin	: function(object){
		var dest	= object.prototype || object;
		object.register	= function(name, funct) {
			if( dest[name] ){
				throw new Error('Conflict! Already method called: ' + name);
			}
			dest[name]	= funct;
		};
		object.unregister	= function(name){
			if( dest.hasOwnProperty(name) === false ){
				throw new Error('Plugin not found: ' + name);
			}
			delete dest[name];
		};
		object.registered	= function(name){
			return dest.hasOwnProperty(name) === true;
		}
	}
};

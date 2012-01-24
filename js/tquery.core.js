var tQuery	= function(object, root)
{
	if( object instanceof THREE.Object3D  && tQuery.Object3D){
		return new tQuery.Object3D(object);

	}else if( object instanceof THREE.Geometry && tQuery.Geometry){
		return new tQuery.Geometry(object);

	}else if( object instanceof THREE.Material && tQuery.Material){
		return new tQuery.Material(object);

	}else if( typeof object === "string" && tQuery.Object3D){
		return new tQuery.Object3D(object, root);

	}else{
		console.assert(false, "unsupported type")
	}
	return undefined;
};


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.each	= function(arr, callback){
	for(var i = 0; i < arr.length; i++){
		var keepLooping	= callback(arr[i])
		if( keepLooping === false )	return false;
	}
	return true;
};


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Plugins	= {
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


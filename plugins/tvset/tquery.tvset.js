//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////


tQuery.registerStatic('createTvSet', function(opts){
	var tvSet	= new tQuery.TvSet(opts)
	return tvSet;
})

tQuery.registerStatic('TvSet', function(opts){
	// call parent ctor
	tQuery.TvSet.parent.constructor.call(this)
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		frontPlane	: true,
		onComplete	: function(object3D){
		}
	});	
	
	// init the container
	var container	= new THREE.Object3D()
	this.add(container)

	// load the model
	var loader	= new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	var baseUrl	= tQuery.TvSet.baseUrl;
	var modelUrl	= baseUrl + 'models/OldTelevisionSet01/models/Old Television Set 01.dae'
	loader.load(modelUrl, function(collada){
		var tObject3D	= collada.scene;
		tQuery(tObject3D).addTo(container)	
			.positionY(-0.4)
			.addClass('tvSet')
		// notify the 
		opts.onComplete(this)
	}.bind(this));
	
	if( opts.frontPlane ){
		tQuery.createPlane().addTo(container)
			.addClass('plane')
			.setBasicMaterial()
				.color('black')
				.back()
			.positionY(0.5).positionY(0.31).positionZ(0.16)
			.scaleX(1/2.2).scaleY(1/2.85)		
	}
});


// inherit from tQuery.Object3D§
tQuery.inherit(tQuery.TvSet, tQuery.Object3D);

tQuery.TvSet.baseUrl	= "../../../plugins/tvset/";


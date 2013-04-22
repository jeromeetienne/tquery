//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World.registerInstance('addHTMLMixer', function(){
	var world	= this;
	// sanity check - it should not be there already
	console.assert( this.hasHTMLMixer() === false )
	// create it
	var htmlMixer	= new tQuery.HTMLMixer({
		world	: this
	})
	// add it to world
	tQuery.data(world, 'HTMLMixer', htmlMixer);
})

tQuery.World.registerInstance('removeHTMLMixer', function(){
	var world	= this;
	// sanity check - it should not be there already
	console.assert( this.hasHTMLMixer() === true )
	// get htmlMizxed
	var htmlMixer	= tQuery.data(world, 'HTMLMixer')
	// destroy it
	htmlMixer.destroy();
	// remove data
	tQuery.removedata(world, 'HTMLMixer')
})

tQuery.World.registerInstance('hasHTMLMixer', function(){
	var world	= this;
	return tQuery.hasData(world, 'HTMLMixer') ? true : false;
})

tQuery.World.registerInstance('htmlMixer', function(){
	var world	= this;
	// get htmlMixer
	var htmlMixer	= tQuery.data(world, 'HTMLMixer')
	// return it
	return htmlMixer;
})

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////


tQuery.registerStatic('HTMLMixer', function(opts){
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world	: tQuery.world
	});

	// your code goes here
	var world	= opts.world;
	
	// create the rendererCSS
	var rendererCSS	= new THREE.CSS3DRenderer();
	rendererCSS.setSize( window.innerWidth, window.innerHeight );
	rendererCSS.domElement.style.position	= 'absolute';
	rendererCSS.domElement.style.top	= 0;
	rendererCSS.domElement.style.margin	= 0;
	rendererCSS.domElement.style.padding	= 0;
//	rendererCSS.domElement.style.zIndex	= -1;
	document.body.appendChild( rendererCSS.domElement );
	this._rendererCSS	= rendererCSS;

	// handle the resize
	var windowResize	= THREEx.WindowResize.bind(rendererCSS, world.camera().get(0));		
	this.addEventListener('destroy', function(){
		windowResize.stop()
	});

	// put the mainRenderer on top
	var rendererMain	= world.tRenderer();
	rendererMain.domElement.style.position	= 'absolute';
	rendererMain.domElement.style.top	= 0;
	rendererMain.domElement.style.zIndex	= 1;
//rendererMain.domElement.style.zIndex	= -1;
	rendererCSS.domElement.appendChild( rendererMain.domElement );
	this._rendererMain	= rendererMain;

	// create the sceneCSS	
	var sceneCSS	= new THREE.Scene();
	this._sceneCSS	= sceneCSS;


	// render SceneCSS
	var callback	= world.loop().hookPostRender(function(delta, now){
		rendererCSS.render( sceneCSS, world.tCamera() );
	})
	this.addEventListener('destroy', function(){
		this.loop().unhookPostRender(callback)
	});
});

// make it eventable
tQuery.MicroeventMixin(tQuery.HTMLMixer.prototype)

/**
 * explicit destructor
 */
tQuery.HTMLMixer.prototype.destroy	= function(){
	this.dispatchEventListener('destroy')
};

tQuery.HTMLMixer.prototype.rendererCSS	= function(){ return this._rendererCSS;	}
tQuery.HTMLMixer.prototype.sceneCSS	= function(){ return this._sceneCSS;	}

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('createHTMLMixerPlane', function(opts){
	// handle arguments polymorphism
	if( typeof(arguments[0]) === 'string'){
		var url	= arguments[0];
		opts	= { domElement : document.createElement('iframe') };
		opts.domElement.src		= url;
		opts.domElement.style.border	= '0';
	}
	if( arguments[0] instanceof HTMLElement ){
		opts	= {domElement	: arguments[0]};
	}
	// handle default arguments
	opts	= tQuery.extend(opts, {
		domElement	: null,
		cssScale	: new THREE.Vector3(1/512, 1/512, 1),
		world		: tQuery.world
	})
	// check options type
	console.assert(opts.domElement instanceof HTMLElement)
	console.assert(opts.world instanceof tQuery.World)
	// copy variable
	var world	= opts.world;
	var domElement	= opts.domElement;
	// adding htmlmixer in world if not already now
	if( world.hasHTMLMixer() === false ){
		console.log('.createHTMLMixerPlane() without a htmlmixer in the world. adding it now')
		world.addHTMLMixer();	
	}


	var htmlMixer	= world.htmlMixer();
	var sceneCSS	= htmlMixer.sceneCSS();

	var tMaterial	= new THREE.MeshBasicMaterial();
	tMaterial.color.set('black')
	tMaterial.opacity	= 0;
	tMaterial.blending	= THREE.NoBlending;
	var plane	= tQuery.createPlane(tMaterial)
		.addClass('plane')
		.scaleXBy(560/315)
		.scaleYBy(1)

	var objectCSS 	= new THREE.CSS3DObject( domElement );
// FIXME here i forced the css3D to be added
	sceneCSS.add( objectCSS );
	
	plane.data('htmlMixerObjectCss', objectCSS)

// should i put that in scene
	// objectCSS.scale.copy(opts.cssScale);
	// objectCSS.position	= plane.position();
	// objectCSS.rotation	= plane.rotation();

// FIXME what if the source plane is scaled ?
	// domElement.width	= (plane.scaleX()/objectCSS.scale.x)+'px';
	// domElement.height	= (plane.scaleY()/objectCSS.scale.y)+'px';



	// domElement.width	= (560/opts.cssScale.x)+'px';
	// domElement.height	= (315/opts.cssScale.y)+'px';
	// domElement.style.zoom	= '1%';
console.log('domElement')
console.dir(domElement)

	domElement.width	= (560*2*0.82/plane.scaleX())+'px';
	domElement.height	= (315*2*0.82/plane.scaleY())+'px';
	
	
	var worldPosition	= tQuery.createVector3();
	var worldRotation	= tQuery.createVector3();
	var worldScale		= tQuery.createVector3();

	world.hook(function(){
		var tObject3D	= plane.get(0)
		world.tScene().updateMatrixWorld();
		var worldMat	= tObject3D.matrixWorld;

		worldPosition.getPositionFromMatrix(worldMat)
		objectCSS.position.copy(worldPosition)
	
		worldRotation.setEulerFromRotationMatrix(worldMat)
		objectCSS.rotation.copy(worldRotation)

		worldScale.getScaleFromMatrix(worldMat).multiply(opts.cssScale)
		objectCSS.scale.copy(worldScale)
	})

	return plane;
})


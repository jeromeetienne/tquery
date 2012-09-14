/**
 * @fileOverview Methods to add/remove fog in tQuery.World
 *
 * - removeFog isnt done as some wiki pages claim it is impossible
 *   https://github.com/mrdoob/three.js/wiki/Updates
*/

/**
 * add a THREE.FogExp2 to this world.scene()
 *
 * @param opts the options
 * @param opts.colorHex the hexa value of the fog color
 * @param opts.density the density of the fog
*/
tQuery.World.registerInstance('addFogExp2', function(opts){
	// handle parameter
	opts	= tQuery.extend(opts, {
		colorHex	: this.tRenderer().getClearColor().getHex(),
		density		: 0.1
	});
	// set the fog
	this.tScene().fog	= new THREE.FogExp2(opts.colorHex, opts.density );
	// for chained API
	return this;
});

/**
 * add a THREE.Fog to this world.scene()
 *
 * @param opts the options
 * @param opts.colorHex the hexa value of the fog color
 * @param opts.near how far away from camera, the fog starts
 * @param opts.far how far away from camera, the fog ends
*/
tQuery.World.registerInstance('addFog', function(opts){
	// handle parameter
	opts	= tQuery.extend(opts, {
		colorHex	: this.tRenderer().getClearColor().getHex(),
		near		: 1,
		far		: 20
	});
	// set the fog
	this.tScene().fog	= new THREE.Fog(opts.colorHex, opts.near, opts.far);
	// for chained API
	return this;
});



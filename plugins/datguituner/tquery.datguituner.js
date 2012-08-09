/**
 * - use object picking to select the material you need to tune
 *   - good for material
 * - so either you do lights, or you do material or you pick the object you like
 * - ok now you get something which is cool for interactive tunning
 * - may be a very nice bookmarklet
 *
 * - now how to push back those value in the source ?
 * - is it possible to save in localStorage or so
*/
tQuery.register('DatguiTuner', function(opts){
	// handle parameters polymorphism
	if( typeof(opts) === 'string' )	opts	= { selector: opts };
	// copy parameters
	opts		= tQuery.extend(opts, {});
	var gui		= opts.gui	|| new dat.GUI();
	var selector	= opts.selector	|| console.assert(false, "selector opts is required.")
	// process every element
	tQuery(opts.selector).each(function(element){
		if( element instanceof THREE.Light ){
			addLightFolder(gui, element)
		}else if( element instanceof THREE.Material ){
			addMaterialFolder(gui, element)
		}
	});
	// return this for chained UI
	return this;


	/**
	*/	
	function addLightFolder(gui, light){
		console.log('enter function', arguments.callee.name+'()')
		// TODO what about the position/target ?
		// put a folder for the light with shaddow

		// sanity check
		console.assert( light instanceof THREE.Light );
		
		if( light instanceof THREE.AmbientLight ){
			var folder	= gui.addFolder('AmbientLight-'+light.id);
			addColor(folder, light, 'color');
		}else if( light instanceof THREE.DirectionalLight ){
			var folder	= gui.addFolder('DirectionalLight-'+light.id);
			addColor(folder, light, 'color');
			folder.add(light, 'intensity');
			folder.add(light, 'distance');
		}else if( light instanceof THREE.PointLight ){
			var folder	= gui.addFolder('PointLight-'+light.id);
			addColor(folder, light, 'color');
			folder.add(light, 'intensity');
			folder.add(light, 'distance');
		}else if( light instanceof THREE.SpotLight ){
			var folder	= gui.addFolder('SpotLight-'+light.id);
			addColor(folder, light, 'color');
			folder.add(light, 'intensity');
			folder.add(light, 'distance');
			folder.add(light, 'angle');
			folder.add(light, 'exponent');
		}else{
			console.log('unknown type of light', light)
		}
		return folder;
	}
	function addMaterialFolder(gui, material){
		// sanity check
		console.assert( material instanceof THREE.Material);

		//console.dir(material);
		if( material instanceof THREE.MeshBasicMaterial ){
			var folder	= gui.addFolder('MeshBasicMaterial');
			addColor(folder, material, 'color');
		}else if( material instanceof THREE.MeshPhongMaterial ){
			var folder	= gui.addFolder('MeshPhongMaterial');
			addColor(folder, material, 'color');
			addColor(folder, material, 'ambient');
			addColor(folder, material, 'emissive');
			addColor(folder, material, 'specular');
			folder.add(material, 'shininess')
			folder.add(material, 'metal')
			folder.add(material, 'perPixel')

			folder.add(material, 'shading', {
				NoShading	: THREE.NoShading,
				FlatShading	: THREE.FlatShading,
				SmoothShading	: THREE.SmoothShading
			}).onChange(function(value){
				// yet another dat.gui bug
				material.shading	= parseInt(value)
			});
		}else	console.assert(false, 'unhandled material')
		return folder;
	}
	function addColor(folder, object, property){
		var color	= object[property];
		console.assert( color instanceof THREE.Color );
		// create a color that is understood by dat.gui
		var tmp		= { color : {
			r	: color.r * 255,
			g	: color.g * 255,
			b	: color.b * 255
		}};
		folder.addColor(tmp, 'color').onChange(function(value){
			console.log('pre', JSON.stringify(tmp.color), tmp.color)
			// workaround dat.gui bugs
			// sometime, not all the time, dat.gui report a string in css format. reason is unknown 
			if( typeof(tmp.color) === 'string' ){
				var colorHex	= parseInt(tmp.color.substr(1), 16)
				tmp.color	= {
					r	: (colorHex >> 16) & 255,
					g	: (colorHex >>  8) & 255,
					b	: (colorHex >>  0) & 255
				};
			}
			console.log('post', JSON.stringify(tmp.color))
			color.r	= tmp.color.r / 255;
			color.g	= tmp.color.g / 255;
			color.b	= tmp.color.b / 255;
		}).name(property);
	}
});

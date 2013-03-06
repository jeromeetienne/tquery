you include ```tquery.skymap``` plugins with require.js

### how to add a skymap
```
// add a skymap - one of the predefined one
tQuery.createSkymap('pisa').addTo(world);
```

to know the list of ones predefined in the examples, do ```Object.keys(tQuery.TextureCube.WellKnownUrls)``` in the js console.

### how to setup reflection
```
// create the cube texture
var cubeTexture	= tQuery.createCubeTexture('skybox');
// use it in the envMap in a object material
tQuery.createTorusKnot().addTo(world)
	.setBasicMaterial()
		.envMap(cubeTexture)
		.back();
```

### How to setup refraction ?
```
// create the texture
var cubeTexture	= tQuery.createCubeTexture('skybox');
cubeTexture.mapping = new THREE.CubeRefractionMapping();
// use it in the envMap in a object material
tQuery.createTorusKnot().addTo(world)
	.setBasicMaterial()
		.envMap(cubeTexture)
		.back();
```
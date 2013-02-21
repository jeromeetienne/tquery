// attempts to use debug.js to help three.js

assertWhichStop.overloadConsole()
//assertWhichStop.useDebugger	= true;

THREE.Vector3.prototype.addVectors = TypeCheck.fn(THREE.Vector3.prototype.addVectors, 
	[THREE.Vector3, THREE.Vector3],
	[THREE.Vector3]);
THREE.Vector3.prototype.add = TypeCheck.fn(THREE.Vector3.prototype.add,
	[THREE.Vector3],
	[THREE.Vector3]);
THREE.Vector3.prototype.subVectors = TypeCheck.fn(THREE.Vector3.prototype.subVectors, 
	[THREE.Vector3, THREE.Vector3],
	[THREE.Vector3]);
THREE.Vector3.prototype.sub = TypeCheck.fn(THREE.Vector3.prototype.sub,
	[THREE.Vector3],
	[THREE.Vector3]);
THREE.Vector3.prototype.multiplyVectors = TypeCheck.fn(THREE.Vector3.prototype.multiplyVectors, 
	[THREE.Vector3, THREE.Vector3],
	[THREE.Vector3]);
THREE.Vector3.prototype.multiply = TypeCheck.fn(THREE.Vector3.prototype.multiply,
	[THREE.Vector3],
	[THREE.Vector3]);


THREE.Matrix4.prototype.multiply = TypeCheck.fn(THREE.Matrix4.prototype.multiply,
	[THREE.Matrix4],
	[THREE.Matrix4]);
THREE.Matrix4.prototype.multiplyMatrices = TypeCheck.fn(THREE.Matrix4.prototype.multiplyMatrices,
	[THREE.Matrix4, THREE.Matrix4],
	[THREE.Matrix4]);


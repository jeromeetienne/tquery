/*!
 * THREE.Extras.UTils contains extra useful methods
 * 
 * @author Thibaut 'BKcore' Despoulain <http://bkcore.com>
 * 
 */

THREE = THREE || {};
THREE.Extras = THREE.Extras || {};
THREE.Extras.Utils = THREE.Extras.Utils || {};

/*! Projects object origin into screen space coordinates using provided camera */
THREE.Extras.Utils.projectOnScreen = function(object, camera)
{
	var mat = new THREE.Matrix4();
	mat.multiply( camera.matrixWorldInverse, object.matrixWorld);
	mat.multiply( camera.projectionMatrix , mat);

	var c = mat.n44;
	var lPos = new THREE.Vector3(mat.n14/c, mat.n24/c, mat.n34/c);
	lPos.multiplyScalar(0.5);
	lPos.addScalar(0.5);
	return lPos;
}
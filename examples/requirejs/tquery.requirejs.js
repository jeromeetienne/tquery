/**
 * export tQuery as requirejs module
*/
(function(){
	
	define('tquery', ["../../build/tquery-bundle.js"], function(){
		//tQuery.register('define', define);
		//tQuery.register('require', require);
		return tQuery;
	});

	return;


	// get the url from the <script src=""> loading this file
	var scriptUrl	= document.scripts[document.scripts.length-1].src;
	var baseUrl	= scriptUrl.substr(0, scriptUrl.lastIndexOf('/')+1);
	
	// FIXME the above tech to get the current file position
	// fails with  <script data-main="tquery.requirejs.js" src="scripts/require.js"></script>
	// likely becasuse requirejs doesnt use script to get script
	
	baseUrl	= "../../js/";

	define('tquery', [
		baseUrl+"../vendor/three.js/Three.js",
		baseUrl+"../vendor/three.js/Detector.js",

		baseUrl+"tquery.core.js",
		baseUrl+"tquery.node.js",
		
		baseUrl+"tquery.object3d.js",
		baseUrl+"tquery.geometry.js",
		baseUrl+"tquery.material.js",
	
		baseUrl+"tquery.world.js",
		baseUrl+"tquery.loop.js",
		baseUrl+"tquery.core.create.js",
	], function(){
		return tQuery;
	});		
})();
var tAnim	= {};

tAnim.plugins	= {};


var globalAnim	= null;

tAnim.changeTo	= function(newAnim){
	//console.log("changeTo", newAnim)
	
	if( globalAnim ){
		globalAnim.destroy();
		tQuery.world.loop().unhook(globalAnim.update);
	}
	
	if( typeof newAnim === 'object' ){
		globalAnim	= newAnim;
	}else if( typeof newAnim === 'string' ){
		console.assert( typeof tAnim.plugins[newAnim] === 'object' );
		globalAnim	= tAnim.plugins[newAnim];
	}else	console.assert(false);

	if( globalAnim ){
		globalAnim.init();
		tQuery.world.loop().hook(globalAnim.update);
	}
};
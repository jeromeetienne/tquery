tQuery.register('define', EzRequire.define);
tQuery.register('require', EzRequire.require);
tQuery.register('EzRequire', EzRequire);

tQuery.EzRequire.urlModifiers.push(function(url){
	return url.replace(/^plugins\//, "../../../plugins/")
});
tQuery.EzRequire.urlModifiers.push(function(url){
	return url.replace(/^threex\//, "../../../vendor/threex/")
});
tQuery.EzRequire.urlModifiers.push(function(url){
	return url.replace(/^vendor\//, "../../../vendor/")
});

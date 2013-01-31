tQuery.World.registerInstance('addWhammyUI', function(){
	tQuery.createWhammyUI();
	// for chained API
	return this;
});


tQuery.registerStatic('createWhammyUI', function(container){
	if( !container ){
		container	= document.createElement('div')
		container.style.cssText='position: absolute; top: 0.5em; right: 0.5em;';
		container.id	= 'UIcontainer';
		document.body.appendChild(container);		
	}


	var html	= [
	"<div style='width: 80px; font-weight: bolder; font-size: 14px; font-family: arial;'>",
		"<span>WHAMMY.js<br/></span>",
		"<span>RECORDER<br/></span>",
		"<a href='javascript:void(0)'>",
			"<image class='switch' width='80px' height='80px'>",
		"</a>",
  		"<a class='download' target='_blank' style='display: none' download='movie.webm'>DOWNLOAD</a>",
	"</div>"
	].join('\n');
	container.innerHTML	= html;
	
	var recorder	= tQuery.createWhammy();
	container.querySelector('.switch').addEventListener('click', function(event){
		recorder.pressSwitch();
	});
	
	var switchEl	= container.querySelector('.switch')
	switchEl.src	= tQuery.Whammy.baseUrl+'/images/play_noun_project_1541.svg';
	switchEl.title	= 'Start Recording';
	var downloadEl	= container.querySelector('.download')
	recorder.addEventListener('postStart', function(){
		switchEl.src	= tQuery.Whammy.baseUrl+'/images/stop_noun_project_2221.svg';
		switchEl.title	= 'Stop Recording';
	}.bind(this));
	recorder.addEventListener('postStop', function(){
		// update switch image
		switchEl.src	= tQuery.Whammy.baseUrl+'/images/play_noun_project_1541.svg';
		switchEl.title	= 'Start Recording';
		// init download link
		downloadEl.href	= recorder.finalizedURL();
		downloadEl.style.display	= ''
	}.bind(this));
});



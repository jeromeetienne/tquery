var editor;

function exportToggle(){
	var selector	= '.shorturl';
	var isVisible	= jQuery(selector).css('display') !== 'none';

	if( isVisible ){
		jQuery(selector).hide();
		return;
	}

	jQuery(selector).show();

	var longUrl	= location.href;
	// from http://stackoverflow.com/questions/1771397/jquery-on-the-fly-url-shortener
	var login	= "jeromeetienne";
	var apiKey	= "R_9176fb8fcaf3a6c0fe4459cb699f6c1d";
	jQuery.getJSON(	"http://api.bitly.com/v3/shorten?callback=?", { 
			"format": "json",
			"apiKey": apiKey,
			"login": login,
			"longUrl": longUrl
		},
		function(response){
			var value	= response.data.url;
			//console.log("bitly", response)
			jQuery(selector+' input').val(value);
			jQuery(selector+' input').select();
		}
	);
}

// Initialize CodeMirror editor with a nice html5 canvas demo.
function editorCtor(){
	editor = CodeMirror.fromTextArea(document.getElementById('code'), {
		mode		: 'text/html',
		tabMode		: 'indent',
		theme		: 'night',
		indentWithTabs	: true,
		tabSize		: 4,
		indentUnit	: 4,
		//lineNumbers	: true,
		//extraKeys	: {
		//	"Cmd-Enter": function(cm){
		//		optionsSave();
		//		updatePreview();
		//	}
		//},
		onChange: function() {
			jQuery('#syncStatus .state').hide().filter('.outofdate').show();
		}
	});	
}

function updatePreview() {
	// update ui
	jQuery('#syncStatus .state').hide().filter('.uptodate').show();

	// replace iframe
	jQuery('#previewContainer').empty();
	jQuery('<iframe>').attr('id', 'preview').appendTo('#previewContainer');
	
	// put content in <iframe>
	setTimeout(function(){
		var content	= editor.getValue();
		var previewFrame= document.getElementById('preview');
		var preview	=  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
		preview.open();
		preview.write(content);
		preview.close();
	}, 300);	// this timer is to fight a race in chrome
}


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var optionsSave	= function(){
	console.log("Saving options to url...")
	var textValue	= editor.getValue();
	var options	= {
		textValue	: textValue
	};
	location.hash	= '#j/'+JSON.stringify(options);	
}
var optionsLoad	= function(){
	if( !location.hash )	return;
	console.log("Loading options from url...")
	if( location.hash.substring(0,3) === "#j/" ){
		var optionsJSON	= location.hash.substring(3);
		var options	= JSON.parse(optionsJSON);
	}else{
		console.assert(false);
	}

	if( options.textValue ){
		editor.setValue( options.textValue );
	}
}


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

// kludge to get editor height
// - this should be done via css but i failed to make it happen
var updateEditorHeight	= function(){
	var scrollHeight= window.innerHeight - 120;
	jQuery(".CodeMirror-scroll").css('height', scrollHeight+'px');
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

jQuery(".button.update").click(function(){
	updatePreview();
});

jQuery(".button.editor").click(function(){	
	jQuery("#editor").toggle();
});

jQuery(".button.export").click(function(){
	exportToggle();
});


editorCtor();
updatePreview();
optionsLoad();
updateEditorHeight();
window.addEventListener('resize', updateEditorHeight, false);

window.addEventListener('keydown', function(event){
	// "cmd-enter" is shortcut for update preview
	if( event.keyCode === "\r".charCodeAt(0) && event.metaKey === true ){
		optionsSave();
		updatePreview();
	}
	// "cmd-backspace" is shortcut for toggle preview
	if( event.which === "\b".charCodeAt(0) && event.metaKey === true ){
		jQuery("#editor").toggle();		
	}
}, false);

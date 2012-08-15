var editor;

function exportToggle(){
	var selector	= '.shorturl';
	var isVisible	= jQuery(selector).css('display') !== 'none';

	if( isVisible ){
		jQuery(selector).hide();
		return;
	}
	// be sure to save the option in the url before
	optionsSave();
	
	jQuery(selector).show();

	var longUrl	= location.href;
	// from http://stackoverflow.com/questions/1771397/jquery-on-the-fly-url-shortener
	var login	= "jeromeetienne";
	var apiKey	= "R_9176fb8fcaf3a6c0fe4459cb699f6c1d";
	jQuery.getJSON(	"http://api.bitly.com/v3/shorten?callback=?", { 
		"format"	: "json",
		"apiKey"	: apiKey,
		"login"		: login,
		"longUrl"	: longUrl
	}).success(function(response){
		if( response.status_code !== 200 ){
			console.log("error bitly: status_code", response.status_code, "status_txt", response.status_txt );
			return;
		}
		console.assert( response.status_code === 200 );
		var value	= response.data.url;
		jQuery(selector+' input').val(value);
		jQuery(selector+' input').select();
	});
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
	jQuery('<iframe>')
		.attr('id', 'preview')
		.attr('allowfullscreen', '').attr('webkitallowfullscreen', '').attr('mozallowfullscreen', '')
		.appendTo('#previewContainer');
	
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

// use of rot13 to obfuscate url - a workaround of "Reflective XSS Protection" 
// - http://blog.chromium.org/2010/01/security-in-depth-new-security-features.html
function rot13( s ) { 
	var b = [], c, i = s.length;
	var a = 'a'.charCodeAt(), z = a + 26;
	var A = 'A'.charCodeAt(), Z = A + 26;
	while(i--){
		c = s.charCodeAt( i );
		if( c>=a && c<z ){ b[i] = rot( c, a, 13 ); }
		else if( c>=A && c<Z ) { b[i] = rot( c, A, 13 ); }
		else { b[i] = s.charAt( i ); }
	}
	return b.join( '' );
	function rot( t, u, v ) {
		return String.fromCharCode( ( ( t - u + v ) % ( v * 2 ) ) + u );
	}
}
var optionsSave	= function(){
	console.log("Saving options to url...")
	var textValue	= editor.getValue();
	var options	= {
		textValue	: textValue
	};
	var text	= JSON.stringify(options);
	location.hash	= '#r/'+encodeURIComponent(rot13(text));
}
var optionsLoad	= function(){
	if( !location.hash )	return;
	console.log("Loading options from url...")
	if( location.hash.substring(0,3) === "#j/" ){
		var optionsJSON	= location.hash.substring(3);
		var options	= JSON.parse(decodeURIComponent(optionsJSON));
	}else if( location.hash.substring(0,3) === "#r/" ){
		var optionsJSON	= location.hash.substring(3);
		var options	= JSON.parse(rot13(decodeURIComponent(optionsJSON)));
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
	var toUpdate	= false;
	toUpdate	|= event.keyCode === "\r".charCodeAt(0) && event.metaKey === true;
	toUpdate	|= event.keyCode === "\r".charCodeAt(0) && event.altKey === true;
	if( toUpdate ){
		optionsSave();
		updatePreview();
	}

	// "cmd-backspace" is shortcut for toggle preview
	var toggleEditor= false;
	toggleEditor	|= event.which === "\b".charCodeAt(0) && event.metaKey === true;
	toggleEditor	|= event.which === "\b".charCodeAt(0) && event.altKey === true;
	if( toggleEditor ){
		jQuery("#editor").toggle();
	}
}, false);

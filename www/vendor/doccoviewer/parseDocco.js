/**
 * Parse a docco text.
 *
 * @param {String} text the text to parse
*/
function parseDocco(text, separators){
	separators	= separators	|| [{
		// for js
		head	: '//',
		tail	: ''
	},{	// for html
		head	: '<!--',
		tail	: '-->'
	}];
	var sections	= [];
	// go thru each lines, to build the sections
	var lines	= text.split('\n');
	lines.forEach(function(line){
		// determine the type of last line and current line
		var lastType	= sections.length === 0 ? "none" : sections[sections.length-1].type;
		var curType	= isComment(line) ? "comment" : "code"
		// create a section if needed
		if( lastType !== curType )	sections.push({	type	: curType});
		// if this is a comment, remove the header immediatly
		if( curType === "comment" )	line	= removeCommentMarkup(line);
		// get current sections
		var section	= sections[sections.length-1];
		// create text if needed
		section.text	= section.text	|| '';
		// append a line
		section.text	+= line+'\n';
	})
	// go thru each sections to htmlize it
	sections.forEach(function(section){
		if( section.type === "code" && prettyPrintOne ){
			section.text	= section.text.replace(/</g, '&lt;');
			section.text	= section.text.replace(/>/g, '&gt;');
			section.text	= section.text.replace(/\t/g, '  ');
			section.html	= prettyPrintOne(section.text, undefined, true);
		}else if( section.type === "comment" && Showdown ){
			section.html	= new Showdown.converter().makeHtml(section.text);
			section.html	= section.html.replace(/<br ?\/>/g, ' ');
		}
	});
	return sections;

	function isComment(line){
		for(var i = 0; i < separators.length; i++){
			var separator	= separators[i];
			var re		= new RegExp('^\\s*' + separator.head + '\\s?')
			var matches	= line.match(re);
			if( matches )	return true;
		}
		return false;
	}
	function removeCommentMarkup(line){
		for(var i = 0; i < separators.length; i++){
			var separator	= separators[i];
			var re		= new RegExp('^\\s*' + separator.head + '\\s?(.*)'
						+ (separator.tail ? '('+separator.tail+')' :''));
			var matches	= line.match(re);
			if( matches )	return matches[1] ? matches[1] : "";
		}
		console.assert(false,"this point should NEVER be reached");
		return undefined;
	}
}

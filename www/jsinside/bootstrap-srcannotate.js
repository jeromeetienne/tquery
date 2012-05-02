/**
 * For Source Annotations ala angularjs
*/
jQuery(function(){
	jQuery('pre + script[type="text/codeannotation"]').each(function(){
		var annotJSON	= jQuery(this).text();
		var annotations	= JSON.parse(annotJSON);
		var preElement	= jQuery(this).prev()
		Object.keys(annotations).forEach(function(text){
			jQuery("*:contains('"+text+"')", preElement).last().each(function(){
				if( jQuery(this).hasClass('hasAnnotation') )	return;
				jQuery(this).addClass('hasAnnotation');
				if( typeof annotations[text] === "string"){
					jQuery(this).popover({
						title	: text,
						content	: annotations[text]
					});
				}else{
					jQuery(this).popover(annotations[text]);
				}
			});
		})
	})
});
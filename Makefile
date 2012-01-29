# makefile to automatize simple operations

server:
	python -m SimpleHTTPServer

deploy:
	# assume there is something to commit
	# use "git diff --exit-code HEAD" to know if there is something to commit
	# so two lines: one if no commit, one if something to commit 
	git commit -a -m "New deploy" && git push -f origin HEAD:gh-pages && git reset HEAD~

JSDOC_ROOT	= $(HOME)/opt/jsdoc_toolkit-2.4.0/jsdoc-toolkit

docs:
	java -jar ${JSDOC_ROOT}/jsrun.jar ${JSDOC_ROOT}/app/run.js	\
			-D="noGlobal:true"				\
			-D="title:tQuery library"			\
			-t=${JSDOC_ROOT}/templates/Codeview/		\
			-d=docs/					\
			js/ js/plugins

#################################################################################
#		build and minify						#
#################################################################################

build:
	echo 						>  build/tquery.js
	cat js/tquery.core.js				>> build/tquery.js
	cat js/tquery.core.create.js			>> build/tquery.js
	cat js/tquery.node.js				>> build/tquery.js
	cat js/tquery.object3d.js			>> build/tquery.js
	cat js/tquery.geometry.js			>> build/tquery.js
	cat js/tquery.material.js			>> build/tquery.js
	cat js/tquery.scene.js				>> build/tquery.js
	cat js/tquery.loop.js				>> build/tquery.js
	cat js/plugins/*.js				>> build/tquery.js

minify:
	curl --data-urlencode "js_code@build/tquery.js" 	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile	\
		> build/tquery.min.js
	echo size minified + gzip is `gzip -c build/tquery.min.js | wc -c` byte

buildBundle: build
	echo 				>  build/tquery-bundle.js
	cat vendor/three.js/Three.js	>> build/tquery-bundle.js
	cat vendor/three.js/Detector.js	>> build/tquery-bundle.js
	cat vendor/three.js/Stats.js	>> build/tquery-bundle.js
	cat build/tquery.js		>> build/tquery-bundle.js

minifyBundle:
	curl --data-urlencode "js_code@build/tquery-bundle.js" 	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile	\
		> build/tquery-bundle.min.js
	echo size minified + gzip is `gzip -c build/tquery-bundle.min.js | wc -c` byte

.PHONY: docs build buildBundle minify minifyBundle

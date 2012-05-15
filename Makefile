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
			js/ js/plugins					\
			plugins/md2character

help:
	@echo "Inline help for Makefile"
	@echo ""
	@echo "make server		<- launch a minimal webserver"
	@echo "make docs		<- generate jsdocs"
	@echo "make buildPlain		<- generate tquery.js"
	@echo "make minifyPlain	<- generate tquery.min.js"
	@echo "make buildBundle	<- generate tquery-bundle.js"
	@echo "make minifyBundle	<- generate tquery-bundle.min.js"
	@echo "make buildAll		<- generate tquery-all.js"
	@echo "make minifyAll		<- generate tquery-all.min.js"
	@echo ""
	@echo "*** internal target ***"
	@echo "make deploy		<- deploy tquery to his gh-pages"
	@echo "make boilerplateBuild	<- generate a boilerplate in ~/Downloads"

#################################################################################
#		misc to sort							#
#################################################################################

boilerplateBuild:
	rm -f ~/Downloads/tqueryboilerplate.zip
	cd .. && zip -r ~/Downloads/tqueryboilerplate tqueryboilerplate  -x *.git*
	
#################################################################################
#		build and minify						#
#################################################################################

BANNER="// tquery.js - https://github.com/jeromeetienne/tquery - MIT License"
build:	minifyPlain minifyBundle minifyAll

buildPlain:
	echo $(BANNER)			>  build/tquery.js
	cat vendor/es5-shim.js		>> build/tquery.js
	cat js/tquery.core.js		>> build/tquery.js
	cat js/tquery.convert.js	>> build/tquery.js
	cat js/tquery.node.js		>> build/tquery.js
	cat js/tquery.object3d.js	>> build/tquery.js
	cat js/tquery.geometry.js	>> build/tquery.js
	cat js/tquery.material.js	>> build/tquery.js
	cat js/tquery.light.js		>> build/tquery.js
	cat js/tquery.mesh.js		>> build/tquery.js
	cat js/tquery.world.js		>> build/tquery.js
	cat js/tquery.loop.js		>> build/tquery.js
	cat js/tquery.core.create.js	>> build/tquery.js
	cat js/plugins/lights/*.js	>> build/tquery.js
	cat js/plugins/*.js		>> build/tquery.js
	# include boilerplate - FIXME this is kludgy
	cat vendor/threex/THREEx.WindowResize.js	>> build/tquery.js
	cat vendor/threex/THREEx.screenshot.js		>> build/tquery.js
	cat vendor/threex/THREEx.FullScreen.js		>> build/tquery.js
	cat vendor/threex.dragpancontrols.js		>> build/tquery.js
	cat vendor/three.js/Stats.js			>> build/tquery.js

minifyPlain: buildPlain
	echo $(BANNER)	>  build/tquery.min.js
	curl --data-urlencode "js_code@build/tquery.js" 	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile	\
		>> build/tquery.min.js
	@echo size minified + gzip is `gzip -c build/tquery.min.js | wc -c` byte

buildBundle: buildPlain
	echo $(BANNER)			>  build/tquery-bundle.js
	cat vendor/three.js/Three.js	>> build/tquery-bundle.js
	cat build/tquery.js		>> build/tquery-bundle.js

minifyBundle: buildBundle
	echo $(BANNER)	>  build/tquery-bundle.min.js
	curl --data-urlencode "js_code@build/tquery-bundle.js" 	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile	\
		>> build/tquery-bundle.min.js
	@echo size minified + gzip is `gzip -c build/tquery-bundle.min.js | wc -c` byte

buildAll: buildBundle
	echo $(BANNER)					>  build/tquery-all.js
	cat build/tquery-bundle.js			>> build/tquery-all.js
	cat plugins/requirejs/tquery.norequirejs.js	>> build/tquery-all.js
	# plugins/keyboard
	cat vendor/threex/THREEx.KeyboardState.js	>> build/tquery-all.js
	cat plugins/keyboard/tquery.keyboard.js		>> build/tquery-all.js
	# plugins/shape
	cat plugins/shape/tquery.shape.js		>> build/tquery-all.js
	cat plugins/shape/tquery.shape.create.js	>> build/tquery-all.js
	# plugins/dollar3d
	cat plugins/dollar3d/tquery.dollar3d.js		>> build/tquery-all.js
	# plugins/deviceOrientation
	cat vendor/threex/THREEx.DeviceOrientationState.js		>> build/tquery-all.js
	cat plugins/deviceorientation/tquery.deviceorientation.js	>> build/tquery-all.js
	# plugins/wobble
	cat vendor/threex/THREEx.GeometryWobble.js		>> build/tquery-all.js
	cat plugins/wobble/tquery.geometry.wobble.js		>> build/tquery-all.js
	# plugins/terrainGenerator
	cat vendor/three.js/ImprovedNoise.js			>> build/tquery-all.js
	cat plugins/terrainGenerator/tquery.terrainGenerator.js	>> build/tquery-all.js
	# plugins/domevent
	cat plugins/domevent/threex.domevent.js			>> build/tquery-all.js
	cat plugins/domevent/tquery.object3d.domevent.js	>> build/tquery-all.js
	# plugins/csg
	cat plugins/csg/csg.js				>> build/tquery-all.js
	cat plugins/csg/ThreeCSG.js			>> build/tquery-all.js
	cat plugins/csg/tquery.geometry.csg.js		>> build/tquery-all.js
	cat plugins/csg/tquery.object3d.csg.js		>> build/tquery-all.js
	# plugins/fireball
	cat plugins/fireball/tquery.fireballmaterial.js	>> build/tquery-all.js
	# plugins/videos
	cat plugins/videos/tquery.createvideotexture.js		>> build/tquery-all.js
	cat plugins/videos/tquery.createwebcamtexture.js	>> build/tquery-all.js
	# plugins/text
	cat plugins/text/fonts/droid/droid_serif_bold.typeface.js	>> build/tquery-all.js
	cat plugins/text/tquery.text.js					>> build/tquery-all.js
	# plugins/linkify
	cat plugins/linkify/tquery.mesh.linkify.js		>> build/tquery-all.js


minifyAll: buildAll
	echo $(BANNER)	>  build/tquery-all.min.js
	curl --data-urlencode "js_code@build/tquery-all.js" 	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile	\
		>> build/tquery-all.min.js
	@echo size minified + gzip is `gzip -c build/tquery-all.min.js | wc -c` byte

.PHONY: docs buildPlain buildBundle minifyPlain minifyBundle

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

BANNER="// tquery.js - https://github.com/jeromeetienne/tquery - MIT License"
build:	minifyPlain minifyBundle

buildPlain:
	echo $(BANNER)			>  build/tquery.js
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
	echo size minified + gzip is `gzip -c build/tquery.min.js | wc -c` byte

buildBundle: buildPlain
	echo $(BANNER)			>  build/tquery-bundle.js
	cat vendor/three.js/Three.js	>> build/tquery-bundle.js
	cat build/tquery.js		>> build/tquery-bundle.js

buildAll: buildBundle
	echo $(BANNER)					>  build/tquery-all.js
	cat build/tquery-bundle.js			>> build/tquery-all.js
	cat examples/requirejs/tquery.norequirejs.js	>> build/tquery-all.js
	# examples/keyboard
	cat vendor/threex/THREEx.KeyboardState.js	>> build/tquery-all.js
	cat examples/keyboard/tquery.keyboard.js	>> build/tquery-all.js
	# examples/shape
	cat examples/shape/tquery.shape.js		>> build/tquery-all.js
	cat examples/shape/tquery.shape.create.js	>> build/tquery-all.js
	# examples/dollar3d
	cat examples/dollar3d/tquery.dollar3d.js	>> build/tquery-all.js
	# examples/deviceOrientation
	cat vendor/threex/THREEx.DeviceOrientationState.js		>> build/tquery-all.js
	cat examples/deviceorientation/tquery.deviceorientation.js	>> build/tquery-all.js
	# examples/wobble
	cat vendor/threex/THREEx.GeometryWobble.js			>> build/tquery-all.js
	cat examples/wobble/tquery.geometry.wobble.js			>> build/tquery-all.js
	# examples/terrainGenerator
	cat vendor/three.js/ImprovedNoise.js				>> build/tquery-all.js
	cat examples/terrainGenerator/tquery.terrainGenerator.js	>> build/tquery-all.js
	# examples/domevent
	cat examples/domevent/threex.domevent.js		>> build/tquery-all.js
	cat examples/domevent/tquery.object3d.domevent.js	>> build/tquery-all.js
	# examples/csg
	cat examples/csg/csg.js				>> build/tquery-all.js
	cat examples/csg/ThreeCSG.js			>> build/tquery-all.js
	cat examples/csg/tquery.geometry.csg.js		>> build/tquery-all.js
	cat examples/csg/tquery.object3d.csg.js		>> build/tquery-all.js
	# examples/fireball
	cat examples/fireball/tquery.fireballmaterial.js	>> build/tquery-all.js
	# examples/videos
	cat examples/videos/tquery.createvideotexture.js	>> build/tquery-all.js
	cat examples/videos/tquery.createwebcamtexture.js	>> build/tquery-all.js
	# examples/text
	cat examples/text/fonts/droid/droid_serif_bold.typeface.js		>> build/tquery-all.js
	cat examples/text/tquery.text.js			>> build/tquery-all.js
	# examples/linkify
	cat examples/linkify/tquery.mesh.linkify.js	>> build/tquery-all.js

minifyBundle: buildBundle
	echo $(BANNER)	>  build/tquery-bundle.min.js
	curl --data-urlencode "js_code@build/tquery-bundle.js" 	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile	\
		>> build/tquery-bundle.min.js
	echo size minified + gzip is `gzip -c build/tquery-bundle.min.js | wc -c` byte

.PHONY: docs buildPlain buildBundle minifyPlain minifyBundle

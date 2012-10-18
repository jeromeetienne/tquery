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
			plugins/minecraft				\
			plugins/md2character

help:
	@echo "Inline help for Makefile"
	@echo ""
	@echo "make server		<- launch a minimal webserver"
	@echo "make docs		<- generate jsdocs"
	@echo "make buildCore		<- generate tquery.js"
	@echo "make minifyCore		<- generate tquery.min.js"
	@echo "make buildBundle		<- generate tquery-bundle.js"
	@echo "make minifyBundle	<- generate tquery-bundle.min.js"
	@echo "make buildAll		<- generate tquery-all.js"
	@echo "make minifyAll		<- generate tquery-all.min.js"
	@echo ""
	@echo "*** internal target ***"
	@echo "make deploy		<- deploy tquery to his gh-pages"
	@echo "make boilerplateBuild	<- generate a boilerplate in ~/Downloads"

release:
	@echo ""
	@echo "How to release"
	@echo "=============="
	@echo "1. Go on 'dev' branch"
	@echo "   1.1 use 'git checkout dev'"
	@echo "   1.2 check with 'git branch'"
	@echo "2. On 'dev' branch, bumpup version number"
	@echo "   2.1 update changelog in README.md"
	@echo "   2.2 update tQuery.VERSION variable in js/tquery.core.js"
	@echo "   2.3 update VERSION file in / directory"
	@echo "   2.4 make a build 'make build'"
	@echo "3. On 'dev', commit changes"
	@echo "   3.1 use 'git commit -a -m 'releasing version r99.9''"
	@echo "4. Switch to 'master' branch"
	@echo "   4.1 use 'git checkout master'"
	@echo "5. Merge 'dev' branch into 'master' branch"
	@echo "   5.1 use 'git merge dev' WHILE being on 'master'"
	@echo "6. Tag the version"
	@echo "   6.1 use 'git tag r99.9 -a' WHILE being on 'master'"
	@echo "7. Push the version on github"
	@echo "   7.1 push content with 'git push' WHILE being on 'master'"
	@echo "   7.2 push tags with 'git push --tags' WHILE being on 'master'"
	@echo "8. You should be done. Switch back to 'dev' branch"
	@echo "   8.1 use 'git checkout dev'"
	@echo ""




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
build:	minifyCore minifyBundle minifyBundleRequire

buildCore:
	echo $(BANNER)			>  build/tquery.js
	cat js/tquery.core.js		>> build/tquery.js
	cat js/tquery.convert.js	>> build/tquery.js
	cat js/tquery.node.js		>> build/tquery.js
	cat js/tquery.object3d.js	>> build/tquery.js
	cat js/tquery.geometry.js	>> build/tquery.js
	cat js/tquery.material.js	>> build/tquery.js
	cat js/tquery.light.js		>> build/tquery.js
	cat js/tquery.mesh.js		>> build/tquery.js
	cat js/tquery.sprite.js		>> build/tquery.js
	cat js/tquery.world.js		>> build/tquery.js
	cat js/tquery.loop.js		>> build/tquery.js
	cat js/tquery.core.create.js	>> build/tquery.js
	cat js/plugins/lights/*.js	>> build/tquery.js
	cat js/plugins/materials/*.js	>> build/tquery.js
	cat js/plugins/*.js		>> build/tquery.js

minifyCore: buildCore
	echo $(BANNER)	>  build/tquery.min.js
	curl --data-urlencode "js_code@build/tquery.js" 	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile	\
		>> build/tquery.min.js
	@echo size minified + gzip is `gzip -c build/tquery.min.js | wc -c` byte

buildBundle: buildCore
	echo $(BANNER)			>  build/tquery-bundle.js
	cat vendor/es5-shim.js		>> build/tquery-bundle.js
	cat vendor/three.js/three.js	>> build/tquery-bundle.js
	cat build/tquery.js		>> build/tquery-bundle.js
	# include boilerplate
	cat plugins/boilerplate/*.js			>> build/tquery-bundle.js
	cat vendor/threex/THREEx.WindowResize.js	>> build/tquery-bundle.js
	cat vendor/threex/THREEx.screenshot.js		>> build/tquery-bundle.js
	cat vendor/threex/THREEx.FullScreen.js		>> build/tquery-bundle.js
	cat vendor/threex.dragpancontrols.js		>> build/tquery-bundle.js
	cat vendor/three.js/Stats.js			>> build/tquery-bundle.js

minifyBundle: buildBundle
	echo $(BANNER)	>  build/tquery-bundle.min.js
	curl --data-urlencode "js_code@build/tquery-bundle.js" 	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile	\
		>> build/tquery-bundle.min.js
	@echo size minified + gzip is `gzip -c build/tquery-bundle.min.js | wc -c` byte

buildBundleRequire: buildBundle
	(cd plugins/requirejs && make compile)
	cat build/tquery-bundle.js		 	 > build/tquery-bundle-require.js
	cat plugins/requirejs/vendor/require.js		>> build/tquery-bundle-require.js
	cat plugins/requirejs/build/all.confrequire.js	>> build/tquery-bundle-require.js

minifyBundleRequire: buildBundleRequire
	echo $(BANNER)	>  build/tquery-bundle-require.min.js
	curl --data-urlencode "js_code@build/tquery-bundle-require.js" 	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile	\
		>> build/tquery-bundle-require.min.js
	@echo size minified + gzip is `gzip -c build/tquery-bundle-require.min.js | wc -c` byte

.PHONY: docs buildCore buildBundle minifyCore minifyBundle

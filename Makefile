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
			-D="noGlobal:true"	\
			-t=${JSDOC_ROOT}/templates/Codeview/		\
			-d=docs/					\
			js/ js/plugins


build:
	echo 						>  build/tquery.js
	cat vendor/three.js/Three.js			>> build/tquery.js
	echo 						>> build/tquery.js
	cat vendor/three.js/Detector.js			>> build/tquery.js
	echo 						>> build/tquery.js
	cat vendor/three.js/Stats.js			>> build/tquery.js
	echo 						>> build/tquery.js
	cat vendor/threex/THREEx.screenshot.js		>> build/tquery.js
	echo 						>> build/tquery.js
	cat vendor/threex/THREEx.FullScreen.js		>> build/tquery.js
	echo 						>> build/tquery.js
	cat vendor/threex/THREEx.WindowResize.js	>> build/tquery.js
	echo 						>> build/tquery.js
	cat vendor/threex.dragpancontrols.js		>> build/tquery.js
	echo 						>> build/tquery.js
	cat js/*.js					>> build/tquery.js
	echo 						>> build/tquery.js
	cat js/plugins/*.js				>> build/tquery.js

.PHONY: build docs

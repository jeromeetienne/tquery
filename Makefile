# makefile to automatize simple operations

server:
	python -m SimpleHTTPServer

deploy:
	# assume there is something to commit
	# use "git diff --exit-code HEAD" to know if there is something to commit
	# so two lines: one if no commit, one if something to commit 
	git commit -a -m "New deploy" && git push -f origin HEAD:gh-pages && git reset HEAD~

build:
	echo 						>  build/tquery.js
	cat js/tquery.object3d.js			>> build/tquery.js
	cat js/tquery.geometry.js			>> build/tquery.js
	cat js/tquery.material.js			>> build/tquery.js
	cat js/tquery.scene.js				>> build/tquery.js
	cat js/plugins/tquery.create.js			>> build/tquery.js
	cat js/plugins/tquery.geometry.toolbox.js	>> build/tquery.js

.PHONY: build

compile:
	cat head.confrequire.js					 > build/all.confrequire.js
	cat confrequire/*.confrequire.js			>> build/all.confrequire.js
	node bin/tomainconfigfile.js build/all.confrequire.js	 > build/allmerged.confrequire.js
	

build:
	cd examples && r.js -o name=main-dev.js out=../build/main-prod.js \
		mainConfigFile=../build/allmerged.confrequire.js	\
		baseUrl=.

.PHONY: build
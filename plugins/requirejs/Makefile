compile:
	/usr/local/bin/node bin/tomainconfigfile.js	> build/all.confrequire.js

build:	compile
	cd examples && r.js -o name=main-dev.js out=../build/main-prod.js	\
		mainConfigFile=../build/all.confrequire.js			\
		baseUrl=.

.PHONY: build

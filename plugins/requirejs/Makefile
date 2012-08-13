compile:
	cat head.confrequire.js			 > all.confrequire.js
	cat confrequire/*.confrequire.js	>> all.confrequire.js

	node tomainconfigfile.js all.confrequire.js	> allmerged.confrequire.js
	

build:
	cd examples && r.js -o name=main-dev.js out=main-prod.js baseUrl=. mainConfigFile=../allmerged.confrequire.js 
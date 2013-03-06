### Plugins screenshooter in selenium php

* this is a screenshooter in selenium php. 
* It screenshot all plugins.

#### Usage: 

```
$ php screenshot-all-plugins.php pluginNamesGlob=minecraft screenshotRoot=/tmp/ driverName=firefox
$ php screenshot-all-plugins.php pluginNamesGlob=minecraft tqueryUrl=http://jeromeetienne.github.com/tquery/
```

Dont forget to launch the server with 'make server' - needed as we use php
 
To visualize the output or a given plugin

```
$ open /tmp/tquery-screenshots/minecraft-*
```
#### NOTES taken on including require.js modules
* plugins/requirejs/confrequire : folder with all plugins configuration for require.js
  * [pluginname].confrequire.js is the ```requirejs.config()``` call for each plugin
  * [pluginname].initrequire.js is a fake module which is solely intended to update the plugins.baseURL
     * usefull for the plugins which need to read/write assets
* for r.js, all plugins/requirejs/confrequire/*.confrequire.js are concatenated in a single file
  called ```build/all.confrequire.js```
  * this is done by a tools ```bin/tomainconfigfile.js```
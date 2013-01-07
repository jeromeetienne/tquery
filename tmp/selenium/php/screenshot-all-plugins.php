<?php

require 'vendor/php-webdriver-master/__init__.php';

// get the pluginNames to shoot
$pluginNames	= getPluginNames();

// open webdriver $session
$webdriver	= new WebDriver();
$session	= $webdriver->session('chrome', array());

$screenshotRoot	= '/tmp/tquery-screenshots/';
// if this directory doesnt exists, create it
if( !file_exists($screenshotRoot) )	mkdir($screenshotRoot, 0777, true);

// shoot all $pluginNames
foreach($pluginNames as $pluginName){
	// capture all the examples of this plugins
	capturePluginExamples( $session, $pluginName, $screenshotRoot );	
}

// close the session
$session->close();

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

function getPluginNames(){
	//return array('minecraft');
	// build the ignoreList
	$ignoreList	= array('js', 'test', 'test2', 'webglcampworkshop'
				, 'requirejs', 'ogsworkshop');
	// add some plugins which cause trouble
	array_push($ignoreList, 'shadowmap');	// cause chrome to crash...
	
	$pluginNames	= array();
	// go thru all the paths in /plugins
	$paths		= glob('../../../plugins/*');
	foreach($paths as $path){
		$pathParts	= pathinfo($path);
		$basename	= $pathParts['basename'];
		// honor the ignoreList
		if( in_array($basename,	$ignoreList) )	continue;
		// insert in $pluginNames;
		array_push($pluginNames, $basename);
	};
	//var_dump($pluginNames);
	return $pluginNames;
}

/**
 * capture one screenshot for each examples of a given plugin
 */
function capturePluginExamples($session, $pluginName, $destDirname){
	$examplePaths	= glob('../../../plugins/'.$pluginName.'/examples/*.html');
	$pluginsRootUrl	= 'http://127.0.0.1:8000/plugins/';
	
	echo "Screenshot ".$pluginName.": Started\n";
	
	foreach($examplePaths as $examplePath){
		$pathParts	= pathinfo($examplePath);
		$url		= $pluginsRootUrl.$pluginName.'/examples/'.$pathParts['basename'];
		$filename	= $destDirname.'/'.$pluginName.'-'.$pathParts['filename'].'.png';
		echo "\texample ".$pathParts['basename'].' in '.$filename."\n";
		saveCapture($session, $url, $filename);		
	}
	echo "Screenshot ".$pluginName.": Completed\n";
}


/**
 * Save a capture of the screen
 */
function saveCapture($session, $url, $filename){
	// open the page
	$session->open($url);
	sleep(1);
	// get the screenshort
	$contentBase64	= $session->screenshot();
	$contentRaw	= base64_decode($contentBase64);
	// save it in a file
	file_put_contents($filename, $contentRaw);
} 

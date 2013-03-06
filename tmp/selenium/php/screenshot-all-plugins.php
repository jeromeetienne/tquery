<?php

// Usage: 
// $ php screenshot-all-plugins.php pluginNamesGlob=minecraft screenshotRoot=/tmp/ driverName=firefox
// $ php screenshot-all-plugins.php pluginNamesGlob=minecraft tqueryUrl=http://jeromeetienne.github.com/tquery/
//
// Dont forget to launch the server with 'make server' - needed as we use php
// 
// To visualize the output or a given plugin
// $ open /tmp/tquery-screenshots/minecraft-*

//////////////////////////////////////////////////////////////////////////////////
//		Command line parsing						//
//////////////////////////////////////////////////////////////////////////////////

// trick to parse command line in php
// $ php -f somefile.php a=1 b[]=2 b[]=3
// This will set $_GET['a'] to '1' and $_GET['b'] to array('2', '3').
parse_str(implode('&', array_slice($argv, 1)), $_GET);

// get parameters from command lines or use default values
$screenshotRoot	= $_GET['screenshotRoot']	? $_GET['screenshotRoot']	: '/tmp/tquery-screenshots/';
$pluginNamesGlob= $_GET['pluginNamesGlob']	? $_GET['pluginNamesGlob']	: '*';
$driverName	= $_GET['driverName']		? $_GET['driverName']		: 'chrome';
$tqueryUrl	= $_GET['tqueryUrl']		? $_GET['tqueryUrl']		: 'http://127.0.0.1:8000';


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

// get the pluginNames to shoot
$pluginNames	= getPluginNames($pluginNamesGlob);

// if this directory doesnt exists, create it
if( !file_exists($screenshotRoot) )	mkdir($screenshotRoot, 0777, true);

// include libraries needed for php-webdriver
require 'vendor/php-webdriver-master/__init__.php';
// open webdriver $session
$webdriver	= new WebDriver();
$session	= $webdriver->session($driverName, array());

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

/**
 * return all the plugins name to test
 */
function getPluginNames($pluginNamesGlob){
	// build the ignoreList
	$ignoreList	= array('js', 'test', 'test2', 'webglcampworkshop'
				, 'requirejs', 'ogsworkshop');
	// add some plugins which cause trouble
	array_push($ignoreList, 'shadowmap');	// cause chrome to crash... ok firefox tho
	
	$pluginNames	= array();
	// go thru all the paths in /plugins
	$paths		= glob('../../../plugins/'.$pluginNamesGlob);
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
	$pluginsRootUrl	= $GLOBALS['tqueryUrl'].'/plugins/';
	// log to debug
	echo "Screenshot ".$pluginName.": Started\n";
	// go thru each examples
	foreach($examplePaths as $examplePath){
		$pathParts	= pathinfo($examplePath);
		$url		= $pluginsRootUrl.$pluginName.'/examples/'.$pathParts['basename'];
		$filename	= $destDirname.$pluginName.'-'.$pathParts['filename'].'.png';
		echo "\texample ".$pathParts['basename'].' in '.$filename."\n";
		saveCapture($session, $url, $filename);
	}
	// log to debug
	echo "Screenshot ".$pluginName.": Completed\n";
}


/**
 * Save a capture of the screen
 */
function saveCapture($session, $url, $filename){
	// log to debug
	// echo "\tScreenshot ".$url." into ".$filename;
	// open the page
	$session->open($url);
	// sleep the time to load data (model or texture)
	// - FIXME: super dirty
	sleep(1);
	// get the screenshort
	$contentBase64	= $session->screenshot();
	$contentRaw	= base64_decode($contentBase64);
	// save it in a file
	file_put_contents($filename, $contentRaw);
} 

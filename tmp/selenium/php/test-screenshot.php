<?php

require 'vendor/php-webdriver-master/__init__.php';

$webdriver	= new WebDriver();
$session	= $webdriver->session('chrome', array());

// $session->open("http://google.com");
// $url		= "http://google.com";
// $url		= "http://127.0.0.1:8000/plugins/minecraft/examples/index.html";
// $session->open($url);

// $content_b64	= $session->screenshot();
// $imgData	= base64_decode($content_b64);
// $filename	= "/tmp/screenshot.png";
// file_put_contents($filename, $imgData);

$url		= "http://google.com";
$url		= "http://127.0.0.1:8000/plugins/minecraft/examples/index.html";
$filename	= "/tmp/screenshot.png";
saveCapture($session, $url, $filename);

$session->close();

/**
 * Save a capture of the screen
 */
function saveCapture($session, $url, $filename){
	// open the page
	$session->open($url);
	// get the screenshort
	$contentBase64	= $session->screenshot();
	$contentRaw	= base64_decode($contentBase64);
	// save it in a file
	file_put_contents($filename, $contentRaw);
} 
<?php

require 'vendor/php-webdriver-master/__init__.php';

$webdriver	= new WebDriver();
$session	= $webdriver->session('firefox', array());

$url		= "http://127.0.0.1:8000/tmp/selenium/php/test-mouse.html";
// open the page
$session->open($url);

$title	= $session->title();
$size	= $session->window()->size();
$url	= $session->url();

var_dump($size);
var_dump($url);
var_dump($title);


//$session->click();


$session->element('css selector','body')->click();

// $session->element('css selector','body')->click();
// $session->element('css selector','body')->click();


//$session->element('css selector','body')->moveto();
//$session->element('css selector','body')->click();
//$session->window()->click();
//$session->moveto(array('xoffset' => 3, 'yoffset' => 300));


$session->moveto(array('xoffset' => 10, 'yoffset' => 0));

$session->moveto(array('xoffset' => 10, 'yoffset' => 0));

//$session->moveto(array('element' => $session->element('css selector','body')));

//sleep(4);

// $sScriptResult = $session->execute(array(
// 	'script'	=> 'return window.document.location.hostname',
// 	'args'		=> array(),
// ));

// $sScriptResult = $session->execute(array(
// 	'script'	=> 'return nclick;',
// 	'args'		=> array(),
// ));
// var_dump($sScriptResult);

$sScriptResult = $session->execute(array(
	'script'	=> 'return curMouseX + " " + curMouseY;',
	'args'		=> array(),
));
var_dump($sScriptResult);

$session->close();

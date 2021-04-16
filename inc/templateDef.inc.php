<?php
/**************************************************
 TEMPLATE DEFINITION
**************************************************/
if ($_POST['widgetTemplate'] === "Französisch") {
	$tmplLanguage = "ABTemplate-FR";
	require_once 'inc/scarabTemplate-FR.sc.inc.php';
} else {
	$tmplLanguage = "ABTemplate-DE";
	require_once 'inc/scarabTemplate-DE.sc.inc.php';
}
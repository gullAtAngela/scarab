<?php
/**************************************************
 TITEL DEFINITION
**************************************************/
switch ($_POST['widgetTyp']) {
	case 'Personal':
		$output = "Unsere Empfehlung für Sie:";
	break;

	case 'Related':
		$output = "Passende Artikel:";
	break;

	case 'Also_Viewed':
		$output = "Zuletzt angesehen:";
	break;

	case 'Also_Bought':
		$output = "Zuletzt gekauft:";
	break;

	case 'Cart':
		$output = "Top-Seller:";
	break;

	case 'Category':
		$output = "Weitere Empfehlungen aus dieser Kategorie:";
	break;
}
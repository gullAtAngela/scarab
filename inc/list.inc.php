<?php

function list_render ($label, $options, $name, &$request = null) {
	$request === null
		&& $request = &$_POST;

	$output = "<label for=\"$title\">$label</label>\n";
	$output .= "\n<select name=\"$name\">\n";
	foreach ($options as $value => $title) {
		$selected = $request[$name] == $title ? 'selected' : '';
		
		$output .= "<option value=\"$title\" $selected>$title</option>\n";
	}
	
	$output .= "</select><br>\n";
	return $output;
}

function  inputText($label, $name, $value, &$request = null) {
	$request === NULL 
		&& $request = &$_POST;
		$wert = $request[$name];
		$output = "<label for=\"$name\">$label</label>";
		$output .= "<input type=\"text\" name=\"$name\" value=\"$wert\"><br />\n";
		return $output;
}

function input($type, $name, $label) {
	$output = '<label for="' . $name . '">' . $label . '</label>';
	$output .= '<input type="' . $type . '">';

	for ($i=0; $i < $width ; $i++) { 
		if (is_array($values))
			array_intersect($valueOrigin, $valueReference)
		
	}
	return $output;
}
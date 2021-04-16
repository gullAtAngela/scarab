<?php
$pageTitle = "Emarsys Scarab Integration | Recommender";
include_once '../_template/head.php';
require_once 'inc/init.inc.php';
require_once 'inc/util.inc.php';
// require_once 'inc/param.inc.php';
require_once 'inc/scarabTemplate-DE.sc.inc.php';

$widgetTyp = array('Personal', 'Related', 'Also_Bought', 'Also_Viewed', 'Cart', 'Category');
$widgetItem = array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');
$widgetTemplate = array('ABTemplate-DE', 'ABTemplate-FR');
$widgetTemplate = array('Deutsch', 'Französisch');
$widgetCatalogRoutine = array('','include', 'exclude');
$widgetCatalogComparison = array('','is', 'in', 'has');
$widgetCatalogTyp = array('','item', 'category', 'c_stopper');
$widgetLogic = array('category');
$widgetCatalogTerm = array('','Satin', 'Seersucker', 'Badteppiche', 'Wohndecken', 'Rotweine', 'Fondue-Sets');
$output = "";
$selected = "";

?>
<!-- <html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/scarabstyle.css">
	<link rel="stylesheet" href="css/glyphicons.css">
	<title>Emarsys Scarab Integration | Recommender</title>
</head> -->
<body>
	<script src="js/scarab-api.js"></script>
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<h1><?= $pageTitle ?></h1>
				<h5 class="strong">Developer Mode Cookie</h5>		
				<p>The following cookie is provided for developers to help in the integration of the recommender widgets. The cookie causes website widgets to return a random sample of items for all recommender requests:<br>
				<a href="http://recommender.scarabresearch.com/merchants/13F809CE8231683F/?fc_cookie=DEVELOPER">Set the Developer Cookie</a><br>You can disable the developer cookie by restarting your browser.</p>
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="control col-sm-12 col-md-8 col-lg-6">
				<h3>Einstellungen</h3>
				<form method="post" action="<?php basename(__FILE__) ?>">
					<?php
					// echo list_render('Typ', $widgetTyp, 'widgetTyp');
					echo list_render('Anzahl', $widgetItem, 'widgetItem');
					echo list_render('Sprache', $widgetTemplate, 'widgetTemplate');
					if ($_POST['widgetTyp'] == 'Category') { 
						echo list_render('Warengruppe', $widgetCatalogTerm, 'widgetCatalogTerm');
					} 
					if ($_POST['widgetCatalogTerm'] === '') {
						echo inputText('Warengruppe', 'Warengruppe', 'Warengruppe');
					}
					?>
					<input class="btn btn-primary" type="submit" name="generate" value="Go">
					<!-- <label for="individual">Expert Mode</label> -->
					<!-- <input type="checkbox" name="individual" value="individual" <?php #if (isset($_POST['individual'])) { echo "checked"; } else { echo ""; } ?>><br> -->
					<?php
						// if (isset($_POST['individual'])) {
						// 	echo list_render('Routine', $widgetCatalogRoutine, 'widgetCatalogRoutine');
						// 	echo list_render('Comparison', $widgetCatalogComparison, 'widgetCatalogComparison');
						// }
					?>
				</form>
			</div>
		</div>
	</div>

	<?php
	require_once 'inc/templateDef.inc.php';
	require_once 'inc/titleDef.inc.php'; ?>
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<h3><?php echo $output; ?></h3>
				<!-- Container for recommendations -->
				<div id="personal-recs"></div>
			</div>
		</div>
	</div>
	<?php
		if (isset($_POST['individual'])) {
			if ($_POST['widgetCatalogRoutine'] == 'exclude') {
				$output = "<script>ScarabQueue.push(['";
				$output .= $_POST['widgetCatalogRoutine'] . "', 'category', '";
				$output .= $_POST['widgetCatalogComparison'] . "', '";
				$output .= $_POST['Warengruppe'] . "'";
				$output .= "])</script>";
				echo $output;
			}
		} else {
			if ($_POST['widgetCatalogTerm'] == '') { 
				echo "<script>ScarabQueue.push(['category'";
				echo ", '" . $_POST['Warengruppe'];
				echo "'])</script>";
			}
			elseif ($_POST['widgetCatalogTerm'] !== "" && $_POST['widgetTyp'] == 'Category') { 
				echo "<script>ScarabQueue.push(['category'";
				echo ", '" . $_POST['widgetCatalogTerm'];
				echo "'])</script>";
			}
			if ($_POST['widgetTyp'] == 'Category'
				&& $_POST['widgetCatalogTerm'] == ''
				&& $_POST['Warengruppe'] == '') {
				//echo "<p class=\"alert alert-info\">Bitte schreib eine Warengruppe in das Feld.</p>";
			}
		}
	?>
	<script>
		// Request personalized recommendations.
		ScarabQueue.push(['recommend', {
		    containerId: 'personal-recs',
		    logic: '<?php echo strtoupper($_POST['widgetTyp']) ?>',
		    limit: '<?php echo $_POST['widgetItem'] ?>',
		    templateId: '<?php echo $tmplLanguage ?>',
		}]);
	</script>
<?php include '../_template/footer.php'; ?>
<!-- Template for rendering recommendations -->
<script type="text/html" id="ABTemplate-FR" >
<![CDATA[
{{ if (SC.page.products.length) { }}
<div class="scarab-itemlist">
	<div class="scarab-prev glyphicons chevron-left"></div>
	{{ if(SC.page.products.length > 0) { }}
	{{ for (var i=0; i < SC.page.products.length; i++) { }}
	{{ var p = SC.page.products[i]; }}
	<span data-scarabitem="{{= p.id }}" class="scarab-item">
		<a href="{{= p.c_link_fr }}">
			<img src="{{= p.image }}" onclick="econdaMarker('Emarsys <?php echo $_POST['widgetTyp'] ?>');">
			<span class="brand">
				{{=p.brand}}
			</span>
			<span class="title">
				{{= p.c_title_fr }}
			</span>
		</a>
		<span class="prices">
			<span class="price">dès&nbsp;CHF&nbsp;{{= p.price.toFixed(2) }}</span>
			{{ if(p.msrp != 0) { }}
				<span class="price-old">au lieu de {{=p.msrp}}</span>
			{{ } }}
		</span>
	</span>
	{{ } }}
	<div class="scarab-next glyphicons chevron-right"></div>
</div>
{{ } }}
{{ } else { }}
	<div class="callout warning">
		<h5>Aucune recommandation correspondante</h5>
		<p>Veuillez contrôler le groupe de produits.</p>
	</div>
{{ } }}
]]>
</script>
<!-- echo {$_POST['widgetItem']} -->
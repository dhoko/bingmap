[Bing Map API version 7 for jQuery](http://bingmap.cyaneus.org/) - A jQuery plugin embedding Bing Maps into your website
================================

The jQuery Bing Map Plugin helps you embed Bing Maps into your Website.

## Getting Started
* Include the script from Bing 
* Include jQuery and the plugin on a page. 
* Create an API Key to use the Bing API [Bing Maps Portal](http://www.bingmapsportal.com/) 

Then select a div and call the `bingmap` method, and add your API key 

```html
<div id="map"></div>
<script charset="UTF-8" type="text/javascript" src="https://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script>
	$('#map').bingmap({api: credentials});
</script>
```

For more information and options, [check the documentation](http://bingmap.cyaneus.org/).

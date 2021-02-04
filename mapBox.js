!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Display a map</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
<script src="https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.js"></script>
<link href="https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css" rel="stylesheet" />
<style>
	body { margin: 0; padding: 0; }
	#map { position: absolute; top: 0; bottom: 0; width: 100%; }
</style>
</head>
<body>
<style>
.mapboxgl-popup {
max-width: 400px;
font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
</style>

</head>
<body>

<div id="map"></div>
<script>
	mapboxgl.accessToken = 'pk.eyJ1IjoiamNpYW5jaTEiLCJhIjoiY2trZWM2anJmMGF4eDJuano1NzZscjA1NSJ9.RabLwj8ALzY2pJbp35s_hA';
        var map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/jcianci1/ckkptf4g17zf117mjvdo9p7i9', // style URL
            center: [12.496366, 41.902782], // starting position [lng, lat]
            zoom: 5 // starting zoom
        });

var hoveredStateId = null;


map.on('load', function () {
map.addSource('states', {
'type': 'vector',
'url': 'mapbox://jcianci1.ckkn7626311fq22o2wuxuq1l0-71nfu'

});
 
// The feature-state dependent fill-opacity expression will render the hover effect
// when a feature's hover state is set to true.
map.addLayer({
            'id': 'state-fills',
            'type': 'fill',
            'source-layer': 'ItalyRegions',
            'source': 'states',
            'layout': {},
            'paint': {
                'fill-color': '#627BC1',
                'fill-opacity':
            [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5
        ]
    }
});
 
map.addLayer({
        'id': 'state-borders',
        'type': 'line',
        'source-layer': 'ItalyRegions',
        'source': 'states',
        'layout': {},
        'paint': {
        'line-color': '#627BC1',
        'line-width': 2
        }
    });
 
// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
map.on('mousemove', 'state-fills', function (e) {
    if (e.features[0].properties.reg_istat_code_num.length > 0) {
    if (hoveredStateId) {
        map.setFeatureState(
            { source: 'states', id: hoveredStateId },
            { hover: false }
                );
            }
hoveredStateId = e.features[0].properties.reg_istat_code_num;
    map.setFeatureState(
        { source: 'states', id: hoveredStateId },
        { hover: true }
            );
            }
});
 
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'state-fills', function () {
    if (hoveredStateId) {
        map.setFeatureState(
            { source: 'states', id: hoveredStateId },
            { hover: false }
            );
        }
        hoveredStateId = null;
    });
});

</script>
 
</body>
</html>

// 1. Create a map object.
var mymap = L.map('map', {
  center: [44.967243, -103.771556],
  zoom: 3,
  maxZoom: 7,
  minZoom: 2,
  detectRetina: true
});

// 2. Add a base map.
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png').addTo(mymap);

// 3. Add airports GeoJSON data.
airports = L.geoJson.ajax("assets/airports.geojson", {
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Control Tower (Y/N)? " + feature.properties.CNTL_TWR);
  },
  pointToLayer: function(feature, latlng) {
    var id = 0;
    if (feature.properties.CNTL_TWR == "N") {
      id = 0;
    } else {
      id = 2;
    } // "Y"
    return L.marker(latlng, {
      icon: L.divIcon({
        className: 'fa fa-plane marker-color-' + (id + 1).toString()
      })
    });
  },
  attribution: 'Airports Data: USGS Data Catalog | State Boundaries: Mike Bostock of D3 | Base Map: CartoDB | Made By: Tom Truong'
}).addTo(mymap);

// 4. Build up a set of colors from ColorBrewer's Set1 category
var colors = chroma.scale('Set1').mode('lch').colors(9);

// 5. Dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 9; i++) {
  $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 7px;} </style>"));
}

// 6. Set function for color ramp.
colors = chroma.scale('BuPu').colors(5);

function setColor(density) {
  var id = 0;
  if (density > 75) {
    id = 4;
  } else if (density > 50 && density <= 75) {
    id = 3;
  } else if (density > 25 && density <= 50) {
    id = 2;
  } else if (density > 10 && density <= 25) {
    id = 1;
  } else {
    id = 0;
  }
  return colors[id];
}

// 7. Set style function that sets fill color.md property equal to airport density.
function style(feature) {
  return {
    fillColor: setColor(feature.properties.count),
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: '#b4b4b4',
    dashArray: '5'
  };
}

// 8. Add state polygons.
L.geoJson.ajax("assets/us-states.geojson", {
  style: style
}).addTo(mymap);

// 9. Create Leaflet Control Object for Legend
var legend = L.control({
  position: 'topright'
});

// 10. Function that runs when legend is added to map
legend.onAdd = function() {

  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML += '<b>Number of Airports</b><br />';
  div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p>75+</p>';
  div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p>50-74</p>';
  div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p>25-49</p>';
  div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p>10-24</p>';
  div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p>0-9</p>';
  div.innerHTML += '<hr><b>Air Traffic Control Tower?<b><br />';
  div.innerHTML += '<i class="fa fa-plane marker-color-3"></i><p> Yes</p>';
  div.innerHTML += '<i class="fa fa-plane marker-color-1"></i><p> No</p>';
  return div;
};

// 11. Add a legend to map.
legend.addTo(mymap);

// 12. Add a scale bar to map.
L.control.scale({
  position: 'bottomleft'
}).addTo(mymap);

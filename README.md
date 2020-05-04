# Airports in the United States

![Screenshot of Map](/img/airportsinUS.jpg)
*Screenshot of the map generated from Atom live server, showing the airports in the United States*

---
This map is visualizing all the **Airports in the United States**, including U.S. territories. The map is using two GeoJSON files, one for airport data in the United States *(airports.geojson)* and the other containing the 50 states + territory boundaries *(us-states.geojson)*.

For airport data, I'm indicating if the airport has an air traffic control tower *("Y")* or not *("N")* from the property *CNTL_TWR*. The icon to represent this is the universal symbol for an airplane, is indicated green for the value *Y* (Yes) and red for *N* (No). The use of the state boundaries are to indicate how many airports are within each boundary *(count)* and it's visualized by a thematic scale of density of airports within each state.

The primary functions of this web map are you can zoom in to showcase a particular case or zoom as far out to see the whole world. The airplane icon markers are clickable to view if the specific airport has a traffic control tower or not. From the choropleth feature, each state is shaded to represent airport density *(as referenced from the legend)* and is border is divided by dashes.

The libraries used for this project was [**Leaflet**](https://leafletjs.com/) *(1.4.0)* for web mapping functionality, [**Font Awesome**](https://fontawesome.com/) *(4.7.0)* for the airplane icon, [**Google Fonts**](https://fonts.google.com/) for the Helvetica font *(seemed appropriate because this font is typically used for airport terminal signs)* and [**Leaflet-ajax**](https://cdnjs.com/libraries/leaflet-ajax) *(2.1.0)*. The two GeoJSON files are from [**USGS Data Catalog**](https://catalog.data.gov/dataset/usgs-small-scale-dataset-airports-of-the-united-states-201207-shapefile) for Airport Data and from [**Mike Bostock**](https://bost.ocks.org/mike/) of [**D3**](https://d3js.org/) for the State Boundaries.

The basemap is **"Dark Matter with Labels"** from [**CartoDB**](https://carto.com/help/building-maps/basemap-list/). Much thanks is to Professor [**Bo Zhao**](https://hgis.uw.edu/) for providing lab instructions for this project. **Thank you.**

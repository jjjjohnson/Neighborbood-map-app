##Udacity Neighborhood Map Project

##Get started

```
git clone https://github.com/jjjjohnson/Neighborbood-map-app.git
```
open file Neighborbood-map-app 
double click index.html

## Introduction
A single page application featuring a map of New york neighborhood is developed. This project is developed bearing the interactive and repoinsive performance in mind. The tools used are:

- jQuery for DOM manupulatoin and ajax query.
- Knockout for constructing MVVM model, creating Observable Array and computing Observables for update.
- Media query for enhancing responsive page for various page width.
- API services from google to construct the map and from open weather to retrive the weather information of certain place.

## Implementation
1. MVVM: data bind in index.html acts like a view for displaying items reponsives(e.g. text) in the page. Model(`NYPlaces`) is just an array of objects containing neighborhood information about place name, latitute and longitude. Constructor `Place` takes object in `NYPlaces` and make an new object which has certain property rlated to it. It retrieves lat and long in order to make a query to open weather. Then the parsed information is placed in `google.maps.InfoWindow` in order to display the text. There is an eventListener to show the info at the event of clicking. `ko.computed` is used to show/hide markers on the map based on ko.obserbale(`self.visible()`). `ViewModel` first convert array(`NYPlaces`) to `ko.observableArray` and bind search text to ko.obserbable(`this.placeList`). The filtered list is returned based on text search outcome so that the list in the page and markers on the map are responsive based on the search result.
2. Responsiveness: In app.css, the map width is set `width: 75vw;` and nav side bar is set `width: 15vw;`. Media query is set at 800px wide or more, the nav side bar shows up and occupy the left column of the page. A hamberger key is placed at the top left of the page and at the event of clicking, toggling the nav side bar.
3. Google map api is used to get the map data with error handling. If there an error, `errorMsg()` is called displaying the error message. Open weather api is used with lat and long data provided to retrieve weather data. This data will show as content of `google.maps.InfoWindow` when certain event trigers.
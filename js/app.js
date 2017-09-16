var map;
var openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&';
var key = 'APPID=e46508f239b4597aac188c42f13c9894';

var NYPlaces = [
	{
		name: 'Empire State Building',
		lat: 40.748817,
		long: -73.985428
	},
	{
		name: 'Madison Square Garden',
		lat: 40.750298,
		long: -73.993324
	},
	{
		name: 'Central Park',
		lat: 40.785091,
		long: -73.968285
	},
	{
		name: 'Flatiron Building',
		lat: 40.741534,
		long:  -73.989747
	},
	{
		name: '69th Regiment Armory',
		lat: 40.741255,
		long: -73.983894
	},
	{
		name: 'Baruch College',
		lat: 40.740190,
		long:  -73.983347
	}
];

var Place = function(data) {
	var self = this;
	this.visible = ko.observable(true);
	this.name = data.name;

	// Add third-party api to self.info
	var url = openWeatherUrl + key + '&lat=' + data.lat + '&lon=' + data.long;
	$.ajax({
		url: url,
		dataType: "json"
	}).done(function(parsed) {
		// console.log(parsed);
		// console.log(parsed.main.temp);
		
		// add info window for each of the place
		self.info = 
		`<div class="info">
			<div>${self.name}</div>
			<div>Weather: ${parsed.weather[0].description}</div>
			<div>Temperature: ${parsed.main.temp} celsius degree</div>
			<div>Humidity: ${parsed.main.humidity} %</div>
		</div>`;

		self.infoWindow = new google.maps.InfoWindow({content: self.info});
		
	}).fail(function() {
		alert('Cannot retrieve data from open weather!');
	});

	
	this.marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.lat, data.long),
			title: data.name
	});

	this.showMarker = ko.computed(function() {
		if (self.visible()) {
			// To add the marker to the map, call setMap();
			self.marker.setMap(map);
		} else {
			// not show on the map
			this.marker.setMap();
		}
	}, this);

    this.marker.addListener('click', function() {
    	self.infoWindow.open(map, self.marker);
    });

    this.showInfo = function() {
    	// console.log(self.infoWindow);
    	// self.infoWindow.close();
		google.maps.event.trigger(self.marker, 'click');
	};

};

var ViewModel = function() {

	map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 40.7413549, lng: -73.99802439999996},
	    zoom: 12
    });
	var self = this;
	this.searchText = ko.observable("");

	this.placeList = ko.observableArray([]);
	//iterate through the places and make a ko.observable array
	NYPlaces.forEach(function(data) {
		self.placeList.push(new Place(data));
	});

	this.filteredList = ko.computed( function() {
		var input = self.searchText().toLowerCase();
		// check if the input is empty
		if (!input) {
			// console.log('No input');
			self.placeList().forEach(function(locationItem){
				locationItem.visible(true);
			});
			// show all the land markers
			return self.placeList();
		} else {
			return ko.utils.arrayFilter(self.placeList(), function(place) {
				var placeName = place.name.toLowerCase();
				// console.log(placeName.search(input));
				var find = (placeName.search(input) >= 0);
				place.visible(find);
				return find;
			});
		}
	}, self);


	
};

function start() {
	ko.applyBindings(new ViewModel());
}

function errorMsg() {
	alert("Google Maps has failed to load.");
}
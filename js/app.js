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
	console.log(url);
	$.ajax({
		url: url
	}).done(function(json) {
		console.log(json);
		var parsed = loadJSON(json);
		
		self.info = `<div class="info">
			<div><b>${self.name}<b></div>
			<div>Weather: ${parsed.weather.description}</div>
			<div>Temperature: ${parsed.main.temp} Celsius degree</div>
			<div>Humidity: ${parsed.main.humidity} Celsius degree</div>
		</div>`;
	}).fail(function() {
		alert('Cannot retrieve data from open weather!');
	});

	
	this.infoWindow = new google.maps.InfoWindow({content: self.info});
	this.marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.lat, data.long),
			title: data.name
	});

	this.showMarker = ko.computed(function() {
		if (self.visible()) {
			// To add the marker to the map, call setMap();
			self.marker.setMap(map);
		} else {
			// now show on the map
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
	NYPlaces.forEach(function(data) {
		self.placeList.push(new Place(data));
	});



	this.filteredList = ko.computed( function() {
		var input = self.searchText().toLowerCase();
		if (!input) {


			// console.log('No input');
			self.placeList().forEach(function(locationItem){
				locationItem.visible(true);
			});
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

function errorHandling() {
	alert("Google Maps has failed to load. Please check your internet connection and try again.");
}
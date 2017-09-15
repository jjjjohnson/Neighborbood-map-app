var map;

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

	// TODO: add third-party api to self.info
	this.infoWindow = new google.maps.InfoWindow({content: 'self.info'});
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
		// return true;
	}, this);

    this.marker.addListener('click', function() {
    	self.infoWindow.open(map, self.marker);
    });

    this.showInfo = function() {
    	// console.log(self.infoWindow);
    	// self.infoWindow.close();
		google.maps.event.trigger(self.marker, 'click');
	};

	// this.clickCount = ko.observable(data.clickCount);
	// this.name = ko.observable(data.name);
	// this.imgSrc = ko.observable(data.imgSrc);
	// this.imgAttribute = ko.observable(data.imgAttribute);
	// this.header = ko.computed(function() {
	// 	if (this.clickCount() < 5) {
	// 		return 'infant';
	// 	} else if (this.clickCount() < 10) {
	// 		return 'baby';
	// 	} else if (this.clickCount() < 15) {
	// 		return 'teen';
	// 	} else {
	// 		return 'adult';
	// 	}
	// }, this);

	// this.nickname = ko.observableArray(data.nickname);
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
			// ko.utils.arrayForEach(self.placeList(), function(place) {
			// 	var placeName = place.name.toLowerCase();
			// 	var find = (placeName.search(input) >= 0);
			// 	place.visible(find);
			// });
			return ko.utils.arrayFilter(self.placeList(), function(place) {
				var placeName = place.name.toLowerCase();
				// console.log(placeName.search(input));
				var find = (placeName.search(input) >= 0);
				place.visible(find);
				return find;
			});
		}
	}, self);

	this.mapElem = document.getElementById('map');
	this.mapElem.style.height = window.innerHeight - 50;
	// this.currentCat = ko.observable( this.catList()[0] );

	// // this represents the current cat's binding context ("with: currentCat")
	// this.incrementCounter = function() {
	// 	this.clickCount(this.clickCount() + 1);
	// };

	// this.setCat = function(clickedCat) {
	// 	// console.log('hi');
	// 	self.currentCat(clickedCat);
	// };

	
};

function start() {
	ko.applyBindings(new ViewModel());
}

function errorHandling() {
	alert("Google Maps has failed to load. Please check your internet connection and try again.");
}
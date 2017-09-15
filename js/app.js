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
		if (this.visible) {
			// To add the marker to the map, call setMap();
			this.marker.setMap(map);
		}
	}, this);

    this.marker.addListener('click', function() {
    	self.infowindow.open(map, marker);
    });

    this.showInfo = function() {
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
	var self = this;
	this.searchText = ko.observable("");

	this.placeList = ko.observableArray([]);
	NYPlaces.forEach(function(data) {
		self.catList.push(new Place(data));
	});

	map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7413549, lng: -73.99802439999996},
        zoom: 13
    });

	this.filteredList = ko.computed( function() {
		var input = self.searchTerm().toLowerCase();
		if (!input) {
			self.locationList().forEach(function(locationItem){
				locationItem.visible(true);
			});
			return self.placeList();
		} else {
			return ko.utils.arrayFilter(self.placeList(), function(place) {
				var placeName = locationItem.name.toLowerCase();
				locationItem.visible((string.search(filter) >= 0));
			});
		}
	}, self);


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

ko.applyBindings(new ViewModel());
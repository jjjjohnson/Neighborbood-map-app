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
	this.visible = ko.observable(true);
	
	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAttribute = ko.observable(data.imgAttribute);
	this.header = ko.computed(function() {
		if (this.clickCount() < 5) {
			return 'infant';
		} else if (this.clickCount() < 10) {
			return 'baby';
		} else if (this.clickCount() < 15) {
			return 'teen';
		} else {
			return 'adult';
		}
	}, this);

	this.nickname = ko.observableArray(data.nickname);
};

var ViewModel = function() {
	var self = this;

	this.placeList = ko.observableArray([]);
	NYPlaces.forEach(function(data) {
		self.catList.push(new Place(data));
	});

	this.currentCat = ko.observable( this.catList()[0] );

	// this represents the current cat's binding context ("with: currentCat")
	this.incrementCounter = function() {
		this.clickCount(this.clickCount() + 1);
	};

	this.setCat = function(clickedCat) {
		// console.log('hi');
		self.currentCat(clickedCat);
	};

	
};

ko.applyBindings(new ViewModel());
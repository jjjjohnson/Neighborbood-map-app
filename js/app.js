var initialCats = [
{
	name : 'JJ',
	clickCount : 0,
	imgSrc : 'img/22252709_010df3379e_z.jpg',
	imgAttribute : 'https://www.jj.com',
	nickname : ['jj0', 'jj1', 'jj2', 'jj3', 'jj4']
},
{
	name : 'JJ1',
	clickCount : 0,
	imgSrc : 'img/434164568_fea0ad4013_z.jpg',
	imgAttribute : 'https://www.jj.com',
	nickname : ['baobao']
},
{
	name : 'JJ2',
	clickCount : 0,
	imgSrc : 'img/1413379559_412a540d29_z.jpg',
	imgAttribute : 'https://www.jj.com',
	nickname : ['qinqin']
},
{
	name : 'JJ3',
	clickCount : 0,
	imgSrc : 'img/4154543904_6e2428c421_z.jpg',
	imgAttribute : 'https://www.jj.com',
	nickname : ['jigaogao']
},
{
	name : 'JJ4',
	clickCount : 0,
	imgSrc : 'img/9648464288_2516b35537_z.jpg',
	imgAttribute : 'https://www.jj.com',
	nickname : ['papapa']	
}
];

var Cat = function(data) {
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

	this.catList = ko.observableArray([]);
	initialCats.forEach(function(catItem) {
		self.catList.push(new Cat(catItem));
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
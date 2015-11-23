angular.module('jsCodingTest', [
	'cpLib'
]);

angular.module('jsCodingTest').controller('GiveTheGovernmentABurrito', function($scope, PackagesFactory) {
	// Your code should use our JS library's `PackagesFactory.searchPackages` method to search
	// for burritos that can be delivered to the Houses of Parliament in London.
	// The API URL that should be called is:
	// https://api.citypantry.com/packages/search?name=Burrito&postcode=SW1A%200AA
	// ^ This comment seems to be at odds with the description on the github page where it says:
	// The webpage has an input box to enter a desired type of food (e.g. "burritos", "burgers", etc.)
	// The listed food packages get updated upon input change to match the desired food type
	// So I have written this with the assumption that we want to list all packages available 
	// and filter on user input, not just get burritos.
	
	
	// NOTES:
	// * I'm getting all packages initially and then searching through them locally as this provides a much more responsive search. 
	//      - The downside to this is that if an option is added/removed this won't be reflected until the page is refreshed.
	//          However, the calls to searchPackages are cached in the browser for 10 mins anyway and the nature of the data
	//          means it is unlikely to change frequently so I don't think this is a huge issue
	//      - One other downside is that the search implementation of the angular filter may be different to that of the api call.
	//          They seem identical at the moment but that could change (for example we might want a search for 'Chicken Tarragon'
	//          to return the 'Sweet Tarragon Chicken Salad Box' result) and if it did, we'd have to update this front end as well.
	// * However, I thought for this simple example this was the best approach.
	
	function getAllPackages(){
		PackagesFactory.searchPackages('', 'SW1A%200AA')
		.then(onSuccess, onFailure);
	}
	
	function onFailure(response){
		$scope.errored = true;
	}
	
	function onSuccess(response){
		$scope.foodPackages = response.data.packages;
	}
		
	getAllPackages();
	$scope.searchText = '';
});



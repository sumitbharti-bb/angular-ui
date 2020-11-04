angular.module('RecipeManagement', [
  'RecipeManagement.services',
  'RecipeManagement.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/recipe", {templateUrl: "partials/recipe.html", controller: "recipeController"}).
	when("/shopping", {templateUrl: "partials/shopping.html", controller: "shoppingController"}).
	otherwise({redirectTo: '/recipe'});
}]);
angular.module('RecipeManagement.services', [])
  .factory('recipeManagmentAPIservice', function($http) {

    var backendAPI = {};

    backendAPI.getAllRecipe = function() {
      return $http.get('http://localhost:8080/recipe/list');
    }

    backendAPI.getRecipeById = function(id) {
      return $http.get('http://localhost:8080/recipe/'+id);
    }

    backendAPI.createRecipe = function(recipe) {
      return $http.post('http://localhost:8080/recipe', recipe);
    }

    backendAPI.getDriverDetails = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    backendAPI.getDriverRaces = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
      });
    }

    return backendAPI;
  });
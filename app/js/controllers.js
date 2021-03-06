angular.module('RecipeManagement.controllers', []).

  /* Drivers controller */
  controller('recipeController', function($scope, recipeManagmentAPIservice, $rootScope) {
    $scope.nameFilter = null;
    $scope.driversList = [];
    $scope.searchFilter = function (driver) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
    };

    $scope.getAllRecipe = function(){
      recipeManagmentAPIservice.getAllRecipe().success(function (response) {
        //Digging into the response to get the relevant data
        console.log('Response from backend');
        console.log(response);
        $scope.recipeList = response;
        //$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
  }
  $scope.getAllRecipe();

    $scope.selectedTab = 'Recipes';
    $scope.selectedRecipe = {};

    // $scope.recipeList = [
    //   {'id': 1, 'name': 'Tasty Schnitzel', 'description': 'A super-tasty Schnitzl - just awesome', 'imageUrl': 'https://image.shutterstock.com/image-photo/healthy-food-clean-eating-selection-600w-722718082.jpg'},
    //   {'id': 2, 'name': 'Big Fat Burger', 'description': 'What else you need to say?', 'imageUrl': ''}
    // ]

    $scope.newRecipe = {};
    $scope.showCreateRecipe = function(){
      $scope.show_create_recipe = true;
    }

    $scope.saveRecipe = function(){
      recipeManagmentAPIservice.createRecipe($scope.newRecipe).success(function (response) {
        console.log('Response after saving from backend');
        console.log(response);
        $scope.show_create_recipe = false;
        $scope.getAllRecipe();
    });
    }

    $scope.cancelRecipe = function(){
      $scope.newRecipe = {};
    }

    $scope.selectTab = function(value){
      $scope.selectedTab = value;
      console.log('select tab:'+ value);
    }

    $scope.showRecipeDetails = function(recipeId){
      console.log('select recipeid:'+ recipeId);
      for(var i =0;i<$scope.recipeList.length;i++){
        if($scope.recipeList[i].id == recipeId){
          $scope.selectedRecipe = $scope.recipeList[i];
        }
      }
    }
  }).

  /* Driver controller */
  controller('shoppingController', function($scope, $routeParams, recipeManagmentAPIservice, $rootScope) {
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.driver = null;

    recipeManagmentAPIservice.getDriverDetails($scope.id).success(function (response) {
        $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]; 
    });

    recipeManagmentAPIservice.getDriverRaces($scope.id).success(function (response) {
        $scope.races = response.MRData.RaceTable.Races; 
    }); 
  });
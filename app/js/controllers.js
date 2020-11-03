angular.module('F1FeederApp.controllers', []).

  /* Drivers controller */
  controller('driversController', function($scope, ergastAPIservice) {
    $scope.nameFilter = null;
    $scope.driversList = [];
    $scope.searchFilter = function (driver) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
    };

    ergastAPIservice.getDrivers().success(function (response) {
        //Digging into the response to get the relevant data
        $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });

    $scope.selectedTab = 'Recipe Book';
    $scope.selectedRecipe = {};

    $scope.recipeList = [
      {'id': 1, 'name': 'Tasty Schnitzel', 'description': 'A super-tasty Schnitzl - just awesome', 'imageUrl': 'https://image.shutterstock.com/image-photo/healthy-food-clean-eating-selection-600w-722718082.jpg'},
      {'id': 2, 'name': 'Big Fat Burger', 'description': 'What else you need to say?', 'imageUrl': ''}
    ]

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
  controller('driverController', function($scope, $routeParams, ergastAPIservice) {
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.driver = null;

    ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
        $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]; 
    });

    ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
        $scope.races = response.MRData.RaceTable.Races; 
    }); 
  });
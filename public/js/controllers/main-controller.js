angular.module('MainCtrl', ['MappingService']).controller('MainController', function(MappingService, $scope, $http) {

//    $scope.CashBank = {};
// 	$scope.chequeBank = {};
// 	$scope.DraftBank = {};
	$scope.Branch = {};
	
  
    // MappingService.CashBank().then(function (response) {
	// 	console.log(response)
    //    $scope.CashBank = response;
    // })

	// MappingService.chequeBank().then(function (response) {
    //     $scope.chequeBank = response;
    // })

	
	// MappingService.DraftBank().then(function (response) {
    //     $scope.DraftBank = response;
    // })
	
  	MappingService.Branch().then(function (response) {
        $scope.Branch = response;
    })

});
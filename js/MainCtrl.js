angular.module('socialApp').controller('MainCtrl', function ($scope, MainService) {

    MainService.getCurrentUser().then(function (response) {
        $scope.currentUser = response;
    });

    // MainService.getcurrentUser().then(function(response){
    //     //response object would be a promise for the second call
    //     response.then(function(secondResponse){
    //         $scope.user = secondResponse;
    //     })
    // })

    $scope.getFriends = function () {
        MainService.getFriends($scope.name).then(function (response) {
            $scope.friends = response;
        });
    };

});

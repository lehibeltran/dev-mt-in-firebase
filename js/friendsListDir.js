angular.module('socialApp').directive('friendsListDir', function ($q, $location, $state, MainService) {
    return {
        templateUrl: '../views/searchFriendsFlex.html',
        restrict: 'E',
        scope: {
            profileView: '='
        },
        link: function (scope, elem, attrs) {
            MainService.getCurrentUser().then(function (response) {
                if (response) {
                    scope.currentUser = response;
                    console.log("there is a profile");
                    scope.profileView = 'friendslist';
                    scope.loadFriends();
                } else {
                    $location.path("/");
                }
            });
            scope.loadFriends = function () {
                var promises = [];
                scope.currentUser.friends.forEach(function(friendId){
                    var indPromise = MainService.getFriends(friendId).then(function (response) {
                        if (response) {
                            return response;
                        }else{
                            console.log('error in fetching friends forEach method');
                        }
                    });
                        promises.push(indPromise);
                });
                // execute all the promises and do something with the results
                return $q.all(promises).then(
                    // success
                    // results: an array of data objects from each deferred.resolve(data) call
                    function(results) {
                        scope.friends = results;
                    },
                    // error
                    function(response) {
                        console.log('error in $q.all');
                    }
                );
            };

            scope.loadFriend = function (friendObj){
                $state.go('profilefriend', {friend: friendObj, visibleF: false});
            };
        }
    }
});

angular.module('socialApp').directive('newFormValDir', function(MainService) {
    return {
        templateUrl: '../views/newUserFormVal.html',
        restrict: 'E',
        scope: {
            currentUser: '=',
            profileView: '='
        },
        link: function (scope,elem,attrs) {
            MainService.getCurrentUser().then(function(response){
                scope.currentUser = response;
                scope.profileView = 'home';
            });

            scope.$watch(function (theScope) {
                    return theScope.currentUser;
                },
                function (newValue, oldValue) {
                    console.log('here in formValidation $watch' +newValue);
                    if (newValue) {
                        scope.userData = true;
                        scope.formNewUser = false;
                    } else {
                        scope.userData = false;
                        scope.formNewUser = true;
                    }
                }
            );

            scope.saveUser = function () {
                if(userValues()) {
                    var userObj = newUser();
                    MainService.saveUser(userObj).then(function (response) {
                        console.log(response.status);
                        if (response.status === 201) {
                            console.log("Done adding user!");
                            MainService.checkUserLogin(prepLogin(userObj)).then(function(res){
                                if (res.data.length>0){
                                    scope.currentUser = res.data[0];
                                    console.log("User logged in!");
                                    console.log("setCurrentUser "+ res.data[0].id);
                                    MainService.setCurrentUser(scope.currentUser.id);
                                }else{
                                    alert('user not found');
                                }
                            }).catch(function (err) { //if there is an error
                                return console.log(err);
                            });
                        } else {
                            alert("Error " + response.status + " no added user");
                        }
                        clearSaveForm();
                    }).catch(function (err) { //if there is an error
                        return console.log(err);
                    });
                }else{
                    alert("Please enter values for your Profile");
                }
            };

            var userValues = function () {
                console.log('userValues: '+ scope.name +" "+ scope.tagline +" "+ scope.profilePic +" "+ scope.bio);
                if (!scope.name || !scope.tagline || !scope.profilePic || !scope.bio) {
                    return false;
                }else{
                    return true;
                }
            };

            function prepLogin(logObj){
                return{
                    username: logObj.name,
                    password: logObj.id
                }
            }
            function newUser() {
                return {
                    name: scope.name,
                    tagline: scope.tagline,
                    profilePic: scope.profilePic,
                    bio: scope.bio,
                    id: Math.random() * 5000,
                    friends: []
                }
            }

            function clearSaveForm() {
                scope.name = '';
                scope.tagline = '';
                scope.profilePic = '';
                scope.bio = '';
                scope.myFormNewUser.$setPristine();
            }
        }
    }
});
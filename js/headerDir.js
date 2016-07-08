angular.module('socialApp').directive('headerDir', function (MainService) {
    return {
        templateUrl: '../views/header.html',
        restrict: 'E',
        scope: {
            currentUser: '=',
            profileView: '='
        },
        link: function (scope, elem, attrs) {
            scope.$watch(function (theScope) {
                    return theScope.currentUser;
                },
                function (newValue, oldValue) {
                    if (newValue) {
                        scope.$watch(function (theScope) {
                                return theScope.profileView;
                            },
                            function (newVal, oldVal) {
                                if (newVal) {
                                    if (scope.profileView === 'home') {
                                        scope.logValue = 'Log Off';
                                        scope.backArrow = false;
                                        scope.HamButton = false;
                                        scope.canvasMini = true;
                                        scope.hamStyle = {
                                            'height': '100%',
                                            'display': 'inline',
                                            'padding-left': '70px',
                                            'float': 'left'
                                        };
                                        scope.searchStyle = {
                                            'height': '100%',
                                            'display': 'inline',
                                            'padding-right': '70px',
                                            'float': 'right'
                                        };
                                    } else {
                                        console.log('no home');
                                        scope.logValue = 'Log Off';
                                        scope.backArro = true;
                                        scope.HamButton = false;
                                        scope.canvasMini = false;
                                        scope.backArr = {
                                            'height': '100%',
                                            'display': 'inline',
                                            'padding-left': '70px',
                                            'float': 'left'
                                        };
                                        scope.searchStyle = {
                                            'height': '100%',
                                            'display': 'inline',
                                            'padding-right': '70px',
                                            'float': 'right'
                                        };
                                    }
                                }
                            }
                        );
                    } else {
                        scope.logValue = 'Log in';
                        scope.HamButton = true;
                        scope.canvasMini = false;
                        scope.hamStyle = {
                            'height': '100%',
                            'display': 'inline',
                            'padding-right': '70px',
                            'float': 'right'
                        };
                        scope.searchStyle = {
                            'height': '100%',
                            'display': 'inline',
                            'padding-left': '70px',
                            'float': 'left'
                        };
                    }
                }
            );

            scope.logOff = function (logValue) {
                if (logValue === 'Log Off') {
                    MainService.removeCurrentUser();
                    scope.currentUser = undefined;
                    scope.myModal = '';
                    scope.modal = '';

                } else {
                    scope.myModal = '#myModal';
                    scope.modal = 'modal';
                }
            };

            scope.loginObj = function () {
                return {
                    username: scope.username,
                    password: scope.password
                }
            };

            function clearLogin() {
                scope.username = '';
                scope.password = '';
            }

            scope.loginUser = function (login) {
                console.log("loginUser: " + login);
                MainService.checkUserLogin(login).then(function (response) {
                    console.log("checkUserLogin: " + response.data[0]);
                    if (response.data.length > 0) {
                        scope.currentUser = response.data[0];
                        console.log("setCurrentUser " + response.data[0].id);
                        MainService.setCurrentUser(scope.currentUser.id);
                        $('#myModal').modal('hide');
                    } else {
                        alert('user not found');
                        $('#myModal').modal('show');

                    }
                }).catch(function (err) { //if there is an error
                    return console.log(err);
                });
                clearLogin();
                console.log('currentUser ' + scope.currentUser);
                console.log('adding User to sessionStorage: ' + JSON.parse(sessionStorage.getItem('currentUserId')));
            };
        }
    }
});

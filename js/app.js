angular.module('socialApp', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider){

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "views/templates/home.html"
            })
            .state('profile', {
                url:"/profile",
                templateUrl: "views/templates/profile.html"
            })
            .state('friendslist', {
                url:"/friendslist/",
                templateUrl: "views/templates/friendsList.html",
            })
             .state('findfriends', {
                 url:"/friends",
                 templateUrl: "views/templates/searchFriends.html"
            })
            .state('profilefriend', {
                url:"/profilefriend",
                params: {
                    friend: null,
                    visibleF: null
                },
                templateUrl: "views/templates/profileFriend.html"
            });

        $urlRouterProvider.otherwise("/");
    });

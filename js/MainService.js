angular.module('socialApp').service('MainService', function ($http, $q) {
    // var currentUser = {};
    //TODO load current user from somewhere initially;

    this.checkUserLogin = function (User) {
        return $http.get('http://localhost:3000/users?name=' + User.username + '&id=' + User.password);
    };
    // this.getCurrentUser = function(){
    //     var deferrer = $q.defer();
    //     $http.get('http://localhost:3000/currentUser')
    //         .then(function(response){
    //             if (response.data.length>0){
    //                 console.log("getCurrentUser");
    //                 $http.get('http://localhost:3000/users?id='+response.data[0].id).then(function(response){
    //                     console.log('returning' + response.data[0]);
    //                     deferrer.resolve( response.data[0]);
    //                 });
    //             }
    //         }).catch(function(err) { //if there is an error do something console.log err
    //         return console.error(err);
    //     });
    //     return deferrer.promise;
    // };

    this.getCurrentUser = function () {
        var currentUserId = JSON.parse(sessionStorage.getItem('currentUserId'));
        console.log("getCurrentUser");
        return $http.get('http://localhost:3000/users?id=' + currentUserId).then(function (response) {
            return response.data[0];
        }).catch(function (err) { //if there is an error do something console.log err
            return console.error(err);
        });
    };

    this.setCurrentUser = function (currentUserId) {
        console.log("setCurrentUser() id: " + currentUserId);
        sessionStorage.setItem('currentUserId', JSON.stringify(currentUserId));
    };

    this.removeCurrentUser = function () {
        console.log("removeCurrentUser()");
        sessionStorage.removeItem('currentUserId');
    };

    this.updateUser = function (objUser) {
        return $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:3000/users',
            data: objUser
        }).catch(function (err) { //if there is an error do something console.log err
            return console.error(err);
        });
    };

    this.saveUser = function (newUser) {
        return $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:3000/users',
            data: newUser
        }).catch(function (err) { //if there is an error do something console.log err
            return console.error(err);
        });
    };

    this.loadUsers = function () {
        return $http.get('http://localhost:3000/users');
    }

    this.addFriends = function (objUser) {
        return $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:3000/users',
            data: objUser
        }).catch(function (err) { //if there is an error do something console.log err
            return console.error(err);
        });
    }

    this.getFriends = function (friendId) {
        return $http.get('http://localhost:3000/users?id=' + friendId)
            .then(function (response) {
                if (response.status === 200) {
                    console.log('mainService data: '+response.data[0]);
                }
                return response.data[0];
            }).catch(function (err) { //if there is an error do something console.log err
                return console.error(err);
            });
    }
});

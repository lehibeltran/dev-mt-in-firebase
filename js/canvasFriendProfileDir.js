angular.module('socialApp').directive('canvasFriendProfileDir', function ($q, $location, $stateParams, MainService) {
    return {
        templateUrl: '../views/canvasFriendProfile.html',
        restrict: 'E',
        scope: {
            currentUser: '=',
            profileView: '='
        },
        link: function (scope, elem, attrs) {
            MainService.getCurrentUser().then(function (response) {
                if (response) {
                    scope.currentUser = response;
                    scope.visibleFriend = $stateParams.visibleF;
                    scope.profileView = 'profilefriend';
                    scope.friend = $stateParams.friend;
                    console.log("Canvas CurrentUser Profile pic  " + scope.friend.profilePic);
                    scope.img2src = scope.friend.profilePic;
                    tempCanvas2().then(function (response) {
                        scope.pattern2 = response;
                        drawCanvas();
                    });
                    console.log("there is a profile");
                    // scope.loadFriends();
                } else {
                    $location.path("/");
                }
            });

            scope.addFriend = function(friendId){
                scope.currentUser.friends.push(friendId);
                MainService.addFriends(scope.currentUser).then(function (response){
                    console.log(response.status);
                    if(response.status === 201){
                        alert('Friend Added');
                        $location.path("/friends");
                    }
                });
            };

            scope.deleteFriend = function(friendId){
                // scope.currentUser.friends.push(friendId);
                // MainService.addFriends(scope.currentUser).then(function (response){
                //     console.log(response.status);
                //     if(response.status === 201){
                //         alert('Friend Added');
                //         $location.path("/friends");
                //     }
                // });
            };

            var drawCanvas = function () {
                var canvas = document.getElementById('canvas');
                canvas.width = 400;
                canvas.height = 500;

                // use getContext to use the canvas for drawing
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                tempCanvas1().then(function (response) {
                    //console.log("tempCanvas1 Promise returned " + response);
                    var pattern1 = ctx.createPattern(response, 'no-repeat');
                    // console.log('scope.pattern2 ' + scope.pattern2);
                    var pattern2 = ctx.createPattern(scope.pattern2, 'no-repeat');

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(355, 300);
                    ctx.lineTo(205, 26);
                    ctx.lineTo(10, 270);
                    ctx.closePath();
                    // ctx.globalAlpha = 0.95;
                    ctx.fillStyle = pattern1;
                    ctx.fill();
                    ctx.fillStyle = "rgba(234, 234, 234, 0.80)";
                    ctx.fill();
                    ctx.restore();

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(340, 165);
                    ctx.lineTo(210, 440);
                    ctx.lineTo(14, 215);
                    ctx.closePath();
                    // ctx.globalAlpha = 0.95;
                    ctx.fillStyle = pattern2;
                    ctx.fill();
                    ctx.fillStyle = "rgba(116, 253, 242, 0.80)";
                    ctx.fill();
                    ctx.restore();
                });
            };

            function tempCanvas1() {
                var defer = $q.defer();
                var tempCanvas = document.createElement("canvas"),
                    tCtx = tempCanvas.getContext("2d");
                tempCanvas.width = 380;
                tempCanvas.height = 340;
                var img = new Image();
                img.src = "https://lh3.googleusercontent.com/ZWmuJuXIKQ4jWvZniwhVci-VMUliBQbTnQ1kM3nU3tAdfj4R_WgPrL61JlFwjK39Nw=w300";
                img.onload = function () {
                    tCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 380, 340);
                    defer.resolve(tempCanvas);
                };
                return defer.promise;
            };

            function tempCanvas2() {
                var defer = $q.defer();
                var temp2Canvas = document.createElement("canvas"),
                    tCtx2 = temp2Canvas.getContext("2d");
                temp2Canvas.width = 400;
                temp2Canvas.height = 500;
                scope.img2 = new Image();
                scope.img2.src = scope.img2src || "/images/blank.jpg";
                scope.img2.onload = function () {
                    tCtx2.drawImage(scope.img2, 0, 0, scope.img2.width, scope.img2.height, 10, 130, 335, 310);
                    defer.resolve(temp2Canvas);
                };
                return defer.promise;
            };
        }
    }
});



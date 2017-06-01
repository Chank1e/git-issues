app
   .config(['$routeProvider', function($routeProvider){
              $routeProvider
              .when('/',{templateUrl:'templates/main.html'})
              .when('/ttt',{templateUrl:'templates/ttt.html'})
              .otherwise({redirectTo:'/'});
          }]);

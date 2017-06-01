app
   .config(['$routeProvider', function($routeProvider){
              $routeProvider
              .when('/',{templateUrl:'templates/main.html'})
              .when('/issue',{templateUrl:'templates/issue.html'})
              .otherwise({redirectTo:'/'});
          }]);

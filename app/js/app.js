var app = angular
      .module('gitIssues',['ngRoute'])
      .controller('gitIssuesMainCtrl',gitIssuesMainCtrl);

app
   .config(['$routeProvider', function($routeProvider){
              $routeProvider
              .when('/',{templateUrl:'templates/main.html'})
              .otherwise({redirectTo:'/'});
          }]);

function gitIssuesMainCtrl($http){
  this.checkUser = checkUser;
  //CHECK USER FUNC
  function checkUser(userName) {
    if(userName[userName.length-1]=='/'){
      $http.get('https://api.github.com/users/'+userName.slice(0,-1))
           .then(success,error);
    }
  };
  //SUCCESS HTTP FUNC
  function success(msg){
    console.log(msg);
  };
  //ERROR HTTP FUNC
  function error(msg) {
    console.log(msg);
  };
};

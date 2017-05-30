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
  self = this;
  self.checkUser = checkUser;
  $http(
    {
      method:'GET',
      url:'https://api.github.com/user',
      headers: {
        'Authorization':' Basic Y2hhbmsxZTpnaXRodWIxMjM0NTk4Nw=='
      }
    }
  );
  //CHECK USER FUNC
  function checkUser(inputText) {
    if(inputText.indexOf('/')!=-1){
      self.currentUser = inputText.slice(0,inputText.indexOf('/'));
      $http.get('https://api.github.com/users/'+self.currentUser+'/repos')
           .then(successUserRepos,errorUserRepos);
      if(inputText.length>inputText.indexOf('/')+1){
          self.repoName = inputText.slice(inputText.indexOf('/')-inputText.length+1);
          $http.get('https://api.github.com/repos/'+self.currentUser+'/'+self.repoName+'/issues')
               .then(successIssues,errorIssues);
        };
    } else {
      self.reposArray=[]; //Hide repos
    }
  };
  //SUCCESS HTTP FUNC
  function successUserRepos(msg){
    let arr = msg.data;
    self.reposArray = [];
    arr.forEach(function(item,i,arr){
      self.reposArray.push(item.name);
    });
    self.reposFindError = false;
  };
  //ERROR HTTP FUNC
  function errorUserRepos(msg) {
    self.reposFindError = true;
    setTimeout(function(){self.reposFindError=false},1000);
  };
  function successIssues(msg){
    let arr = msg.data;
    self.issuesArray = [];
    arr.forEach(function(item,i,arr){
      self.issuesArray.push(item.body);
    });
  };
  function errorIssues(msg){
    console.log(msg);
  }
};

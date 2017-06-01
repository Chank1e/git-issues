var app = angular
      .module('gitIssues',['ngRoute','angular.http-loader'])
      .controller('gitIssuesMainCtrl',gitIssuesMainCtrl);

app
   .config(['$routeProvider', function($routeProvider){
              $routeProvider
              .when('/',{templateUrl:'templates/main.html'})
              .when('/ttt',{templateUrl:'templates/ttt.html'})
              .otherwise({redirectTo:'/'});
          }]);

function gitIssuesMainCtrl($http){
  self = this;
  self.checkUser = checkUser;
  self.setCurrentRepo = setCurrentRepo;
  //CHECK USER FUNC
  function checkUser(inputText) {
    self.reposArray=[];
    self.currentUser='';
    if(inputText==undefined){
      self.messageShow=true;
      self.message = 'Write in name/repository';
    } else {
      self.messageShow = false;
      self.currentUser = inputText.slice(0,inputText.indexOf('/'));
    if(inputText.indexOf('/')==-1||inputText.indexOf('/')+1==inputText.length){
        if(inputText.indexOf('/')==-1){
          self.currentUser = inputText.slice(0,inputText.length);
        };
      $http({
        url:'https://api.github.com/users/'+self.currentUser+'/repos?client_id=373764afdfbce3a8c2fc&client_secret=a311fa3eb2bc8c52c2518a09c4a7d26b3e732560',
        method:'GET',
        loader:'loader'
      })
           .then(successUserRepos,errorUserRepos);
    } else {
      self.reposArray=[];
          if(inputText.length>inputText.indexOf('/')+1){
          self.currentRepo = inputText.slice(inputText.indexOf('/')-inputText.length+1);
          $http.get('https://api.github.com/repos/'+self.currentUser+'/'+self.currentRepo+'/issues?client_id=373764afdfbce3a8c2fc&client_secret=a311fa3eb2bc8c52c2518a09c4a7d26b3e732560')
               .then(successIssues,errorIssues); //Hide repos
             }
    }
  };
  };
  //SUCCESS HTTP FUNC
  function successUserRepos(msg){
    let arr = msg.data;
    self.reposArray=[];
    self.issuesArray=[];
    if(arr.length==0){
      self.messageShow=true;
      self.message = 'No repositories';
    } else {
      arr.forEach(function(item,i,arr){
        self.reposArray.push(item.name);
      });
    };
  };
  //ERROR HTTP FUNC
  function errorUserRepos(msg) {
    self.messageShow = true;
    self.message = "Can't find user";
    self.reposArray=[];
    self.issuesArray=[];
  };
  function successIssues(msg){
    self.reposArray=[];
    self.issuesArray=[];
    let arr = msg.data;
    if(arr.length==0){
      self.messageShow=true;
      self.message = 'No issues';
    } else {
      self.issuesArray = [];
      arr.forEach(function(item,i,arr){
        self.issuesArray.push(item.title);
      });
    }
  };
  function errorIssues(msg){
    console.log(msg);
  };

  function setCurrentRepo(repo){
    self.currentRepo = repo;
    self.userName = self.currentUser+'/'+self.currentRepo;
    self.checkUser(self.userName);
  }
};

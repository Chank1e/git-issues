var app = angular
      .module('gitIssues',['ngRoute','angular.http-loader'])
      .controller('gitIssuesMainCtrl',gitIssuesMainCtrl);
    app
      .controller('issueCtrl',issueCtrl);

app
   .config(['$routeProvider', function($routeProvider){
              $routeProvider
              .when('/',{templateUrl:'templates/main.html'})
              .when('/issue',{templateUrl:'templates/issue.html'})
              .otherwise({redirectTo:'/'});
          }]);

app.service('storage', function () {
    var _item='default';
    return {
        setItem: function (item) {
            _item = item;
        },
        getItem: function () {
            return _item;
        }
    }
})

function issueCtrl(storage){
  var self = this;
  self.data = storage.getItem();
}

function gitIssuesMainCtrl($http,storage){
  self = this;
  self.checkUser = checkUser;
  self.setCurrentRepo = setCurrentRepo;
  self.allIssuesCheckbox = true;
  self.issueClass=issueClass;
  self.setItemToStorage = setItemToStorage;
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
          if(self.allIssuesCheckbox){
            self.stateIssues='&state=all';
          } else{
            self.stateIssues='';
          }
          $http({
            url:'https://api.github.com/repos/'+self.currentUser+'/'+self.currentRepo+'/issues?client_id=373764afdfbce3a8c2fc&client_secret=a311fa3eb2bc8c52c2518a09c4a7d26b3e732560'+self.stateIssues,
            method:'GET',
            loader:'loader'
          })
               .then(successIssues,errorIssues);
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
        self.issuesArray.push({'title':item.title,'date':item.created_at,'number':item.number,'state':item.state,'url':item.html_url,'body':item.body,'avatar':item.user.avatar_url,'login':item.user.login,'gitProfile':item.user.html_url});
      });
    }
  };
  function errorIssues(msg){
    console.log(msg);
  }

  function setCurrentRepo(repo){
    self.currentRepo = repo;
    self.userName = self.currentUser+'/'+self.currentRepo;
    self.checkUser(self.userName);
  }
  function issueClass(state){
    return (state=='open')?'green':'red';
  };

  function setItemToStorage(item){
    console.log('asdasd')
    storage.setItem(item);
  }
};

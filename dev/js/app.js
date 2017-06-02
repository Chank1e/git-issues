var app = angular
      .module('gitIssues',['ngRoute','angular.http-loader'])
      .controller('gitIssuesMainCtrl',gitIssuesMainCtrl);
    app
      .controller('issueCtrl',issueCtrl);

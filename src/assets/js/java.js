var nameApp = angular.module('starter', ['ionic', 'ui.router']);

nameApp.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: 'list.html',
      controller: 'ListCtrl'
    })

  $urlRouterProvider.otherwise("/");
 
});

nameApp.controller('ListCtrl', $(function () {
    $('#selectItem').ejDropDownTree({
        showPopupOnLoad: true,
        watermarkText: "Please select",
        width: "100%",
        targetId: "itemList"
    });
}))

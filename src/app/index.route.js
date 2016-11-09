(function() {
  'use strict';

  angular
    .module('sless_blog')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'app/components/views/about.html'
      })
      .when('/contact', {
        templateUrl: 'app/components/views/contact.html'
      })
      .when('/upload',{
        templateUrl: 'app/components/upload/upload.html',
        controller: 'UploadController',
        controllerAs: 'upload'
      })
      .when('/lambda', {
        templateUrl: 'app/components/testLambda/testLambda.html',
        controller: 'testLambdaController',
        controllerAs: 'testLambda'
      }) 
      .when('/dynamodb', {
        templateUrl: 'app/components/dynamoDB/dynamodb.html',
        controller: 'dynamoDBController',
        controllerAs: 'dynamodb'
      })
      .when('/promises', {
        templateUrl: 'app/components/promises/promises.html',
        controller: 'PromisesController',
        controllerAs: 'promises'
      })
      .when('/list',{
        templateUrl: 'app/components/list/list.html',
        controller: 'ListController',
        controllerAs: 'list'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();

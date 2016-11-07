(function(){
	angular
		.module('yoProjectJS')
		.controller('PromisesController', PromisesController);

		PromisesController.$inject = ['$scope', '$http', '$q', '$timeout', 'loginService', 'customAWSService'];

		function PromisesController($scope, $http, $q, $timeout, loginService, customAWSService){
			
			var vm = this;
			vm.response=vm.iterations=0;
			vm.ongoing = "WORKING";

			function add(x,y){
				return $timeout( function(){
					//console.log(x+y);
					//callback(x+y);
					vm.iterations = x+y;
					return (x+y);
				}, 2000);
			}

			var startTime = Date.now();
			add(0 ,1)
				.then(function(response){
					return add(response, 1);
				})
				.then(function(response){
					return add(response, 1);
				})
				.then(function(response){
					return add(response, 1);
				})
				.then(function(response){
					return add(response, 1);
				})
				.then(function(response){
					vm.response = response;
					vm.ongoing = "DONE!";
				})
				.finally(function(){
					vm.elapsedTime = Date.now() - startTime;
					//console.log(vm.elapsedTime);
				});
		}
})();
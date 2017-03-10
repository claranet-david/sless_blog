(function(){
	// body...
	angular
		.module('sless_blog')
		.controller('cloudWatchGraphController', cloudWatchGraphController);

		/** @ngInject */

		function cloudWatchGraphController($scope, $http, $routeParams, $q, loginService, customAWSService){

            
            var vm = this;
            
            var params = {
              DryRun: false,
              MaxResults: 100
            };
            
            vm.ec2 = new customAWSService.AWS.EC2({apiVersion: '2016-11-15'});

            vm.ec2.describeInstances(params, function(err, data){
              if (err) console.log(err, err.stack); // an error occurred
              else {
                console.log(data);           // successful response
              }
            });

            console.log("List Instances " + vm.listinstances);
        }

})();
(function(){
	// body...
	angular
		.module('sless_blog')
		.controller('listEBController', listEBController);

		/** @ngInject */


		function listEBController($scope, $http, $route, $routeParams, $q, $interval, $timeout, loginService, customAWSService){

            
            var vm = this; 
            

            vm.regions;
            customAWSService.originalRegion = customAWSService.AWS.config.region;
            vm.selectedRegion = {};
            vm.selectedRegion.RegionName = customAWSService.originalRegion;

            vm.functionType = function(item){
                return typeof(item);
            }

            vm.updateAppsInfo = function(){

                customAWSService.AWS.config.region = customAWSService.selectedRegion || 'us-west-2';
                //console.log(customAWSService.AWS.config.region);

                vm.elasticbeanstalk = new customAWSService.AWS.ElasticBeanstalk({apiVersion: '2016-11-15'});

                vm.elasticbeanstalk.describeEnvironments(vm.params, function(error, dataresponse){
                        if (error) console.log(error, error.stack); // an error occurred
                        else {
                          //console.log(JSON.stringify(dataresponse));
                          return dataresponse;
                       }
                }).promise()
                       .then(function(response){
                            console.log("PROMISE FULFILLED!!!");
                            vm.listapplications = response;
                            vm.result = JSON.stringify(response, undefined, 2);
                            console.log(vm.listapplications);
                            //console.log(typeof(vm.listinstances.Reservations[0].Instances[0].PublicIpAddress));
                            //console.log(vm.listinstances.Reservations[0].Instances[0].PublicIpAddress!==undefined);
                            //console.log(vm.listinstances[0]);
                            //console.log(JSON.stringify(vm.listinstances[0].Instances[0].InstanceId));

                       });

                customAWSService.AWS.config.region = customAWSService.originalRegion;
                //console.log(customAWSService.AWS.config.region);
            }
            
            vm.selectRegion = function(){
                console.log("##### Selected Region:");
                console.log(vm.selectedRegion.RegionName);
                customAWSService.selectedRegion = vm.selectedRegion.RegionName;
                vm.updateAppsInfo();
                
            }

            //$interval(vm.updateAppsInfo, 15000);

            vm.startInstanceWithID = function(idToStart){
              var params = {
                InstanceIds: [ /* required */
                  idToStart,
                  /* more items */
                ],
                DryRun: false
              };
              vm.ec2.startInstances(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
              });
              $timeout(function(){
                vm.updateInstanceInfo();                
              }, 5000);
            }

            vm.stopInstanceWithID = function(idToStop){
              var params = {
                InstanceIds: [ /* required */
                  idToStop,
                  /* more items */
                ],
                DryRun: false,
                Force: false
              };
              vm.ec2.stopInstances(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
              });
              $timeout(function(){
                vm.updateInstanceInfo();                
              }, 5000);
            }
            
            vm.params = {
              //DryRun: false
            };

            // if($routeParams.instanceid !== undefined){
            //   console.log(typeof($routeParams.instanceid));
            //   vm.params.InstanceIds = [ $routeParams.instanceid ];
            // }
            // else{
            //   vm.params.MaxResults = 100;
            // }

            vm.ec2 = new customAWSService.AWS.EC2({apiVersion: '2016-11-15'});

            vm.ec2.describeRegions(null, function(err, resp){
                    if (err) console.log(err, err.stack); // an error occurred
                    else {
                      //console.log(JSON.stringify(resp), undefined, 2);
                      //console.log(resp);
                      vm.regions = resp;
                      console.log(vm.regions);
                   }
            });

            vm.updateAppsInfo();







            //$interval($route.reload(), 10000);

            //console.log("List Instances " + vm.result);
        }

})();
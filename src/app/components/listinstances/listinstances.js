(function(){
	// body...
	angular
		.module('sless_blog')
		.controller('listInstancesController', listInstancesController);

		/** @ngInject */


		function listInstancesController($scope, $http, $route, $routeParams, $q, $interval, $timeout, loginService, customAWSService){

            
            var vm = this;

            console.log("Custom Original Region is: "+ customAWSService.AWS.config.region);

            vm.regions;
            vm.originalRegion = customAWSService.AWS.config.region;
            vm.selectedRegion = {};
            vm.selectedRegion.RegionName = vm.originalRegion;

            vm.functionType = function(item){
                return typeof(item);
            }

            vm.updateInstanceInfo = function(){

                customAWSService.AWS.config.region = vm.selectedRegion.RegionName;
                //console.log(customAWSService.AWS.config.region);

                vm.ec2 = new customAWSService.AWS.EC2({apiVersion: '2016-11-15'});

                vm.ec2.describeInstances(params, function(error, dataresponse){
                        if (error) console.log(error, error.stack); // an error occurred
                        else {
                          //console.log(JSON.stringify(dataresponse));
                          return dataresponse;
                       }
                }).promise()
                       .then(function(response){
                            console.log("PROMISE FULFILLED!!!");
                            vm.listinstances = response;
                            vm.result = JSON.stringify(response, undefined, 2);
                            console.log(vm.listinstances);
                            //console.log(typeof(vm.listinstances.Reservations[0].Instances[0].PublicIpAddress));
                            //console.log(vm.listinstances.Reservations[0].Instances[0].PublicIpAddress!==undefined);
                            //console.log(vm.listinstances[0]);
                            //console.log(JSON.stringify(vm.listinstances[0].Instances[0].InstanceId));

                       });

                customAWSService.AWS.config.region = vm.originalRegion;
                //console.log(customAWSService.AWS.config.region);
            }
            
            vm.selectRegion = function(){
                console.log("##### Selected Region:");
                console.log(vm.selectedRegion.RegionName);
                vm.updateInstanceInfo();
                
            }

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
            }
            
            var params = {
              DryRun: false,
              MaxResults: 100
            };

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

            vm.updateInstanceInfo();







            //$interval($route.reload(), 10000);

            //console.log("List Instances " + vm.result);
        }

})();
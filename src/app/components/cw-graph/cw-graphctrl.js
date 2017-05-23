(function(){
  // body...
  angular
    .module('sless_blog')
    .controller('cloudWatchGraphController', cloudWatchGraphController);

    /** @ngInject */


    function cloudWatchGraphController($scope, $http, $route, $routeParams, $q, $interval, $timeout, loginService, customAWSService){

            
            var vm = this;

            vm.regions;
            vm.selectedregion;

            vm.functionType = function(item){
                return typeof(item);
            }

            vm.updateInstanceInfo = function(){
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
                            console.log(typeof(vm.listinstances.Reservations[0].Instances[0].PublicIpAddress));
                            console.log(vm.listinstances.Reservations[0].Instances[0].PublicIpAddress!==undefined);
                            //console.log(vm.listinstances[0]);
                            //console.log(JSON.stringify(vm.listinstances[0].Instances[0].InstanceId));

                       });
            }
            
            vm.selectRegion = function(){
                console.log("##### Selected Region:");
                console.log(vm.selectedregion.RegionName);
                vm.updateInstanceInfo();
                
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
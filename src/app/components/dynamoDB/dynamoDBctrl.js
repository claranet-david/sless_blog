(function(){
	// body...
	angular
		.module('yoProjectJS')
		.controller('dynamoDBController', dynamoDBController);

		dynamoDBController.$inject = ['$scope', '$http', '$routeParams','loginService', 'customAWSService'];

		function dynamoDBController($scope, $http, $routeParams, loginService, customAWSService){

			var vm = this;
            vm.queriedItem = '';
            vm.newItem = {
                FileName: 'Name for the new file',
                FileDate: '2016-08-14',
                FileTags: 'Tag1, Tag2, Tag3, ...',
                FileDescription: 'Description for the new File',
                FileType: ''
            };

            //Filtering Methods
            vm.filterOptions = {
                files: [
                    {id : 1, name : 'ALL', type: "all" },
                    {id : 2, name : 'ebextensions', type: "ebextension" },
                    {id : 3, name : 'packages', type: "package"},
                    {id : 4, name : 'scripts', type: "script" }
                ]
            };
            //*** Mapped to the model to filter ***/
            vm.filterItem = {
                files: vm.filterOptions.files[0]
            };

            vm.customFilter = function (data) {
                    if (data.FileType.S === vm.filterItem.files.type) {
                      return true;
                    } else if (vm.filterItem.files.type === "all") {
                      return true;
                    } else {
                      return false;
                    }
            };

            vm.dynamodb = new customAWSService.AWS.DynamoDB(
                {
                    apiVersion: '2012-08-10',
                    region: 'us-west-2'
                });

            vm.docClient = new customAWSService.AWS.DynamoDB.DocumentClient({service: vm.dynamodb});
            console.log("DynamoDB Ready");

            vm.dropzone = document.getElementById('dropzone');

            vm.dropzone.ondrop = function(e){
                e.preventDefault();
                this.className = 'dropzone';

                
                if(e.dataTransfer.files.length==1){
                    console.log("Ok!");
                    console.log(e.dataTransfer.files[0]);
                    vm.newItem.FileName = e.dataTransfer.files[0].name;
                    console.log("FileName: " + vm.newItem.FileName);
                    vm.newItem.FileDate = e.dataTransfer.files[0].lastModifiedDate.toISOString().slice(0,10);
                    console.log("FileDate: " + vm.newItem.FileDate);
                    $scope.$digest();
                    return e.dataTransfer.files[0];
                }
                else console.log("There was some sort of error: Should be exclusively one item!");
            }
            vm.dropzone.ondragover = function(e){
                this.className = 'dropzone over';
                return false;
            }
            vm.dropzone.ondragleave = function(e){
                this.className = 'dropzone';
                return false;
            }


            vm.refreshTable = function(){

                vm.dynamodb.scan(params={TableName: "JStable"}, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    //else console.log(data);           // successful response
                }).promise().then(function(result){
                        console.log("Success!" + JSON.stringify(result));
                        vm.fullDynDBData = result.Items;
                    }).catch(function(failure){
                        console.log("Failure: " + JSON.stringify(failure));
                        vm.queriedItem = "There was an error on your query!!";
                    });
            }

            vm.queryAction = function(){

                placeholderKey = vm.key;

                vm.params = {
                    TableName: "JStable",
                    KeyConditionExpression: "FileName = :itemname",
                    ExpressionAttributeValues: {
                        ":itemname": placeholderKey
                    }
                }

                vm.docClient.query(vm.params, function(err, data){
                        if(err) console.log("There was an error");
                        //else console.log(data);
                }).promise().then(function(result){
                    console.log("Success!" + JSON.stringify(result));
                    vm.queriedItem = result.Items;
                }).catch(function(failure){
                    console.log("Failure: " + JSON.stringify(failure));
                    vm.queriedItem = "There was an error on your query!!";
                });
            }

            vm.deleteAction = function(){

                placeholderKey = vm.key;

                paramsDelete = {
                    TableName: "JStable",
                   Key: {
                       FileName: {S: placeholderKey}
                   },
                }

                vm.dynamodb.deleteItem(paramsDelete, function(err, data){
                        if(err) console.log("There was an error");
                        //else console.log(data);
                }).promise().then(function(result){
                    console.log("Success!" + JSON.stringify(result));
                    vm.queriedItem = result.Items;
                }).catch(function(failure){
                    console.log("Failure: " + JSON.stringify(failure));
                    vm.queriedItem = "There was an error on your query!!";
                });

                vm.refreshTable();
            }

            vm.populate = function(){

                vm.dynamodb.updateItem(
                    params={
                        TableName: "JStable",
                        Key: {
                            FileName: {S: vm.newItem.FileName}
                        },
                        AttributeUpdates:{
                            FileDescription: {
                                Action: "PUT",
                                Value: {S: vm.newItem.FileDescription}
                            },
                            FileDate: {
                                Action: "PUT",
                                Value: {S: JSON.stringify(vm.newItem.FileDate)}
                            },
                            FileType: {
                                Action: "PUT",
                                Value: {S: vm.newItem.FileType}
                            },
                            FileTags: {
                                Action: "PUT",
                                Value: {S: vm.newItem.FileTags}
                            }

                        }

                    },function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    //else console.log(data);           // successful response
                });

                vm.refreshTable();

            }

            vm.refreshTable();
        }

})();
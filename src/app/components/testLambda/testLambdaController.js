(function(){
	angular
		.module('sless_blog')
		.controller('testLambdaController', testLambdaController);

		testLambdaController.$inject = ['$scope', '$http', 'loginService', 'customAWSService'];

		function testLambdaController($scope, $http, loginService, customAWSService){
			
			var vm = this;

			vm.payload = "your text here!";


		    vm.handleResponseFromLambda = function(err, response){
		    	if(err){
		    		console.log("some problem happened");
		    		console.dir(err);
		    		return;
		    	}
		    	// console.dir(response);
		    	// console.dir(response.Payload);
		    	// temporal = JSON.parse(response.Payload).word_to_echo_str;
		    	// console.log(temporal);

		    	// vm.response = temporal;
		    	
		    }
		    vm.runFunctionOnLambda = function(fn_str, payload){
		    	var settings = {
		    		FunctionName: fn_str,
		    		Payload: JSON.stringify(payload)
		    	};
		    	lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
		    	return lambda.invoke(settings, vm.handleResponseFromLambda).promise()

		    		// .finally(function(){
		    		// 	console.log("Elapsed Time: " + vm.elapsedTime);
		    		// });
		    		// .on("success", function(response){
		    		// 	console.log("Success!");
		    		// 	console.log(JSON.parse(response.data.Payload).word_to_echo_str);
		    		// 	return response;

		    		// })
		    		// .on("error", function(response){
		    		// 	console.log("There was some kind of Error!");

		    		// })
		    		// .on("completion", function(response){
		    		// 	vm.elapsedTime = Date.now() - vm.startTime;
		    		// 	console.log(Date.now());
		    		// 	console.log("Elapsed Time: "+vm.elapsedTime);
		    		// })
		    }
		    vm.buttonAction = function(payload){
		    	vm.startTime = Date.now();
		    	//console.log("Payload: "+ payload);
		    	//console.log("Credentials "+JSON.stringify(customAWSService.AWS.config.credentials));				
		    	vm.runFunctionOnLambda("myFirstTestFunction", {
		    	 	word_to_echo_str: payload
		    	 }).then(function(result){
		    			console.log("Success!");
		    			//console.log(response.Payload.word_to_echo_str);
		    		 	vm.response = JSON.parse(result.Payload).word_to_echo_str;
		    		 	vm.elapsedTime = Date.now() - vm.startTime;	    			
		    		})
		    		.catch(function(failure){
		    			console.log("Failure: " + failure);
		    		})
		    }
		}
})();
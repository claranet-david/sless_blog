// AWS Operations over SDK service

(function(){
	angular
		.module('sless_blog')
		.service('customAWSService', customAWSService);

		customAWSService.$inject = ['$q'];

		function customAWSService($q){

			var vm = this;

			vm.AWS = AWS;

			//if (typeof Promise === 'undefined') {
				AWS.config.setPromisesDependency($q);
			//} //info in https://blogs.aws.amazon.com/javascript/post/Tx3BZ2DC4XARUGG/Support-for-Promises-in-the-SDK

			vm.AWS.config.region = 'eu-west-1';

			vm.roleArnFB = 'arn:aws:iam::419400150602:role/myAppFBRole';
			vm.roleArnAmazon = 'arn:aws:iam::419400150602:role/myAppAmazonRole';
			
			vm.bucketName = 'thabeat--archiving-tool';

			vm.CWKey = 'AKIAJDHCP2RE6P372EBQ';
			vm.AWS.config.accessKeyId = vm.CWKey; 
			vm.CWSecret = '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';
			vm.AWS.config.secretAccessKey = vm.CWSecret;

			console.log(AWS.config);
			
			vm.bucket = new vm.AWS.S3({
				params: {
					Bucket: vm.bucketName
				}
			});
		}
})();